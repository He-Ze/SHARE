//app.js
App({
  userDetail:null,
  onLaunch: function () {
    wx.cloud.init({
      env: "zhousy26-6gz0ynbwb24e8f54"
    }),


    wx.cloud.callFunction({ //调用我自己写的云函数并且得到openid。
      name: 'getopenid',
      data:{

      },
      success(res){
        this.userDetail = res,
        console.log(this.userDetail)
      }
    })
  }
})