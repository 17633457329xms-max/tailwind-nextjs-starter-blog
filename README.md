# 谢老师讲论文

面向中国大陆经管学生的论文研究辅导与润色优化网站，基于 Next.js、Tailwind CSS、Contentlayer 和 MDX 构建。

## 本地开发

```bash
yarn
yarn dev
```

默认访问：`http://localhost:3000`。

## 质量检查

```bash
yarn lint
yarn typecheck
yarn build
```

## 环境变量

复制 `.env.example` 为 `.env.local`，按需配置：

- `NEXT_PUBLIC_SITE_URL`：正式域名。
- `NEXT_UMAMI_ID`、`NEXT_PUBLIC_UMAMI_SRC`：同区域自托管统计。
- `CONSULTATION_WEBHOOK_URL`：咨询通知Webhook。
- `BAIDU_SITE_VERIFICATION`、`BING_SITE_VERIFICATION`：搜索平台验证。
- `BAIDU_SITE`、`BAIDU_PUSH_TOKEN`：百度普通收录API。

正式上线前需要确认中国大陆部署、备案/许可、国内CDN、咨询通知和隐私主体信息。

## 内容目录

`data/knowledge`下按六个栏目组织MDX内容：

- `topics`：论文选题。
- `methods`：实证方法。
- `variables`：变量与数据。
- `literature`：文献检索。
- `stata`：Stata代码。
- `writing`：论文写作与润色。
