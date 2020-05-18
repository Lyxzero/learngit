Page({
  data: {
    input1: '',
    input2: ''
  },
  input: function (e) {
    this.data.input1 = e.detail.value;
  },
  input2: function (e) {
    this.data.input2 = e.detail.value;
  },

  cal: function (e) {
    var that = this
    wx.request({
      url: 'https://api.tianapi.com/txapi/bmi/',
      data: {
        key: '6bfd56fc9752e3c2ea478b7cd7e71bee',
        height: this.data.input1,
        weight: this.data.input2
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            bmi: res.data.newslist[0].bmi,
            healthy: res.data.newslist[0].healthy,
            idealweight: res.data.newslist[0].idealweight,
            normweight: res.data.newslist[0].normweight
          })
        } else {
          wx.showModal({
            title: '标准体重计算',
            content: "请输入身高和体重",
            showCancel: false,
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})