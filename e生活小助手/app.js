//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'weather-h0css'
    })
    
  },
  globalData: {
    userInfo: null
  }
})