// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "zhousy26-6gz0ynbwb24e8f54"
})

// 云函数入口函数
exports.main = async (event, context) => {  //参数隐藏在data里面，这里官方文档有。
  let name = event.name;
  let mode = event.mode;
  let test = null;
  console.log(mode);
  console.log(name);
  if(mode == 1)
  {
    test = cloud.database().collection(name).aggregate().sort({ //考虑到一些问题，我们返回的时候应该是按时间从新往旧排列。
      createtime: -1,
      //like: -1
    }).lookup({
      from: 'usr',
      localField: 'usrid',
      foreignField: 'usrid',
      as: 'usrinfor',
    }).end();
  }
  else if(mode == 2)
  {
    test = await cloud.database().collection(name).aggregate().sort({ //考虑到一些问题，我们返回的时候应该是按时间从新往旧排列。
      likes: -1,
      createtime: -1
    }).lookup({
      from: 'usr',
      localField: 'usrid',
      foreignField: 'usrid',
      as: 'usrinfor',
    }).end();
  }
  else
  {
    test = cloud.database().collection(name).aggregate().sort({ //考虑到一些问题，我们返回的时候应该是按时间从新往旧排列。
      createtime: -1
    }).lookup({
      from: 'usr',
      localField: 'usrid',
      foreignField: 'usrid',
      as: 'usrinfor',
    }).end();
  }
  //从结果的list读入数据。
  //test = cloud.database().collection(name).get();
  return test;
}