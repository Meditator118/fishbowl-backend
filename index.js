const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

const router = new Router()
const db = require("./config");
const query = require("./mysql");

router.post("/add", async (ctx, next) => {
    const sqlStr = `insert into administrator values(?,?,?);`;
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

app.use(router.routes())

app.listen(3333, ()=>{
  console.log('server is running at http://localhost:3333')
})

