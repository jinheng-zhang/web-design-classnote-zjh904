# Swiper 课堂任务 · AI 提示词记录

> 课程：高级网页设计 · Swiper 轮播组件专题《大国重器光影展》  
> 作者：张敬恒　学号：24001010904　完成日期：2026-11-05  
> AI 协作模型：Space Bunny（WorkBuddy）  
> 对应页面：`swiper-lesson.html`（讲解版 + 三项任务完成版）、`swiper-task.html`（操作任务版 · 四项任务完成版）

---

## 任务一 · 提示词工程师：让 AI 听懂需求 ⭐⭐

需求原文（老师给的）：① 无缝循环 ② 3.2 秒自动翻页且手动操作后不停止 ③ 圆点分页器可点击 ④ 初始效果为 `cube`。

### 第 1 轮提示词

```text
用 JavaScript + Swiper 11 写一个轮播初始化配置 new Swiper('#zjhSw4', {...})，要求：
1. 无缝循环播放
2. 每 3.2 秒自动翻页
3. 底部有圆点分页器
4. 初始切换效果是 cube（3D 立方体）
```

### AI 第 1 轮回答要点

```js
new Swiper('#zjhSw4', {
  loop: true,
  effect: 'cube',
  speed: 800,
  autoplay: { delay: 3200 },
  pagination: { el: '#zjhPag4' }
});
```

### 我的核对结论（对照官方 `swiper/demo/257-effect-creative.html` 与 `types/swiper-options.d.ts` 逐项比对）

**两处没写清楚**——

| 老师的需求 | 第 1 轮是否覆盖 | 问题 |
|---|---|---|
| ① 无缝循环 | ✅ `loop: true` | — |
| ② 3.2 秒自动翻页 | ⚠️ 部分 | 只有 `delay: 3200`，**缺 `disableOnInteraction: false`** → 手动滑动后自动播放会停，违背"手动操作后不停止" |
| ③ 圆点可点击 | ⚠️ 部分 | **缺 `clickable: true`** → 圆点只显示、点不动 |
| ④ 初始 effect 为 cube | ✅ `effect: 'cube'` | — |

### 第 2 轮提示词

```text
在上一版基础上补两条硬性要求：
1. autoplay 里加 disableOnInteraction: false，用户手动滑动之后自动播放继续；
2. pagination 里加 clickable: true，圆点可点击直接跳到对应图片。
另外请把完整的 new Swiper('#zjhSw4', {...}) 代码原样给我，并用一句话说明每项配置的作用，我要直接粘进页面验证。
```

### AI 第 2 轮回答要点

补齐了 `disableOnInteraction: false` 与 `clickable: true`，并逐行解释了
`loop`（无缝循环）、`autoplay.delay`（停留毫秒）、`autoplay.disableOnInteraction`（交互后是否停）、
`pagination.el`（圆点容器）、`pagination.clickable`（圆点可点）、`effect`（动效名）。

### 验证结果（亲自粘进页面实测）

读浏览器控制台拿到实例参数：

```js
swiper.params.loop                          // true
swiper.params.autoplay.delay                // 3200
swiper.params.autoplay.disableOnInteraction // false
swiper.params.pagination.clickable          // true
swiper.params.effect                        // 'cube'
```

**四项需求全部命中**，圆点数与展品数一致，键盘 ← → 可翻页，无 JS 报错。

### 一句话结论

第 1 轮提示词漏掉的不是"不会写"，而是**需求里的限定词没翻译成参数名**——
"手动操作后不停止"要译成 `disableOnInteraction: false`，"圆点可点击"要译成 `clickable: true`。
第 2 轮把这四个参数名直接点名给 AI，答案一次到位。

### 答辩抽问准备

**问：你的第一版提示词漏掉了哪个需求？你是怎么在第二轮里"说清楚"的？AI 第一次给的代码错在哪？**

漏的是两条带"限定词"的需求：`autoplay.disableOnInteraction` 和 `pagination.clickable`。
第 1 轮我只写了"3.2 秒自动翻页""有圆点分页器"，把"手动操作后不停止""圆点可点击"当成了自然语义，
但对 AI 来说这是两个**必须显式命名的参数**，不点名它就不会写。

第 2 轮改成**直接把参数名写进需求**（"加 `disableOnInteraction: false`""加 `clickable: true`"），
并补一句"给我可粘进页面的完整代码"，AI 一次给对。

AI 第 1 轮不算语法错，而是**语义漏项**：代码能跑、圆点能显示，但点不动、拖完会停。
这类错误编译器查不出来，只能靠**对着需求逐条核对参数表**发现——这正是老师说的"AI 也会犯错，必须验证"。

---

## 任务二 · creative 仿写：课堂没讲，AI 教你 ⭐⭐⭐

产出：演示四新增第 7 个按钮 **「creative 电影墙（自研·任务二）」**。

### 提示词 A（向 AI 请教未讲过的 API）

