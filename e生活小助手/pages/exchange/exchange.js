// pages/exchange/exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1:0,
    index2: 0,
    array1: ["CNY", "USD", "KRW", "TWD", "JPY", "AUD", "GBP", "NZD", "SGD", "THB", "RUB", "HKD", "EUR","MOP"],
    array2: ["人民币", "美元", "韩国元", "新台币", "日元", "澳元", "英镑", "新西兰元", "新加坡元", "泰国铢", "卢布", "港币", "欧元","澳门元"],
    money:100
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  submit:function(){
    var fromcoin = this.data.array1[this.data.index1]
    var tocoin = this.data.array1[this.data.index2]
    var money = this.data.money
    var that = this
    wx.request({
      url: 'https://api.tianapi.com/txapi/fxrate/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee&fromcoin=' + fromcoin + '&tocoin=' + tocoin + '&money=' + money,
      success:function(result){
        console.log(result)
        that.setData({
          result: result.data.newslist[0].money
        })
      }
    })
  },
  getMoney:function(e){
    var val = e.detail.value;
    this.setData({
      money: val
    });
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