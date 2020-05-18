// pages/oilprice/oilprice.js
var city = ""
var location = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prov: '',
    province: ["陕西", "甘肃", "青海", "宁夏", "新疆", "北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "内蒙古", "广西", "西藏"],
    province2: ["陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "海南省", "四川省", "贵州省", "云南省", "内蒙古自治区", "广西壮族自治区", "西藏自治区"],

    index: 5,


  },
  bindPickerChange: function(e) {
    var that = this
    this.setData({
      index: e.detail.value
    })
    var prov = this.data.province[this.data.index]
    wx.request({
      url: 'https://api.tianapi.com/txapi/oilprice/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee&prov=' + prov,
      success: function(result) {
        //console.log(result)
        that.setData({
          arr: result.data.newslist[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
         location = res.latitude + "," + res.longitude

        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?get_poi=0&key=W3RBZ-6ITE3-JWH3F-YRZHU-G6TJZ-QBBNZ&location=' + location,
          success: function(res) {
            
            var prov = res.data.result.address_component.province
            var index = that.data.province2.indexOf(prov)
            if (index != -1) {
              wx.request({
                url: 'https://api.tianapi.com/txapi/oilprice/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee&prov=' + that.data.province[index],
                success: function(result) {
                  //console.log(result)
                  that.setData({
                    index: index,
                    arr: result.data.newslist[0],
                    up_time: result.data.newslist[0].time.substring(0, 19)
                  })
                }
              })
            } else {
              wx.request({
                url: 'https://api.tianapi.com/txapi/oilprice/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee&prov=北京',
                success: function(result) {
                  //console.log(result)
                  that.setData({
                    arr: result.data.newslist[0],
                    up_time: result.data.newslist[0].time.substring(0, 19)
                  })
                }
              })
            }

          }
        })


      },
    })

  },
  oiling: function() {
    wx.request({
      url: 'https://apis.map.qq.com/ws/place/v1/suggestion',
      data:{
        key: "W3RBZ-6ITE3-JWH3F-YRZHU-G6TJZ-QBBNZ",
        keyword:"加油站",
        region: city,
        location: location
      },
      success:function(res){
        console.log(res)
        var arr = res.data.data
        var markers = []
        var oildata = []
        for(var i = 0 ; i < arr.length ; i++){
          markers.push({
            iconPath:"https://moyv.top/wechat/images/icon_oli1.png",
            id:i,
            latitude: arr[i].location.lat,
            longitude: arr[i].location.lng,
            width: 32,
            height: 32
          })
          oildata.push({
            title: arr[i].title,
            address: arr[i].address
          })
        }
        wx.navigateTo({
          url: "/pages/olimap/olimap?markers=" + JSON.stringify(markers) + "&oildata=" + JSON.stringify(oildata),
        })
      }
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