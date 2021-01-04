// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataLists: []
  },
  getData(){
    let that = this;
    wx.cloud.callFunction({
      name: 'getData',
      data:{
        name:'mytest', //这里我要使用test用于集合。
      },
      success(res){
        that.setData({
          dataLists: res.result.list  //这个要用list,另外一个用data也就是get需要用data。
        });
        //console.log(res.result.list[0]["_id"]);
      }
    })

    /////////////////////下面这一段真的是我乱测试的。
    wx.cloud.callFunction({
      name: 'login',
      data:{
        usrname:'周思宇3++++号',
        usrid:3,
        usrhead:"喵喵喵"
      },
      success(res){
        console.log("nice\n");
        console.log(res)
      },
      fail(err){
        console.log("调用失败");
      }
    })

    wx.cloud.callFunction({
      name: 'downloadlogin',
      data:{
        usrid:3
      },
      success(res){
        console.log("nice\n");
        console.log(res)
      },
      fail(err){
        console.log("调用失败");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})