const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const jwt = require('koa-jwt')


const router = new Router()
const query = require("./mysql");
const adimnRouter = require("./admin");
const mainRouter = require("./main");
const strategyRouter = require("./strategy");

const bodyParser=require('koa-bodyparser'); 
app.use(bodyParser());

const cors = require('koa2-cors')

app.use(cors({
  origin:"*", // 允许来自指定域名请求
  maxAge: 500, // 本次预检请求的有效期，单位为秒。
  methods:['GET','POST'],  // 所允许的HTTP请求方法
  alloweHeaders:['Content-Type'], // 服务器支持的所有头信息字段
  credentials: true // 是否允许发送Cookie
}))

const errorHandle = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      console.log(err);
    }
  });
}
app.use(errorHandle)

// app.use(jwt({
//   secret: 'Gopal_token'
// }).unless({ // 配置白名单
//   path: [/\/admin\/register/, /\/admin\/login/]
// }))
app.use(router.routes())
app.use(mainRouter.routes())
app.use(adimnRouter.routes())
app.use(strategyRouter.routes())


app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})

