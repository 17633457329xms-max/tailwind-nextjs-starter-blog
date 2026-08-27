'use client'

import { FormEvent, useState } from 'react'

const inputClass =
  'mt-2 w-full rounded-xl border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white'

export default function ConsultationForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData: Record<string, FormDataEntryValue> = Object.fromEntries(
      new FormData(form).entries()
    )
    const data = {
      ...formData,
      consent: formData.consent === 'on',
      sourcePath: window.location.pathname,
    }

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || '提交失败，请稍后重试。')
      setStatus('success')
      setMessage(
        result.delivered
          ? `已提交，咨询编号：${result.id}。`
          : `信息校验完成，咨询编号：${result.id}。当前未配置自动通知，请继续通过下方微信或QQ联系。`
      )
      window.umami?.track('consult_form_submit', { service: String(formData.serviceType) })
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : '提交失败，请稍后重试。')
      window.umami?.track('consult_form_error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
      onFocus={() => window.umami?.track('consult_form_start')}
    >
      <div className="mb-7">
        <p className="text-sm font-bold text-blue-700 dark:text-blue-300">需求初筛</p>
        <h2 className="mt-2 text-2xl font-black">先用文字说明你的问题</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
          首次不上传全文或敏感数据。带 * 的字段用于判断问题类型和联系回复。
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold">
          学科方向 *
          <input
            name="discipline"
            required
            maxLength={60}
            className={inputClass}
            placeholder="如：金融学、会计学、产业经济学"
          />
        </label>
        <label className="text-sm font-bold">
          学位阶段 *
          <select name="degreeStage" required className={inputClass} defaultValue="">
            <option value="" disabled>
              请选择
            </option>
            <option>本科</option>
            <option>硕士</option>
            <option>博士</option>
            <option>教师/其他</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          研究阶段 *
          <select name="researchStage" required className={inputClass} defaultValue="">
            <option value="" disabled>
              请选择
            </option>
            <option>选题</option>
            <option>开题</option>
            <option>数据</option>
            <option>实证</option>
            <option>写作</option>
            <option>答辩</option>
            <option>返修</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          希望获得的服务 *
          <select name="serviceType" required className={inputClass} defaultValue="">
            <option value="" disabled>
              请选择
            </option>
            <option value="topic">选题诊断</option>
            <option value="method">实证方法</option>
            <option value="stata">Stata代码</option>
            <option value="writing">论文写作</option>
            <option value="polishing">论文润色优化一对一定制</option>
            <option value="ongoing">阶段辅导</option>
          </select>
        </label>
        <label className="text-sm font-bold sm:col-span-2">
          当前最需要解决的问题 *
          <textarea
            name="problemSummary"
            required
            minLength={20}
            maxLength={1200}
            rows={6}
            className={inputClass}
            placeholder="请描述研究问题、已有数据/方法、当前卡点以及希望完成的时间。"
          />
        </label>
        <label className="text-sm font-bold">
          联系方式类型 *
          <select name="contactType" required className={inputClass} defaultValue="">
            <option value="" disabled>
              请选择
            </option>
            <option value="wechat">微信</option>
            <option value="qq">QQ</option>
            <option value="email">邮箱</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          联系方式 *
          <input
            name="contactValue"
            required
            maxLength={120}
            className={inputClass}
            placeholder="微信号、QQ号或邮箱"
          />
        </label>
        <label className="hidden" aria-hidden="true">
          网址
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
        />
        <span>我已阅读服务说明与隐私说明，同意为本次咨询提交上述必要信息。</span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-7 w-full rounded-xl bg-blue-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? '正在提交…' : '提交问题摘要'}
      </button>

      {message && (
        <p
          role="status"
          className={`mt-4 rounded-xl p-4 text-sm leading-6 ${
            status === 'success'
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
