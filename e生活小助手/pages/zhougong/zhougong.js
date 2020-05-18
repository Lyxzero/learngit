// pages/zhougong/zhougong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: ''
  },
  inputContent: function (e) {
    this.data.input = e.detail.value;
  },
  jm: function (e) {
    var that = this
    wx.request({
      url: 'https://api.tianapi.com/txapi/dream/',
      data: {
        key: 'd5d0356d4318b79079296c196a12674e',
        word: this.data.input,
        num: 10
      },
      success: function (res) {
        if (res.data.code == 200) {
          
          that.setData({
            title: "梦见 "+res.data.newslist[0].title,
            result: res.data.newslist[0].result.replace(/(<\/?br.*?>)/g, '\n')
          })
        } else {
          wx.showModal({
            title: '周公解梦',
            content: "抱歉，您所输入的解梦内容暂时无解，请重新输入！",
            showCancel: false,
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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