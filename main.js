const Router = require('koa-router')
const router = new Router()
const query = require("./mysql");
router.get("/main/current", async (ctx, next) => {
    const sqlStr = `select * from  fishbowl_state;`;
    const ans=await query(sqlStr);
    if(ans.length){
        Object.keys(ans[0]).forEach(key => {
            if(key!=="current_temperature"&&key!=="target_temperature"&&key!=="id"){
                if(ans[0][key] === 1){
                    ans[0][key]=true
                }else if(ans[key] === 0){
                    ans[0][key]=false
                }
            }
        })
        ctx.status = 200;
        ctx.body={
            message: 'success',
            body: ans
            
        }
    }else{
        ctx.status = 404;
        ctx.body={
            message: 'error',
        }
    }
  });

  router.get("/main/history/temperature", async (ctx, next) => {
    const sqlStr = `select * from  temp_his;`;
    const ans=await query(sqlStr);
    if(ans.length){
        ctx.status = 200;
        ctx.body={
            message: 'success',
            body: ans
        }
    }else{
        ctx.status = 404;
        ctx.body={
            message: 'error',
        }
    }
  });

  router.get("/main/history/water", async (ctx, next) => {
    const sqlStr = `select * from  water_his;`;
    const ans=await query(sqlStr);
    if(ans.length){
        ctx.status = 200;
        ctx.body={
            message: 'success',
            body: ans
        }
    }else{
        ctx.status = 404;
        ctx.body={
            message: 'error',
        }
    }
  });
module.exports =router