# LXW AI Studio

这是一个可直接部署到 GitHub Pages 的个人技术服务网站静态项目。

## 项目文件

- `index.html`：页面结构
- `style.css`：网站样式与响应式布局
- `script.js`：导航交互、滚动高亮、进入视口动画
- `README.md`：项目说明与部署步骤

## 本地预览

直接双击 `index.html`，或使用浏览器打开即可预览。

## 部署到 GitHub Pages

### 方法一：通过 GitHub 网页直接部署

1. 在 GitHub 创建一个新的仓库，例如：`lxw-ai-studio`
2. 把以下文件上传到仓库根目录：
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. 进入仓库页面，点击 `Settings`
4. 在左侧找到 `Pages`
5. 在 `Build and deployment` 区域中：
   - `Source` 选择 `Deploy from a branch`
   - `Branch` 选择 `main`
   - 文件夹选择 `/ (root)`
6. 点击 `Save`
7. 等待几十秒到几分钟，GitHub Pages 会生成访问地址

### 方法二：使用 Git 命令部署

如果你本机已安装 Git，可在项目所在目录执行：

```bash
git init
git add .
git commit -m "init LXW AI Studio website"
git branch -M main
git remote add origin https://github.com/你的用户名/lxw-ai-studio.git
git push -u origin main
```

然后到 GitHub 仓库的 `Settings -> Pages` 中开启 Pages。

## 自定义内容建议

部署前你可以按需替换以下占位信息：

- Telegram：`@yourname`
- Email：`your@email.com`
- 微信文案：`请联系获取`

## 适用场景

- 个人接单主页
- AI 服务展示页
- 个人技术名片网站
- 自由职业服务落地页