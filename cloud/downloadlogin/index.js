// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {  //参数隐藏在data里面，这里官方文档有。
  console.log("begin");
  let db = cloud.database();
  let DB = db.collection('usr');
  let id = event.usrid; //需要的参数只有usrid就可以了。
  const _ = db.command; //得到命令；
  let info = DB.where({
    usrid : _.eq(id)
  }).get();
  console.log("good");
  return info;
}