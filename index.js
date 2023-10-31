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


router.post("/add", async (ctx, next) => {
    const sqlStr = `insert into administrator values(?,?);`;
    const ans=await query(sqlStr,[ctx.query.username,ctx.query.phonenum,ctx.query.passwords]);
    ctx.body='添加成功'
    next()
  });


  // // 删除
  router.delete("/:username", async (ctx, next) => {
    const sqlStr = `delete from administrator  where username=?;`;
    const ans=await query(sqlStr,ctx.params.username);
    ctx.body='删除成功'
  });

  // // 修改
  router.post("/:username", async (ctx, next) => {

    const sqlStr = `update administrator set phonenum=? where username=?;`;
    const ans=await query(sqlStr,[ctx.query.phonenum,ctx.params.username]);
    ctx.body='修改成功'
  });
  

  // 查询一条
  router.get("/:username", async (ctx, next) => {
    const sqlStr = `select * from administrator where username=?;`;
    const ans=await query(sqlStr,ctx.params.username);
    ctx.body=ans

  });
  router.get("/", async (ctx, next) => {
    const sqlStr = `select * from administrator;`;
    const ans=await query(sqlStr);
    ctx.body=ans
  });

  const errorHandle = (ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
        };
      } else {
        throw err;
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

