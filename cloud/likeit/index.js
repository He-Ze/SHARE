// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "xxxxxxxxx"
})

// 云函数入口函数
exports.main = async (event, context) => {  //参数隐藏在data里面，这里官方文档有。
  let db = cloud.database();
  let usrid = event.userInfo.openId;
  let _id = event.id;
  let _ = db.command;
  console.log(event);
  return await db.collection('mytest').where({
    _id: _.eq(_id),
  }).update({
    data: {
      likes: _.inc(1), //点赞成功就自增1。
      wholike: _.push([usrid]),  //喜欢的人的列表里面就加一。
    }
  }).then(res=>{
    console.log(res);
    if(res.stats.updated == 0)
    {
      return false;
    }
    else
    {
      return true;
    }
  })
}