const Router = require('koa-router')
const router = new Router()
const query = require("./mysql");
router.get("/main/current", async (ctx, next) => {
    const sqlStr = `select * from  fishbowl_state;`;
    const ans=await query(sqlStr);
    if(ans.length){
        Object.keys(ans[0]).forEach(key => {
            if(key!=="water_quality"&&key!=="target_temperature"&&key!=="id"&&key!=="current_temperature"&&key!=="time"){
                if(ans[0][key] === 1){
                    ans[0][key]=true
                }else {
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
    const sqlStr = `SELECT * 
    FROM temp_his 
    WHERE DATE_FORMAT(time,'%Y-%m-%d')='${ctx.query.date}';`;
    const ans=await query(sqlStr);
    ans.forEach(e=>{
        e.time=e.time.slice(11);
    })
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
    const sqlStr = `SELECT * 
    FROM water_his 
    WHERE DATE_FORMAT(time,'%Y-%m-%d')='${ctx.query.date}';`;
    const ans=await query(sqlStr);
    ans.forEach(e=>{
        e.time=e.time.slice(11);
    })
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

  router.post("/main/switches", async (ctx, next) => {
    const sqlStr = `update fishbowl_state set ?;`;
    const obj={...ctx.query}
    Object.keys(obj).forEach(key => {
        obj[key]=obj[key]==='true'?1:0;
    })
    const ans=await query(sqlStr,[obj]);
    if(ans){
        ctx.status = 200;
        ctx.body={
            message: 'success',
        }
    }else{
        ctx.status = 404;
        ctx.body={
            message: 'error',
        }
    }
  });
module.exports =router






