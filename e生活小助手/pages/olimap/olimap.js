// pages/olimap/olimap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var markers = JSON.parse(options.markers)
    var oildata = JSON.parse(options.oildata)
    markers[0].iconPath = "https://moyv.top/wechat/images/icon_oli_active.png"
    wx.getLocation({
      success: res => {
        this.setData({
          markers: markers,
          latitude: res.latitude,
          longitude: res.longitude,
          oildata: oildata
        })
      },
    })

  },
  markertap: function(e) {
    //console.log(e.detail.markerId)
    var id = e.detail.markerId
    var markers = this.data.markers
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].id == id) {
        markers[i].iconPath = "https://moyv.top/wechat/images/icon_oli_active.png"
      } else {
        markers[i].iconPath = "https://moyv.top/wechat/images/icon_oli1.png"
      }
    }

    this.setData({
      markers: markers,
      index:id
    })
  },
  nav:function(e){
    let plugin = requirePlugin('routePlan');
    let key = 'W3RBZ-6ITE3-JWH3F-YRZHU-G6TJZ-QBBNZ';  //使用在腾讯位置服务申请的key
    let referer = 'e生活小助手';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': this.data.oildata[this.data.index].title,
      'latitude': this.data.markers[this.data.index].latitude,
      'longitude': this.data.markers[this.data.index].longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
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