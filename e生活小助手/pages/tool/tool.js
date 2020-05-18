// pages/tool/tool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: {},
    isReady:true,
    day:''
  },
  /**
   * 获取疫情数据
   */
  getNcov() {
    var that = this
    wx.request({
      url: 'https://api.tianapi.com/txapi/ncov/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee',
      success: function(result) {
        //console.log(result)
        var obj = result.data.newslist[0].desc
        var desc = {}
        desc.confirmedCount = obj.confirmedCount //累计确诊
        desc.confirmedIncr = "+" + obj.confirmedIncr //昨日累计确诊
        desc.curedCount = obj.curedCount //累计治愈
        desc.curedIncr = "+" + obj.curedIncr //昨日治愈
        desc.currentConfirmedCount = obj.currentConfirmedCount //现存确诊
        desc.currentConfirmedIncr = obj.currentConfirmedIncr > 0 ? "+" + obj.currentConfirmedIncr : obj.currentConfirmedIncr //昨日现存确诊
        desc.deadCount = obj.deadCount //累计死亡
        desc.deadIncr = "+" + obj.deadIncr //昨日死亡
        desc.suspectedCount = obj.suspectedCount //境外输入
        desc.suspectedIncr = obj.suspectedIncr > 0 ? "+" + obj.suspectedIncr : obj.suspectedIncr //昨日境外输入
        desc.seriousCount = obj.seriousCount //现存重症
        desc.seriousIncr = obj.seriousIncr > 0 ? "+" + obj.seriousIncr : obj.seriousIncr //昨日现存重症
        for (let k in desc){
          if (desc[k] === undefined || desc[k] === "+"+undefined){
            desc[k]=" 未公布"
          }
        }
        that.setData({
          desc: desc,
          isReady:false
        })
        //console.log(desc)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.getNcov()
    var date = new Date();
    var day = date.getDate();
    if(day<10)day="0"+day
    this.setData({
      day: day
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})