// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "hello-world-6g4iksa825a9d027"
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("调用成功");
  let text = event.text;  //记录你说了什么话。
  let fileIDs = event.fileIDs;  //文件就文件的路径。
  let name = event.name;  //集合的名字。
  let time = event.time;  //记录本机时间。 
  let usrid = event.usrid; //记录用户id。

  let db = cloud.database();  //得到数据库的使用。
  let DB = db.collection(name); //得到我们想要的集合。
  DB.add({
    data: {
      text: text,
      fileIDs: fileIDs,
      time: time,
      createtime: db.serverDate(),
      likes: 0,  //如果喜欢为0的话到时候我们就不用怕重复点赞了。
      wholike:[],  //记录谁喜欢用户。
      usrid:usrid,
    }
  })
  /*.then(res=>{
    DB = db.collection('like'); //谁喜欢这个数据就可以点赞。
    DB.add({
      data:{
        inforid:res._id,  //就是该条言论在mytest集合里面的唯一标识。
        wholike:[]
      }
    })
  })*/
  return true;
}