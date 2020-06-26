const deliverystatus = ["快递收件(揽件)", "在途中", "正在派件", "已签收", "派送失败", "疑难件", "退件签收"]
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
        url: 'https://wuliu.market.alicloudapi.com/kdi',
        method: 'GET',
        header: {
          "Authorization": "APPCODE 59f9d74ac38a4c9aa576723e4e8266d5"
        },
        data: {
          type: 'auto',
          no: exNum.trim()
        },
        complete: function () {
          wx.hideLoading()
        },
        success: function (res) {
          //console.log(res)
          if (res.data.status == "205") {
            wx.showToast({
              title: '没有物流信息',
              icon: "none",
              duration: 1500
            })
          } else if (res.data.status == "201") {
            wx.showToast({
              title: '快递单号错误',
              icon: "none",
              duration: 1500
            })
          } else if (res.data.status == "203") {
            wx.showToast({
              title: '快递公司不存在',
              icon: "none",
              duration: 1500
            })
          } else if (res.data.status == "204") {
            wx.showToast({
              title: '快递公司识别失败',
              icon: "none",
              duration: 1500
            })
          } else if (res.data.status == "207") {
            wx.showToast({
              title: 'IP限制',
              icon: "none",
              duration: 1500
            })
          } else if (res.data.status == "0") {
            wx.showToast({
              title: '查询成功',
              duration: 1000
            })
            wx.cloud.callFunction({
              name: "addExpress",
              data: {
                express: {
                  num: res.data.result.number,
                  name: res.data.result.expName,
                  logo: res.data.result.logo
                }
              }
            })
            var list = {
              expName: res.data.result.expName,
              number: res.data.result.number,
              list: res.data.result.list,
              logo: res.data.result.logo,
              status: deliverystatus[res.data.result.deliverystatus]
            }
            wx.navigateTo({
              url: '/pages/logistics/logistics?list=' + JSON.stringify(list)
            })
          }


          // if (result.data.msg == "数据返回为空") {
          //   wx.showModal({
          //     title: '查询失败',
          //     content: '查询快递信息失败',
          //     showCancel: false
          //   })
          // } else if (result.data.msg == "success") {
          //   console.log(result)
          //   var list = result.data.newslist[0]
          //   list.num = exNum.trim()
          //   wx.cloud.callFunction({
          //     name: "addExpress",
          //     data: {
          //       express: {
          //         num: exNum.trim(),
          //         name: result.data.newslist[0].kuaidiname
          //       }
          //     }
          //   })
          //   wx.navigateTo({
          //     url: '/pages/logistics/logistics?list=' + JSON.stringify(list)
          //   })

          // } else {
          //   wx.showModal({
          //     title: '查询失败',
          //     content: '未知错误',
          //     showCancel: false
          //   })
          // }
        }
      })
    }
  },

  //获取历史记录
  getHistory() {
    wx.cloud.callFunction({
      name: "getExpress",
    }).then(res => {
      //console.log(res)
      if (res.result.length > 0) {
        this.setData({
          historyArray: res.result[0].history
        })
      } else {
        this.setData({
          historyArray: []
        })
      }

    })
  },
  clickItem(e){
    var num = e.currentTarget.dataset.num
    this.setData({
      num: num
    })
    exNum = num
    this.submit()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory()
  },
  onShow:function(){
    this.getHistory()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})