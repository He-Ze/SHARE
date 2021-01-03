// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("调用成功");
  let text = event.text;  //记录你说了什么话。
  let fileIDs = event.fileIDs;  //文件就文件的路径。
  let name = event.name;  //集合的名字。
  let time = event.time;
  let DB = cloud.database().collection(name);
  DB.add({
    data: {
      text: text,
      fileIDs: fileIDs,
      time: time,
    }
  })
}