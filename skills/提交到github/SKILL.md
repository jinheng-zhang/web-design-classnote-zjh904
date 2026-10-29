---
name: 提交到github
description: 将当前项目的所有变更通过 git commit 提交并 push 到 GitHub 远程仓库（jinheng-zhang/web-design-classnote-zjh904），使用本机已配置的 SSH 公钥认证。当用户要求"提交到 GitHub""推送到 GitHub""上传到 GitHub""commit 并 push 到 GitHub"时使用。
---

# 提交到 GitHub

将当前工作目录的所有变更提交并推送到 GitHub 远程仓库，使用本机已配置的 SSH 公钥认证（不走 HTTPS 账号密码）。

## 远程仓库信息

| 项 | 值 |
|---|---|
| 远程名称 | `github` |
| 仓库地址（SSH） | `git@github.com:jinheng-zhang/web-design-classnote-zjh904.git` |
| 网页地址 | `https://github.com/jinheng-zhang/web-design-classnote-zjh904` |
| 分支 | `main` |
| 认证方式 | 本机已配置的 SSH 公钥（`~/.ssh/id_*`） |

## 执行步骤

### 1. 检查远程仓库配置

```
git remote -v
```

若不存在名为 `github` 的远程，则添加（必须使用 SSH 地址以启用公钥认证）：

```
git remote add github git@github.com:jinheng-zhang/web-design-classnote-zjh904.git
```

若已存在但地址是 HTTPS，改为 SSH：

```
git remote set-url github git@github.com:jinheng-zhang/web-design-classnote-zjh904.git
```

### 2. 验证 SSH 公钥可用

```
ssh -T git@github.com
```

首次连接会询问是否信任 `github.com` 的主机指纹，输入 `yes`。
返回 `Hi <用户名>! You've successfully authenticated...` 说明公钥配置正确。

若提示 `ssh: connect to host github.com port 22: Connection refused`（22 端口被网络阻断），改用 GitHub 的 443 端口，并把远程地址换成对应形式：

```
ssh -p 443 -T git@ssh.github.com
git remote set-url github ssh://git@ssh.github.com:443/jinheng-zhang/web-design-classnote-zjh904.git
```

### 3. 检查工作区状态

```
git status --short
```

确认有需要提交的变更；若无变更则直接跳到第 5 步检查是否需要推送。

### 4. 暂存并提交

```
git add -A
git commit -m "<类型>: <简述>"
```

提交信息格式 `<类型>: <简述>`（中文），常用类型：

- `feat`: 新增页面/功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 样式调整
- `refactor`: 重构
- `chore`: 杂项

PowerShell 环境下不使用 heredoc，多行提交信息用多个 `-m` 参数：

```
git commit -m "feat: 标题" -m "- 明细一" -m "- 明细二"
```

### 5. 推送到 GitHub

```
git push github main
```

首次推送若提示分支不存在，使用：

```
git push -u github main
```

## 注意事项

- 必须使用 SSH 地址（`git@github.com:...`），HTTPS 地址不会使用公钥认证
- 推送被拒绝（非快进）时，先 `git pull github main --rebase` 再推送
- 不提交敏感文件（`.env`、凭证、私钥），确认 `.gitignore` 配置正确
- 公钥认证失败时不要改用 HTTPS 硬推，应提示用户检查 GitHub 账户的 SSH Keys 设置
- 提交信息使用中文，简洁说明本次提交做了什么
