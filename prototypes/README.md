# 发布 prototypes 到 GitHub Pages 指南

以下步骤帮助你将 `prototypes` 目录部署到 GitHub Pages，快速对外分享所有原型页面：

## 1. 准备仓库
1. 将仓库推送到 GitHub，例如：`https://github.com/haojin-dev/pm-universe`。
2. 在仓库根目录创建一个专门用于静态资源的分支，例如 `pages` 或 `gh-pages`：
   ```bash
   git checkout --orphan gh-pages
   git reset --hard
   ```
3. 将 `prototypes` 目录复制到该分支根目录（可保留 README、LICENSE 等需要公开的文件）。

## 2. 配置 GitHub Pages
1. 在 GitHub 仓库页面点击 **Settings → Pages**。
2. 在 **Build and deployment** 区域选择 **Deploy from a branch**。
3. 选择用于部署的分支（如 `gh-pages`）及根目录 `/`，保存设置。
4. 等待几分钟，GitHub Pages 会在 `https://<用户名>.github.io/<仓库名>/prototypes/` 下生成站点。

## 3. 持续更新
1. 当主分支新增或修改原型后，在主分支运行：
   ```bash
   npm install --global git-filter-repo # 首次需要安装
   git checkout gh-pages
   git rm -rf .
   git checkout main -- prototypes
   git commit -am "更新原型"
   git push origin gh-pages --force
   ```
   或者使用任何你熟悉的同步方式，只要保证 `prototypes` 目录被更新到部署分支即可。
2. 部署完成后，访问 `https://<用户名>.github.io/<仓库名>/prototypes/`，即可看到索引页和所有原型。

> 提示：部署后的索引页会自动加载 `prototype-index.json`，并在每个原型页面左上角提供导航菜单，方便跳转与返回主页。
