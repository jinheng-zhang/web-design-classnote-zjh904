/* ============================================================
   JS 整体职责：可复用的 Tab 选项卡组件（外部引用文件）
   作者：张敬恒 | 时间：2026-11-02 | 使用模型：DeepSeek-V4.1-Flash
   ============================================================ */

/* ============================================================
   功能名称：Tab 选项卡初始化（可复用）
   作用：为页面上任意一个选项卡容器绑定切换逻辑，同一份代码可在多个页面、
         多个选项卡组中重复使用，无需复制粘贴
   实现思路：
     1. 通过配置对象接收容器选择器、选项卡选择器、面板选择器与类名，默认值适配本页结构
     2. 用事件委托（在容器上只监听一次 click）代替逐个绑定，动态新增选项卡也自动生效
     3. 点击时先循环清除所有选项卡的选中状态与所有面板的显示状态，
        再单独为当前元素设置选中状态，保证任意时刻只有一个选项卡处于选中态
     4. 切换完成后通过 onChange 回调向外通知，方便复用方扩展业务逻辑
   参数：zjh_options 配置对象
     - root          选项卡容器选择器，默认 '.zjh_tabs'
     - tabSelector   选项卡选择器，默认 '.zjh_tab'
     - panelSelector 内容面板选择器，默认 '.zjh_panel'
     - activeClass   选项卡选中类名，默认 'zjh_active'
     - showClass     面板显示类名，默认 'zjh_show'
     - onChange      切换回调，参数为（当前分类值, 选项卡元素, 面板元素）
   返回：无
   ============================================================ */
function zjh_initTabs(zjh_options) {
    /* ---- 1. 合并默认配置，定位选项卡容器 ---- */
    zjh_options = zjh_options || {};
    var zjh_root = document.querySelector(zjh_options.root || '.zjh_tabs');
    if (!zjh_root) {
        return;
    }

    var zjh_tabSelector = zjh_options.tabSelector || '.zjh_tab';
    var zjh_panelSelector = zjh_options.panelSelector || '.zjh_panel';
    var zjh_activeClass = zjh_options.activeClass || 'zjh_active';
    var zjh_showClass = zjh_options.showClass || 'zjh_show';

    /* ---- 2. 缓存选项卡与面板集合，避免每次切换重复查询 ---- */
    var zjh_tabs = zjh_root.querySelectorAll(zjh_tabSelector);
    var zjh_panels = zjh_root.querySelectorAll(zjh_panelSelector);
    if (zjh_tabs.length === 0) {
        return;
    }

    /* ============================================================
       功能名称：切换到指定分类
       作用：清除全部选中/显示状态，再设置当前选项卡与对应面板的选中状态
       实现思路：先做两轮循环"全部重置"，再用属性选择器定位当前元素单独赋值，
                 这样无论之前选中的是哪一个，都能干净地切换过去
       ============================================================ */
    function zjh_switchTo(zjh_key) {
        var zjh_i;
        var zjh_j;

        /* 第一步：清除所有选项卡的选中状态 */
        for (zjh_i = 0; zjh_i < zjh_tabs.length; zjh_i++) {
            zjh_tabs[zjh_i].classList.remove(zjh_activeClass);
            zjh_tabs[zjh_i].setAttribute('aria-selected', 'false');
            zjh_tabs[zjh_i].setAttribute('tabindex', '-1');
        }

        /* 第二步：隐藏所有内容面板，避免上一个分类的内容残留 */
        for (zjh_j = 0; zjh_j < zjh_panels.length; zjh_j++) {
            zjh_panels[zjh_j].classList.remove(zjh_showClass);
            zjh_panels[zjh_j].setAttribute('hidden', 'hidden');
        }

        /* 第三步：设置当前元素的选中状态（按 data-tab 属性值匹配） */
        var zjh_currentTab = zjh_root.querySelector(zjh_tabSelector + '[data-tab="' + zjh_key + '"]');
        if (zjh_currentTab) {
            zjh_currentTab.classList.add(zjh_activeClass);
            zjh_currentTab.setAttribute('aria-selected', 'true');
            zjh_currentTab.setAttribute('tabindex', '0');
        }

        /* 第四步：显示与当前分类对应的内容面板（按 data-panel 属性值匹配） */
        var zjh_currentPanel = zjh_root.querySelector(zjh_panelSelector + '[data-panel="' + zjh_key + '"]');
        if (zjh_currentPanel) {
            zjh_currentPanel.classList.add(zjh_showClass);
            zjh_currentPanel.removeAttribute('hidden');
        }

        /* 第五步：向外抛出切换结果，复用方可在此做埋点、请求数据等扩展 */
        if (typeof zjh_options.onChange === 'function') {
            zjh_options.onChange(zjh_key, zjh_currentTab, zjh_currentPanel);
        }
    }

    /* ============================================================
       功能名称：选项卡点击事件监听
       作用：在整个容器上监听一次 click，点击任意选项卡即切换分类
       实现思路：事件委托——从事件目标逐级向上查找最近的选项卡元素，
                 命中则取出 data-tab 值并调用切换函数；未命中则忽略本次点击，
                 比起给每个选项卡单独绑定，代码更短且兼容后续动态插入的选项卡
       ============================================================ */
    zjh_root.addEventListener('click', function (zjh_event) {
        var zjh_node = zjh_event.target;

        /* 向上查找，直到命中选项卡或到达容器边界 */
        while (zjh_node && zjh_node !== zjh_root) {
            if (zjh_node.matches && zjh_node.matches(zjh_tabSelector)) {
                break;
            }
            zjh_node = zjh_node.parentNode;
        }

        /* 没有命中选项卡就直接返回 */
        if (!zjh_node || zjh_node === zjh_root) {
            return;
        }

        var zjh_key = zjh_node.getAttribute('data-tab');
        if (!zjh_key) {
            return;
        }

        zjh_switchTo(zjh_key);
    });

    /* ---- 3. 初始化默认选中项 ---- */
    /* 优先采用 HTML 中已标记 zjh_active 的选项卡，否则回退到第一个 */
    var zjh_defaultTab = zjh_root.querySelector(zjh_tabSelector + '.' + zjh_activeClass);
    if (!zjh_defaultTab) {
        zjh_defaultTab = zjh_tabs[0];
    }
    zjh_switchTo(zjh_defaultTab.getAttribute('data-tab'));
}

/* 挂载到 window 上，供外部页面直接调用 */
window.zjh_initTabs = zjh_initTabs;
