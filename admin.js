const Router = require('koa-router')
const router = new Router()
const query = require("./mysql");
const jsonwebtoken = require('jsonwebtoken')
  router.post("/admin/register", async (ctx, next) => {
    const data=ctx.query
    if (!data.username || !data.password) {
        ctx.status = 400;
        ctx.body = {
          error: `expected an object with username, password but got: ${data}`,
        }
        return;
      }
      try{
        const sqlStr = `insert into admin values(?,?);`;
        const ans=await query(sqlStr,[data.username,data.password]);
        ctx.status = 200;
        ctx.body = {
          message: '注册成功',
          token:jsonwebtoken.sign({
            data: data.username,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60), // 60 seconds * 60 minutes = 1 hour
          }, 'Gopal_token'),
        }
      }catch(e){
        ctx.status = 404;
        ctx.body = {
          message: '用户名已经存在',
        }
      }
    next()
  });
  router.post("/admin/login", async (ctx, next) => {
    const sqlStr = `select * from admin where username=? and password=?;`;
    const ans=await query(sqlStr,[ctx.query.username,ctx.query.password]);
    if(ans.length){
        ctx.status = 200;
        ctx.body={
            message: '登录成功',
            token: jsonwebtoken.sign({
                data: ctx.query.username,
                // 设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60), // 60 seconds * 60 minutes = 1 hour
              }, 'Gopal_token'),
        }
    }else{
        ctx.status = 404;
        ctx.body={
            message: '用户名或密码输入错误',
        }
    }
    next()
  });
  module.exports =router