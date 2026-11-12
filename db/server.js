/* ============================================================
   功能名称：诗词数据服务器（Express）
   功能简介：读取同目录下的 db.json，对外提供两个接口：
             GET /api/poems    → poems 数组（诗词列表）
             GET /api/authors  → authors 数组（作者列表，任务二新增）
   作者：张敬恒 | 时间：2026-11-12 | 使用模型：DeepSeek-V4.1-Flash
   ============================================================ */

// express 需先在 db 文件夹内执行 npm install express
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const zjh_port = 3005;      /* 本步骤要求的端口号 */
const zjh_portOld = 3004;   /* 兼容三个 JSON/fetch 任务页（它们还写着 3004） */

/*
  功能名称：读取数据文件
  作用：把 db.json 读成字符串再用 JSON.parse 转成对象
  实现思路：用 path.join(__dirname, 'db.json') 拼绝对路径，
            保证不管从哪个目录启动 node server.js 都能找到数据文件
*/
function zjh_readDb() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8')
  );
}

/*
  功能名称：GET /api/poems
  作用：返回诗词数组
  实现思路：读文件 → 取 zjh_data.poems → res.json 自动做
            JSON.stringify 并设置 Content-Type；
            加 Access-Control-Allow-Origin 让 file:// 打开的页面也能请求
*/
app.get('/api/poems', (req, res) => {
  const zjh_data = zjh_readDb();
  res.set('Access-Control-Allow-Origin', '*');
  res.json(zjh_data.poems);
});

/*
  功能名称：GET /api/authors（任务二）
  作用：返回作者数组，结构与 poems 平行
  实现思路：同样读一次 db.json，只取 authors 字段返回，
            这样前端可以用 Promise.all 同时请求两个接口
*/
app.get('/api/authors', (req, res) => {
  const zjh_data = zjh_readDb();
  res.set('Access-Control-Allow-Origin', '*');
  res.json(zjh_data.authors);
});

/*
  功能名称：启动服务
  作用：主端口监听 3005，同时保留 3004 供三个任务页使用
  实现思路：端口抽成变量 zjh_port，端口被占用时改这里，
            同时要同步改前端 fetch 的地址；两个端口共用同一个 app，
            所以接口逻辑只写一次
*/
app.listen(zjh_port, () => {
  console.log(`数据服务器已启动：http://localhost:${zjh_port}/api/poems`);
});

app.listen(zjh_portOld, () => {
  console.log(`兼容端口也已启动：http://localhost:${zjh_portOld}/api/poems`);
});
