# AGENTS.md

## Overview
Static HTML/CSS/JS classroom practice site (no build tools, no bundlers). Each exercise is a standalone HTML file (mostly single-file or with local CSS/JS). Navigation is `index.html`.

## Structure
- Root: exercise pages (`*.html`), shared assets (`css*.css`, `data.js`, `font/`, `image/`, `cdn/`)
- `introduce/`: multi-page example (uses external `introduce/css/style.css`)
- `_backup/`: historical snapshots
- `skills/`, `.opencode/`: local skill configs
- `spec.md`: detailed spec for `catchball904.html` (shows style/requirements)

## Conventions
- **Language**: Chinese content/UI (class title, comments)
- **No external deps**: avoid CDN. Check `index.html` states "纯 HTML / CSS 原生实现 · 不使用 CDN"
- **Style**: matches existing patterns; see `index.html` card layout and `spec.md` for details
- **Naming**: files often follow patterns like `xxx904.html`, `xxx904.css` (e.g. `catchball904.html`, `css904.html`)
- **JS style** (from examples like `number7game904.html`, `js_array 904.html`): uses `var`, function declarations, Chinese section comments

## Key files
- `index.html`: homepage with exercise directory/cards
- `spec.md`: example of detailed requirements for an exercise
- `data.js`: shared data

## Working with files
- Most exercises are self-contained; prefer adding to existing patterns
- When adding new pages, update `index.html` navigation to follow the card style
- Preserve Chinese text and naming conventions

## Git
- Repo is tracked (`.git/`). Use `git` directly if committing; project also has `.opencode/skills/commit-to-gitee/` suggesting Gitee remote (see skill description). If asked to commit/push, consider using the repo's skill.
