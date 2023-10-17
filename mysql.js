//mysql.js
const mysql = require("mysql");

//创建连接池 
var pool = mysql.createPool({
    host: "127.0.0.1",
  user: "root",
  password: "hzj1108",
  database: "acid",
})
const query=function (sql,values){
    return new Promise((res,rej)=>{
        pool.getConnection(function(err,connection){
             if(err){
                 rej(err)
             }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        rej(err)
                    }else{
                        res(rows)
                    }
                })
             }
        })
    })
}
module.exports = query;
