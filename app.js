//app.js
App({
  onLaunch: async function () {
    wx.cloud.init({
      env: "zhousy26-6gz0ynbwb24e8f54"
    }),


    /*await wx.cloud.callFunction({ //调用我自己写的云函数并且得到openid。
      name: 'getopenid',
      data:{

      },
      complete:res=>{ //等待程序全部完成。也就是完全得到结果。
        this.userDetail = res;
        console.log(this.userDetail);
      }
    })*/
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']&&!res.authSetting['scope.userLocation']&&!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              // 用户已经授权个人信息，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
  }
})