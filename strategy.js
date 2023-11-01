const Router = require('koa-router')
const router = new Router()
const query = require("./mysql");
router.post("/strategy/feed/now", async (ctx, next) => {
    // 发出喂食指令
        ctx.status = 200;
        ctx.body={
            message: 'success',
        }
    next()
  });

router.get("/strategy/:option", async (ctx, next) => {
    console.log(ctx.params);
    const sqlStr = `select * from  ${ctx.params.option}_strategy;`;
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
    next()
  });

  router.post("/strategy/feed", async (ctx, next) => {
    const clear=`truncate table feed_strategy`
    await query(clear,[]);
    console.log(ctx.request.body.data);
    const sqlStr = `insert into feed_strategy values(?,?);`;
    try {
        ctx.request.body.data.forEach(async (e)=>{
            await query(sqlStr,[e.feed_time,e.amount]);
        })
        ctx.status = 200;
        ctx.body={
            message: 'success',
        }
    } catch (error) {
        ctx.status = 404;
        ctx.body={
            message: 'error',
        }
        
    }
    next()
  });
  
  router.post("/strategy/:option", async (ctx, next) => {
    const sqlStr = `update ${ctx.params.option}_strategy set ?;`;
    const ans=await query(sqlStr,[ctx.query]);
    console.log(ans);

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
    next()
  });
module.exports =router