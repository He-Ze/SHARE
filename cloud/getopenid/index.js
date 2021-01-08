// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "xxxxxxxxx"
})

// 云函数入口函数
exports.main = async (event, context) => {  //参数隐藏在data里面，这里官方文档有。
  let data = await cloud.getWXContext();
  console.log(data);
  return data;
}