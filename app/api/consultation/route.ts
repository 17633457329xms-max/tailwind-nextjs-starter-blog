import { NextRequest, NextResponse } from 'next/server'

const allowedServices = new Set(['topic', 'method', 'stata', 'writing', 'polishing', 'ongoing'])
const allowedContactTypes = new Set(['wechat', 'qq', 'email'])
const requests = new Map<string, number[]>()

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get('content-length') || 0)
  if (length > 20_000) {
    return NextResponse.json({ message: '提交内容过长，请精简问题摘要。' }, { status: 413 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const now = Date.now()
  const recent = (requests.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000)
  if (recent.length >= 5) {
    return NextResponse.json({ message: '提交过于频繁，请稍后再试。' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: '请求格式不正确。' }, { status: 400 })
  }

  if (text(body.website, 100)) {
    return NextResponse.json({ message: '提交失败，请刷新页面后重试。' }, { status: 400 })
  }

  const payload = {
    discipline: text(body.discipline, 60),
    degreeStage: text(body.degreeStage, 20),
    researchStage: text(body.researchStage, 20),
    serviceType: text(body.serviceType, 20),
    problemSummary: text(body.problemSummary, 1200),
    contactType: text(body.contactType, 20),
    contactValue: text(body.contactValue, 120),
    sourcePath: text(body.sourcePath, 200),
  }

  if (
    !payload.discipline ||
    !payload.degreeStage ||
    !payload.researchStage ||
    !allowedServices.has(payload.serviceType) ||
    payload.problemSummary.length < 20 ||
    !allowedContactTypes.has(payload.contactType) ||
    !payload.contactValue ||
    body.consent !== true
  ) {
    return NextResponse.json(
      { message: '请完整填写必填字段并确认服务与隐私说明。' },
      { status: 400 }
    )
  }

  recent.push(now)
  requests.set(ip, recent)
  const id = `XS-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomUUID().slice(0, 8)}`
  const webhook = process.env.CONSULTATION_WEBHOOK_URL
  let delivered = false

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, createdAt: new Date().toISOString(), ...payload }),
        signal: AbortSignal.timeout(6000),
      })
      delivered = response.ok
    } catch {
      delivered = false
    }
  }

  return NextResponse.json({ id, delivered })
}
