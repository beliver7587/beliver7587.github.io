// 简单的Node.js服务器
const http = require('http');
const fs = require('fs');
const path = require('path');

// 商品数据
const products = [
  { id: 1, name: '腾讯云轻量服务器抢购', price: 10 },
  { id: 2, name: '前端网页定制', price: 600 },
  { id: 3, name: '刷机（Linux，win，mac等都可）', price: 20 },
  { id: 4, name: 'galgame（各种流行的）', price: 2 }
];

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }
  
  // API路由
  if (req.url === '/api/products' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(products));
    return;
  }
  
  // 处理静态文件请求
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
  }
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 404;
      res.end('File not found');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(content, 'utf-8');
    }
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

console.log('Node.js电商后端服务器已创建');
console.log('商品列表:');
products.forEach(product => {
  console.log(`- ${product.name}: ${product.price}元`);
});