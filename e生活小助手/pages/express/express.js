// pages/express/express.js
var exNum = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: null,
    isClear: true
  },
  /**
   * 扫码
   */
  sweep() {
    var that = this
    wx.scanCode({
      success(res) {
        var num = res.result
        console.log(res)
        
          that.setData({
            num: num
          })
          exNum = num
        
      }
    })
  },
  /**
   * 监听输入
   */
  listener(e) {
    var num = e.detail.value
    exNum = num
    this.setData({
      isClear: num != "" ? false : true
    })

  },
  /**
   * 输入框内容清除
   */
  input_clear() {
    this.setData({
      isClear: true,
      num: null

    })
  },
  /**
   * 提交单号
   */
  submit() {
    //console.log(exNum)
    if (exNum.length < 5) {
      wx.showModal({
        title: '提示',
        content: '请检查快递单号是否输入正确',
        showCancel: false
      })
    } else {
      wx.showLoading({
        title: '查询中',
      })
      wx.request({
        url: 'https://api.tianapi.com/txapi/kuaidi/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee&number=' + exNum,
        complete: function() {
          wx.hideLoading()
        },
        success: function(result) {

          if (result.data.msg == "数据返回为空") {
            wx.showModal({
              title: '查询失败',
              content: '查询快递信息失败',
              showCancel: false
            })
          } else if (result.data.msg == "success") {
            console.log(result)
            var list = result.data.newslist[0]
            list.num = exNum
            wx.navigateTo({
              url: '/pages/logistics/logistics?list=' + JSON.stringify(list)
            })
          } else {
            wx.showModal({
              title: '查询失败',
              content: '未知错误',
              showCancel: false
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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