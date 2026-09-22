# 项目协作记忆

## Git 提交与推送

- 对本项目完成代码或内容修改后，必须先进行与改动相称的验证；验证通过后，直接提交并推送至 GitHub 远程仓库，无需等待额外提醒。
- Git 提交信息必须使用中文，准确、简洁地概括本次改动，符合 Conventional Commits 的语义，例如：`fix: 修复 Umami 数据上报`、`feat: 增加文章图表复制功能`。
- 不提交用户已有的无关改动、临时文件或敏感信息；仅暂存本次任务涉及的明确文件。
- 每次成功推送 GitHub 后，必须继续执行 `scripts\\发布到线上.ps1` 同步线上服务器；若 SSH 需要用户在本机输入密码或进行身份验证，应立刻说明该阻塞点并给出执行命令，不能假称线上已更新。

## 强制要求：改完必须自测通过才提交（每次修改都适用）

**每次修改代码后，在提交到 GitHub 之前，必须自行完成测试并确认正常运行。禁止跳过测试直接提交。** 这条要求对每一次改动都生效，不需要用户额外提醒。

### 执行顺序（不可调换）

1. **改代码** — 只改本次任务直接相关的代码，不做无关重构。
2. **格式化与静态检查**

   ```bash
   corepack yarn prettier --write <本次改动的文件>
   corepack yarn typecheck
   ```

3. **完整生产构建**（这是线上部署实际执行的命令，必须真跑）

   ```bash
   corepack yarn build
   ```

   构建失败一律不允许提交，先修好再走流程。

4. **运行时冒烟验证** — 构建通过不等于页面正常，必须起服务实际访问确认

   ```bash
   corepack yarn start
   ```

   启动后逐条确认：
   - 首页 `/` 返回 HTTP 200；
   - 本次改动影响到的路由返回 HTTP 200（例如改页脚要查 `/about`）；
   - 用 `curl` 抓取实际 HTML，确认改动内容真的渲染出来了，而不只是编译通过；
   - 验证完关闭服务（Windows 下 `taskkill //F //IM node.exe`，注意别误杀其他项目的 node 进程）。

5. **确认无误后再提交** — 测试有任何失败就停下修问题，不允许带着失败提交。

6. **提交并推送**

   ```bash
   git add <本次任务涉及的明确文件>
   git commit -m "<中文 Conventional Commits 信息>"
   git push origin main
   ```

7. **同步线上** — 推送成功后执行 `scripts\\发布到线上.ps1`；若需要用户在本机输入 SSH 密码或做身份验证，立刻说明这个阻塞点并给出命令，绝不能假称线上已更新。

### 提交规范

- 信息用中文，遵循 Conventional Commits：`feat:` 新功能、`fix:` 修复、`docs:` 文档、`refactor:` 重构、`chore:` 杂项。
- 只暂存本次任务涉及的文件。
- **本项目的已知构建产物文件不属于业务代码，禁止提交**：`reports/content-quality-audit.json`、`tsconfig.tsbuildinfo`。`yarn build` 会自动改动它们，提交时用 `git add <明确文件>` 指定，不要用 `git add -A`。

### 网络环境说明

本机 Git 推送依赖本地代理。若推送报 `Failed to connect to github.com port 443`，说明代理未启动或端口变化，需先确认代理进程在运行，端口以系统代理设置为准（`HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings` 的 `ProxyServer`）。

**必须如实报告测试结果。测试失败、步骤跳过、服务未启动，都要明确说明，不允许把没验证过的状态说成已验证。**