```text
我要给 Swiper 轮播加一个课堂没讲的第 7 种效果 creative（自定义变换）。请打开官方示例
swiper/demo/257-effect-creative.html，读懂 creativeEffect，回答我三件事：
1. creativeEffect 里 prev 和 next 各自能写哪些参数？分别控制什么？
2. translate 数组的三个值 [x, y, z] 单位分别是什么？百分比是相对哪个元素算的？
3. 怎样实现"上一张缩小左移并带角度、下一张放大右移进场"这种电影墙效果？给我一段可直接用的配置。
```

### AI 回答要点（随后对照本地 `swiper/types/modules/effect-creative.d.ts` 逐条核实）

`prev` / `next` 各支持 6 个可选参数：

| 参数 | 类型 | 作用 |
|---|---|---|
| `translate` | `[x, y, z]` | 位移，x/y 可写字符串百分比或数字 px，z 只能 px |
| `rotate` | `[x, y, z]` | 三轴旋转，单位 deg |
| `opacity` | number | 透明度 |
| `scale` | number | 缩放 |
| `shadow` | boolean | 投影 |
| `origin` | string | 变换原点，如 `'right center'` |

顶层还有 `limitProgress`（默认 1）、`shadowPerProgress`（默认 false）、
`progressMultiplier`（默认 1）、`perspective`（默认 true）。

### 提示词 B（追问：百分比的参照物 + 落地配置）

```text
你说 translate 用百分比，那这个百分比到底是相对【幻灯片自己】还是相对【外层容器】算的？
我本地已经装了 swiper 11.0.3 源码，请直接在 swiper/modules/effect-creative.mjs 里
找到给 slide 写 transform 的那段代码，用源码回答我；然后按"上一张缩小左移带角度、
下一张放大右移进场"给我最终配置。
```

### AI 回答要点（源码佐证）

`effect-creative.mjs` 中：

```js
const getTranslateValue = value => {
  if (typeof value === 'string') return value;   // 字符串原样透传 → '-22%' 直接进 transform
  return `${value}px`;
};
// ...
targetEl.style.transform = transform;              // targetEl = slideEl 本身
```

因此百分比按 CSS 标准 transform 规则，**相对该张幻灯片自身的边框盒**解析。

### 最终配置（已落地到页面）

```js
creativeEffect: {
  prev: {
    shadow: true,
    translate: ['-22%', 0, -140],   // 左移自身宽度的 22%，并向后退 140px
    scale: 0.78,                     // 缩小到 0.78 倍
    rotate: [0, 0, -8],              // Z 轴倾斜 8 度
    opacity: 0.75,                   // 半隐
    origin: 'right center'           // 以右边缘为中心缩放
  },
  next: {
    shadow: false,
    translate: ['100%', 0, 0],       // 从自身宽度 100% 处（画面右外侧）推进
    scale: 1.12,                     // 放大到 1.12 倍
    opacity: 1,
    origin: 'left center'
  },
  limitProgress: 1,
  perspective: true
}
```

### 验证结果

点「creative 电影墙」→ `params.effect` 变为 `'creative'`，圆点仍 6 个、slide 仍 6 张
（重建后无重复、无循环副本残留），无 JS 报错；
实际观感：左侧上一张**缩小并向左退走、同时带约 8 度倾角**，右侧下一张**从画面右外侧推进并放大**，纵深明显。

### 自己用自己的话回答（答辩抽问）

**问：prev / next 的 transform 各控制什么？transform 里的百分号是相对谁的？改一个数值让卡片转 20 度试试？**

- **prev / next 各管什么**：`prev` 管的是**当前这张左边、正在退场的那张**；`next` 管的是**右边那张、正在进场的那张**。
  两者是"一退一进"，合起来才有纵深。
  我的电影墙写法里，`prev` 用 `translate: ['-22%', 0, -140]`（向左推 22%、再往后推 140px）配
  `scale: 0.78`（缩到 0.78 倍）、`rotate: [0, 0, -8]`（Z 轴歪 8 度）、`opacity: 0.75`（半隐），
  合起来就是**"镜头往后拉，墙上的照片越退越小、还歪着"**；
  `next` 用 `translate: ['100%', 0, 0]`（从右边 100% 处推入）配 `scale: 1.12`，
  就是**"镜头往前推，下一张照片迎面变大"**。
- **百分号相对谁**：相对**这张幻灯片自己的宽/高**，不是外层容器。
  所以 `'-22%'` 是"这张照片自身宽度的 22%"；这也是为什么官方示例用 `'100%'` 能把下一张完全推到画面外——正好是它自己的一整个宽度。
- **转 20 度**：把 `rotate` 的第三个值（Z 轴）改成 `[0, 0, 20]` 即可。
  `rotate` 数组依次是 X / Y / Z 轴，第三个才是画面里"转个角度"的那个平面旋转。

---

## 任务三 · 综合创作 + 技术答辩 ⭐⭐⭐

