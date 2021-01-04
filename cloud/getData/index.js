// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {  //参数隐藏在data里面，这里官方文档有。
  let name = event.name;
  let test = cloud.database().collection(name).aggregate().sort({ //考虑到一些问题，我们返回的时候应该是按时间从新往旧排列。
    createtime: -1
  }).end();
  //从结果的list读入数据。
  //test = cloud.database().collection(name).get();
  return test;
}