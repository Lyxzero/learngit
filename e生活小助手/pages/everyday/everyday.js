// pages/everyday/everyday.js
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://open.iciba.com/dsapi/',
      success: function (result) {
        console.log(result)
        var imgsrc = result.data.fenxiang_img
        var tts = result.data.tts
        innerAudioContext.src = tts
        that.setData({
          imgsrc: imgsrc
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '每日一句',
      path: '/pages/everyday/everyday',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  /**
   * 播放音频
   */
  playMp3() {
    innerAudioContext.play()
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

  }
})