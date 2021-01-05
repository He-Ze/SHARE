//index.js
//获取应用实例
const app = getApp()

var util = require('../utils/util.js');

Page({
  data: {
    text: '',
    imageLists: [],
    userInfo:null,
  },
  userDetail:1,
  /*data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },*/
  onLoad: function() {
    // 查看是否授权
    let that = this;
    wx.cloud.callFunction({ //调用我自己写的云函数并且得到openid。
      name: 'getopenid',
      data:{

      },
      success:res1=>{ //等待程序全部完成。也就是完全得到结果。
        this.userDetail = res1;
        wx.getSetting({
          success (res){
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function(res) {
                  console.log(res.userInfo);
                  that.data.userInfo = res.userInfo;  //得到用户信息。
                  wx.cloud.callFunction({ //调用我自己写的云函数并且得到openid。
                    name: 'login',
                    data:{
                      usrhead:res.userInfo.avatarUrl,
                      usrname:res.userInfo.nickName,
                      usrid:that.userDetail.result.OPENID,
                    },
                    complete:res=>{ //等待程序全部完成。也就是完全得到结果。
                      console.log('用户登入成功');
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  /*bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },*/

  fabu_text(e){
    this.setData({
      text: e.detail.value
    })
  },
  addImage(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePath = res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png', // 上传至云端的路径
          filePath: tempFilePath, // 小程序临时文件路径
          success: res => {
            var lists = that.data.imageLists;
            lists.push(res.fileID)
            that.setData({
              imageLists: lists
            })
          },
          fail: console.error
        })
      }
    })
  },
  closeImage(e){
    let fileid = e.currentTarget.dataset.fileid;
    let that = this;
    wx.cloud.deleteFile({
      fileList: [fileid],
      success: res => {
        let imagelists = that.data.imageLists;
        let index = imagelists.indexOf(fileid);
        imagelists.splice(index,1);
        that.setData({
          imageLists: imagelists
        })
      },
      fail: console.error
    })
  },
  saveData(){
    let that = this;
    let temptime = util.formatTime(new Date());  //获取时间.
    console.log(this.data.userInfo);
    wx.cloud.callFunction({
      name: "saveData",
      data: {
        name: 'mytest', //这里我要使用test集合用于测试。
        text: that.data.text,
        fileIDs: that.data.imageLists,
        time: temptime,
        usrid:that.userDetail.result.OPENID,
      },
      success(res){
        console.log("调用成功");
        wx.showToast({
          title: '发表成功',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          text: '',
          imageLists: []
        })
      },
      fail(err){
        console.log("调用失败");
      }
    })
  }
})
