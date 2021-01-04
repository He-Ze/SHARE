// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//云函数的返回值有玄妙，我真是操了。

// 云函数入口函数
exports.main = async (event, context) => {  //参数隐藏在data里面，这里官方文档有。
  //let name = 'usr';
  let usrhead = event.usrhead;  //头像的相对路径
  let usrid = event.usrid;  //微信用户的id。
  let usrname = event.usrname;  //微信用户姓名。

  let db = cloud.database();  //获得数据库。
  const _ = db.command; //这个可以得到命令。
  let DB = db.collection('usr');  //得到用户数据。
  let tempdata = DB.where({
    usrid : _.eq(usrid)
  }).get(); //得到用户数据的计数。

  tempdata.then(async res=>{
    console.log(res);
    if(res.data.length != 0)  //如果已经存在这个用户数据了，那么就继续执行。
  {
    let oldfile = res.data[0]['usrhead']; //得到云存储的照片路径。
    let temp_id = res.data[0]['_id']; //得到我们想要的id值。
    console.log(temp_id);
    console.log(usrname);
    DB.doc(temp_id).update({
      data:{
        usrhead : usrhead,  //更改用户头像所在地址。
        usrname : usrname  //更新用户名字。  主要考虑到用户可能会经常改微信昵称。
      }
    });
    /*const deleteresult = await cloud.deleteFile({ //删除旧的照片。
      fileList: [oldfile],  //删除列表必须是一个列表而不是一个string，之前错了。
    });
    console.log('删除结果');
    console.log(deleteresult);*/
  }
  else  //如果这个用户没有注册在案，我们需要给这个用户进行注册。
  {
    DB.add({
      data:{
        usrhead : usrhead,  //头像文件路径。
        usrid : usrid,  //用户的微信id。
        usrname : usrname  //用户的姓名。
      }
    });
  }});
  return true;
}