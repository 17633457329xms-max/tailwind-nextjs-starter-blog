<#+
.SYNOPSIS
  将本地项目安全发布到线上服务器。

.DESCRIPTION
  依次执行：本地类型检查 → 提交并推送 GitHub → 服务器拉取代码 → 安装依赖 → 构建 → PM2 重启 → 健康检查。
  不保存 SSH 密码、AccessKey 或 .env.production 内容。

.EXAMPLE
  .\scripts\发布到线上.ps1
#>

[CmdletBinding()]
param(
  [string]$提交说明,
  [switch]$跳过类型检查
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 仅在这里维护服务器基本信息；不应填写密码、私钥或环境变量。
$服务器地址 = '120.55.82.186'
$服务器用户 = 'admin'
$服务器项目目录 = '/home/admin/paper-site'
$线上健康检查地址 = 'https://lunwenhub.com/'
$PM2应用名称 = 'paper-site'
$分支 = 'main'

$项目目录 = Split-Path -Parent $PSScriptRoot
Set-Location $项目目录

function 执行步骤([string]$说明, [scriptblock]$操作) {
  Write-Host "`n==> $说明" -ForegroundColor Cyan
  & $操作
  if ($LASTEXITCODE -ne 0) {
    throw "失败：$说明"
  }
}

Write-Host "发布项目：$项目目录" -ForegroundColor DarkGray

# 这些是本机开发时自动更新的文件，不属于业务代码，禁止纳入发布提交。
$忽略暂存文件 = @(
  'reports/content-quality-audit.json',
  'tsconfig.tsbuildinfo'
)

if (-not $跳过类型检查) {
  执行步骤 '本地类型检查' { corepack yarn typecheck }
}

执行步骤 '暂存本次源代码改动' {
  git add -A -- ':!reports/content-quality-audit.json' ':!tsconfig.tsbuildinfo'
}

$暂存改动 = git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host '没有需要发布的源代码改动，将直接同步服务器已有的 main 分支。' -ForegroundColor Yellow
} elseif ($LASTEXITCODE -eq 1) {
  if ([string]::IsNullOrWhiteSpace($提交说明)) {
    $提交说明 = Read-Host '请输入本次中文提交说明（例如：优化文章页目录展示）'
  }

  if ([string]::IsNullOrWhiteSpace($提交说明)) {
    throw '提交说明不能为空。为保持历史清晰，发布已取消。'
  }

  执行步骤 '创建本地 Git 提交' { git commit -m $提交说明 }
} else {
  throw '无法判断 Git 暂存区状态。'
}

执行步骤 '推送 main 分支到 GitHub' { git push origin $分支 }

$远程命令 = @"
set -euo pipefail
cd '$服务器项目目录'
git pull --ff-only origin '$分支'
corepack yarn install --immutable
corepack yarn build
if pm2 describe '$PM2应用名称' >/dev/null 2>&1; then
  pm2 reload '$PM2应用名称' --update-env
else
  pm2 start 'yarn start' --name '$PM2应用名称'
fi
pm2 save
curl --fail --silent --show-error http://127.0.0.1:3000/ >/dev/null
echo '服务器应用健康检查通过。'
"@

执行步骤 '连接服务器并更新线上站点' {
  # 远程命令编码后作为 SSH 参数传递，保留标准输入供首次登录输入密码。
  $远程命令Base64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($远程命令))
  ssh "$服务器用户@$服务器地址" "echo '$远程命令Base64' | base64 --decode | bash"
}

try {
  $响应 = Invoke-WebRequest $线上健康检查地址 -UseBasicParsing -TimeoutSec 30
  if ($响应.StatusCode -ne 200) {
    throw "线上站点返回 HTTP $($响应.StatusCode)"
  }
  Write-Host "`n发布成功：$线上健康检查地址（HTTP 200）" -ForegroundColor Green
} catch {
  Write-Warning "服务器已完成重启，但本机外网健康检查失败：$($_.Exception.Message)。请浏览器打开 $线上健康检查地址 复核。"
}