产出 ①：新增第六件展品 **爱达·魔都号**（AI 生成横版 16:9 图片 `swiper-imgs/aida_modu_1.jpg`），四个演示轮播均已补齐 slide 结构。
产出 ②：超纲能力选用 **keyboard 键盘控制**（← → 方向键翻页）。

### 提示词 A（生成第六件展品图片）

```text
帮我生成一张【横版 16:9】的图片：大型豪华邮轮「爱达·魔都号」航行在蔚蓝海面上的英雄镜头。
主体是一艘白色与深蓝涂装的现代大型邮轮，船体修长优雅，舷侧可见层叠的甲板与落地舷窗，
船首劈开浪花向前航行；远处是晨光中的海平面与淡淡云层，天空呈清澈的蓝到暖橙渐变，
海面有细碎波光反射阳光。整体为高质感写实摄影风格，光线明亮通透，色彩高级
（深蓝、纯白、暖金阳光），景深自然，画面干净，【无任何文字、logo、水印】。
```

### AI 回答要点

按 1536×864（正好 16:9）生成了 PNG 原图。

### 我核对后发现并改掉的问题

AI 给的是 **PNG、1.88 MB**，而 `swiper-imgs/` 里另外 5 张展品都是 **JPG**，体量也不一致。

我的处理：本机没有 PIL / ImageMagick，就用 **Chrome 的 canvas 把 PNG 转成 JPG**
（`canvas.toDataURL('image/jpeg', 0.88)`，再用 `--allow-file-access-from-files` 解决 file:// 下 canvas 被污染无法导出的问题），
体积从 **1.88 MB 降到 272 KB**，比例仍是 1536×864 = 16:9，
**画面右下角的「AI生成」水印我特意保留**——它就是这张图由 AI 生成的现场凭证。

### 提示词 B（超纲能力：键盘控制）

```text
在 Swiper 轮播上再加一个【课堂没讲过】的能力，我选 keyboard 键盘控制。
请告诉我 keyboard 参数该怎么写、默认行为是什么、以及有没有什么坑
（比如会不会影响我在输入框里打字）。
```

### AI 回答要点

`keyboard: { enabled: true }` 即可开启；`onlyInBrowser: true` 表示只在真实浏览器窗口里生效、
不在 iframe / 某些编辑器环境里劫持方向键。**我采纳了这一条并补上了 `onlyInBrowser: true`**，
避免在课堂编辑时误触翻页。

### 验证结果

- 新增展品后四个演示轮播的 slide 均为 **6 张**，圆点均为 **6 个**；
- `swiper.params.keyboard.enabled === true`、`onlyInBrowser === true`，按 ← → 可翻页且不影响页面滚动；
- 重建实例后配置依然保留。

### 答辩四连问准备

**① 这段代码什么意思？**
`keyboard: { enabled: true, onlyInBrowser: true }` 是 Swiper 的键盘控制模块，
开启后用户按键盘方向键 ← → 就能切换上一张 / 下一张，不用鼠标拖；
`onlyInBrowser` 把这个能力限制在真实浏览器里。

**② AI 第一次给的哪里不对、你改了什么？**
AI 第一次只给 `keyboard: { enabled: true }`，漏了 `onlyInBrowser`。
我读源码时发现 `keyboard` 模块默认会在绑定页面时监听 `keydown`，
在编辑器里敲方向键可能误翻页，于是**补上了 `onlyInBrowser: true`**。

**③ 新参数的作用？**
`keyboard.enabled` 开关键盘控制；`keyboard.onlyInBrowser` 限定只在浏览器生效；
`keyboard.pageUpPageDown` 可额外启用 PageUp / PageDown 翻页。

**④ 现场把 delay 改成指定值并解释预期变化？**
改 `autoplay.delay` 的毫秒数即可，它表示**每张图停留多久再翻到下一张**：
改成 `1000` 就是 1 秒翻一张（节奏明显变快、更像广告 Banner）；
改成 `8000` 就是 8 秒一张（变慢、适合需要看清文字的展品说明）；
`delay` 只影响停留时长，`speed` 才决定切换动画本身走多快，两者互不干扰。

---

## 提交物清单与自评

| 提交物 | 位置 |
|---|---|
| 能运行的页面（讲解版 + 三任务完成） | `swiper-lesson.html` |
| 能运行的页面（操作任务版 · 四任务完成） | `swiper-task.html` |
| AI 生成图片（第六件展品） | `swiper-imgs/aida_modu_1.jpg` |
| 关键对话记录（本文件 + 页面内记录区） | 本文件 · `swiper-lesson.html` 底部「课堂任务完成记录区」 |
| 全部提示词日志（项目规范留档） | `zjh_prompt.md` |

**三连自评**

- **能跑** ✔ 4 个轮播实例全部正常 · 6 件展品 · 7 种 effect（含自研 creative）· 键盘控制可用 · 零 JS 报错
- **能讲清** ✔ 每个参数的作用与来源都能对着 Swiper 11.0.3 源码说明
- **能现场改** ✔ 改 `autoplay.delay`、改 `creativeEffect.rotate` 的 Z 轴值即可现场验证
