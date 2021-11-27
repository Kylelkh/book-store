const path = require('path')
const jsonServer = require('json-server');
// 使用js动态数据库，返回方法需要执行
const mock = require('mockjs');
const router = jsonServer.router(require('./db')());
const mr = mock.Random;

const API = '/api'; // 路由根地址
const DELAY = 500;// 路由延迟返回

// 创建服务器
const server = jsonServer.create();
// 静态路由
server.use(jsonServer.defaults({
  static: path.join(__dirname, '/public'),
}));
// 抓取body数据
server.use(jsonServer.bodyParser);

// 全局路由，校验token
// server.use((req, res, next) => {
//   // 组合所有携带信息
//   req.paramList = {
//     ...req.headers,
//     ...req.query,
//     ...req.body
//   };
//   // 只有个人中心需要验证token
//   (!/user/.test(req.url) || req.paramList.token) ? next() : res.jsonp({
//     err: 1,
//     msg: "登录已过期，请重新登录"
//   });
// })

// 登录
// server.post(`${API}/login`, (req, res) => {
//   let {
//     username,
//     password
//   } = req.paramList;
//   if (!username || !password) {
//     return res.jsonp({
//       err: 1,
//       msg: "用户名和密码是必传参数"
//     })
//   }
//   (username === 'a0' && password === 'aaa') ? res.jsonp({
//     err: 0,
//     msg: "登录成功",
//     data: {
//       id: 1e4,
//       _id: 1e4 + '',
//       follow: mr.integer(10, 100),
//       fans: mr.integer(10, 100),
//       nikeName: mr.cname() + mr.cname(),
//       pubArt: mr.integer(10, 100),
//       priArt: mr.integer(10, 100),
//       draArt: mr.integer(10, 100),
//       favorite: mr.integer(10, 100),
//       time: mr.integer(1437235017365, 1637235017365),
//       icon: '/upload/user/default.jpeg',
//       token: 'token'
//     }
//   }) : res.jsonp({
//     err: 1,
//     msg: "用户名或密码错误，请重试"
//   })
// })

// 注册
// server.post(`${API}/reg`, (req, res) => {
//   let {
//     username,
//     password,
//     nikename
//   } = req.paramList;
//   if (!username || !password) {
//     return res.jsonp({
//       err: 1,
//       msg: "用户名和密码是必传参数"
//     })
//   }
//   (username !== 'a0') ? res.jsonp({
//     err: 0,
//     msg: "注册成功",
//     data: {
//       id: 1e4,
//       _id: 1e4 + '',
//       follow: mr.integer(10, 100),
//       fans: mr.integer(10, 100),
//       nikeName: nikename ? nikename : mr.cname() + mr.cname(),
//       pubArt: mr.integer(10, 100),
//       priArt: mr.integer(10, 100),
//       draArt: mr.integer(10, 100),
//       favorite: mr.integer(10, 100),
//       time: mr.integer(1437235017365, 1637235017365),
//       icon: "/upload/default.jpeg",
//       token: 'token'
//     }
//   }) : res.jsonp({
//     err: 1,
//     msg: "该用户已存在"
//   })
// })

// 自定义路由返回结构
router.render = (req, res) => {
  const len = Object.keys(res.locals.data).length;
  setTimeout(() => {
    res.jsonp({
      err: Number(!len),
      msg: `获取数据${len ? "成功" : "失败"}`,
      data: res.locals.data,
    })
  }, DELAY)
}

// 定义路由接口别名
server.use(jsonServer.rewriter({
  [`${API}/*`]: '/$1',
  '/:resource/:id/show': '/:resource/:id'
}));

// 路由响应
server.use(router);

// 开启jsonServer
server.listen(3000)
