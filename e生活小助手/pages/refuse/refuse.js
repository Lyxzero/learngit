// pages/refuse/refuse.js
var garbageName, newslist, getnewslist
var baseurl = 'https://api.tianapi.com/txapi/lajifenlei/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee&num=20&word='
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //获取输入
  bindKeyInput: function(e) {
    garbageName = e.detail.value
  },
  //搜索分类
  search: function(e) {
    var that = this
    if (garbageName == undefined || garbageName == "") {
      this.setData({
        newslist: {},
        showView: true
      })
      return
    }
    wx.request({
      url: baseurl + garbageName,
      success: (res) => {
        var newslist = []
        var type = "";
        var style = "";
        getnewslist = res.data.newslist
        //console.log(getnewslist)
        if (getnewslist == undefined){
          wx.showModal({
            title: '抱歉',
            content: "抱歉，暂时没有该垃圾的分类！",
            showCancel: false,
          })
          return
        }
        for (var i = 0; i < getnewslist.length; i++) {
          if (getnewslist[i].type === 0) {
            type = "可回收垃圾"
            style = "background:#0D73BB"
          } else if (getnewslist[i].type === 1) {
            type = "有害垃圾"
            style = "background:#DF002C"
          } else if (getnewslist[i].type === 2) {
            type = "厨余垃圾"
            style = "background:#019950"
          } else if (getnewslist[i].type === 3) {
            type = "其他垃圾"
            style = "background:#5A5C5B"
          }
          newslist[i] = {
            name: getnewslist[i].name,
            type: type,
            style: style
          }

        }
        this.setData({
          newslist: newslist,
          showView: false
        })
      },
      fail: () => {},
      complete: () => {}
    });
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