// pages/index/index.js
const db = wx.cloud.database()
let g_location = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "定位中...",
    nowWeather: {},
    hourly: [{
      "imgsrc": 100
    }],
    isReady: true,
    daily_forecast: [{
        imgsrc_d: 100,
        imgsrc_n: 100
      },
      {
        imgsrc_d: 100,
        imgsrc_n: 100
      }
    ]
  },

  /**
   * 获取实况天气
   */
  getNowWeather(location2, city) {
    let that = this
    var nowWeather = {}
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?key=0cfed4c1855244bc85cbc7a0177a2b16&location=' + location2,
      success: function(result) {
        //console.log(result)
        nowWeather.tmp = result.data.HeWeather6[0].now.tmp + "°"
        nowWeather.cond_txt = result.data.HeWeather6[0].now.cond_txt
        nowWeather.wind_dir = result.data.HeWeather6[0].now.wind_dir
        nowWeather.wind_sc = result.data.HeWeather6[0].now.wind_sc
        nowWeather.hum = result.data.HeWeather6[0].now.hum + "%"
        nowWeather.pres = result.data.HeWeather6[0].now.pres + "hPa"

        //获取空气质量实况
        wx.request({
          url: 'https://free-api.heweather.net/s6/air/now?key=0cfed4c1855244bc85cbc7a0177a2b16&location=' + city,
          success: function(result) {
            //console.log(result)
            nowWeather.aqi = result.data.HeWeather6[0].air_now_station[0].aqi
            nowWeather.qlty = result.data.HeWeather6[0].air_now_station[0].qlty
            nowWeather.qlty_class = nowWeather.qlty === "优" ? "ari_q_a" : "ari_q_b"


            var tqtype = 9
            var tq = nowWeather.cond_txt;
            if (tq.indexOf("风") != -1) {
              tqtype = 1
            } else if (tq.indexOf("云") != -1) {
              tqtype = 2
            } else if (tq.indexOf("雨") != -1) {
              tqtype = 3
            } else if (tq.indexOf("雪") != -1) {
              tqtype = 4
            } else if (tq.indexOf("霜") != -1) {
              tqtype = 5
            } else if (tq.indexOf("露 ") != -1) {
              tqtype = 6
            } else if (tq.indexOf("雾") != -1) {
              tqtype = 7
            } else if (tq.indexOf("雷") != -1) {
              tqtype = 8
            } else if (tq.indexOf("晴") != -1) {
              tqtype = 9
            } else if (tq.indexOf("阴") != -1) {
              tqtype = 10
            }
            //获取诗句
            wx.request({
              url: 'https://api.tianapi.com/txapi/tianqishiju/index?key=6bfd56fc9752e3c2ea478b7cd7e71bee&tqtype=' + tqtype,
              success: function(result) {
                nowWeather.poetry_txt = result.data.newslist[0].content
                that.setData({
                  nowWeather: nowWeather,
                  isReady: false
                })
                wx.hideLoading()

              }
            })

          }
        })

      }
    })
  },
  /**
   * 自动获取实况天气
   */
  AutoGetWeather() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    var nowWeather = {}
    //获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var location = res.latitude + "," + res.longitude
        var location2 = res.longitude + "," + res.latitude
        g_location = res.longitude + "," + res.latitude
        //console.log(location2)
        //获取经纬度对应的城市
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?get_poi=0&key=W3RBZ-6ITE3-JWH3F-YRZHU-G6TJZ-QBBNZ&location=' + location,
          success: function(result) {

            var address = " " + result.data.result.address_component.city + " " + result.data.result.address_component.district

            that.setData({
              address: address
            })

            var city = result.data.result.address_component.city
            that.getNowWeather(location2, city)
            that.getHourly(city)
            that.getForecast(location2)
          }
        })
      },
      fail(err) {
        that.setData({
          address: "北京市 西城区"
        })

        that.getNowWeather("116.40,39.9", "北京")
        that.getHourly("北京")
        that.getForecast("116.40,39.9")
      }
    })

  },
  /**
   * 获取逐小时预报天气
   */
  getHourly(city) {
    var that = this
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/hourly?key=0cfed4c1855244bc85cbc7a0177a2b16&location=' + city,
      success: function(result) {

        var arr = result.data.HeWeather6[0].hourly
        var hourly = []
        for (var i = 0; i < arr.length; i++) {
          hourly[i] = {
            "imgsrc": arr[i].cond_code,
            "tmp": arr[i].tmp,
            "time": arr[i].time.substring(11),
            "wind_dir": arr[i].wind_dir,
            "wind_sc": arr[i].wind_sc
          }
        }
        that.setData({
          hourly: hourly
        })

      }
    })
  },



  /**
   * 选择获取天气
   */
  chooseWeather() {
    let that = this
    //打开地图选择位置
    wx.chooseLocation({
      success: function(res) {
        //得到经纬度
        var location = res.latitude + "," + res.longitude
        var location2 = res.longitude + "," + res.latitude

        //获取经纬度对应的城市
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?get_poi=0&key=W3RBZ-6ITE3-JWH3F-YRZHU-G6TJZ-QBBNZ&location=' + location,
          success: function(result) {
            var city = result.data.result.address_component.city
            that.setData({
              address: " " + result.data.result.address_component.city + " " + result.data.result.address_component.district
            })
            city = city.substring(0, city.length - 1)
            that.getNowWeather(location2, city)
            that.getHourly(city)
            that.getForecast(location2)
          }
        })


      },
      fail() {
        wx.getSetting({
          success(res) {
            console.log(res.authSetting)
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '获取地图位置失败',
                content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
                success: function(tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function(data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          that.chooseWeather()
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 1500
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  /**
   * 获取天气预报
   */
  getForecast(location2) {
    var that = this
    var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/forecast?key=0cfed4c1855244bc85cbc7a0177a2b16&location=' + location2,
      success: function(result) {
        //console.log(result)
        var arr = result.data.HeWeather6[0].daily_forecast
        var daily_forecast = []
        for (var i = 0; i < arr.length; i++) {
          daily_forecast[i] = {
            d_txt: i == 0 ? "今天" : weekArray[new Date(arr[i].date).getDay()],
            d_date: arr[i].date.substring(5),
            imgsrc_d: arr[i].cond_code_d,
            imgsrc_n: arr[i].cond_code_n,
            wind_dir: arr[i].wind_dir,
            wind_sc: arr[i].wind_sc,
            tmp_max: arr[i].tmp_max,
            tmp_min: arr[i].tmp_min,
            cond_txt_d: arr[i].cond_txt_d
          }
        }
        that.setData({
          daily_forecast: daily_forecast
        })
      }
    })
  },
  /**
   * 订阅消息
   */
  subscribe() {
    wx.cloud.callFunction({
      name: 'getopenid'
    }).then(res => {
      var opid = res.result.openid

      db.collection('user_opid')
        .where({
          _openid: opid
        }).get()
        .then(res => {
          if (res.data.length > 0) {
            db.collection('user_opid')
              .where({
                _openid: opid
              })
              .update({
                data: {
                  location: g_location
                }
              })
          } else {
            db.collection('user_opid')
              .add({
                data:{
                  location: g_location
                }
                
              })
          }
        })

    })

    wx.requestSubscribeMessage({
      tmplIds: ['KE7LnP7VmruRBH7jhIiRDa4DbEDn0nQhYYzph9S_h5Y'],
      success(res) {
        if(res.KE7LnP7VmruRBH7jhIiRDa4DbEDn0nQhYYzph9S_h5Y == "accept"){
          wx.showToast({
            title: '订阅成功',
          })
        }
      },
      fail(res) {
        console.log("error", res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.AutoGetWeather()

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