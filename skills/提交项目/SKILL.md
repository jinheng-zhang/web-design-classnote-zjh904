---
name: 提交项目
description: 将当前项目的所有变更通过 git commit 提交并 push 到 web design 904 远程仓库（gitee904）。当用户要求"提交项目""推送代码""上传到904""commit 并 push"时使用。
---

# 提交项目

将当前工作目录的所有变更提交并推送到 web design 904 远程仓库。

## 远程仓库信息

| 项 | 值 |
|---|---|
| 远程名称 | `gitee904` |
| 仓库地址 | `https://gitee.com/zhang-jingheng5614/web-design-904.git` |
| 分支 | `main` |

## 执行步骤

### 1. 检查状态

执行 `git status --short` 查看当前变更，确认有内容需要提交。

### 2. 暂存所有变更

```
git add -A
```

### 3. 提交

使用有意义的提交信息，遵循 `<类型>: <简述>` 格式：

```
git commit -m "<类型>: <简述>"
```

常用类型：
- `feat`: 新增页面/功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 样式调整
- `refactor`: 重构
- `chore`: 杂项

提交信息中应包含本次变更的核心内容，例如：
- `feat: 新增 iconfont 字体图标与 SVG 图标标本页及移动端底部导航`
- `fix: 修复底部导航徽章定位偏移`
- `docs: 更新 index.html 课堂目录导航卡片`

### 4. 推送到远程

```
git push gitee904 main
```

## 注意事项

- 推送前确保 `git status` 中已无未暂存的变更
- 若推送被拒绝（非快进），先 `git pull gitee904 main` 合并后再推送
- 不要推送敏感文件（如 `.env`、凭证文件），确认 `.gitignore` 配置正确
- 提交信息使用中文，简洁说明本次提交做了什么
