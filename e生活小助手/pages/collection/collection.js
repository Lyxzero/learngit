// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 获取收藏城市数组
   */
  getCollectionCityArray() {
    wx.cloud.callFunction({
      name: "getCollectionCityArray",
    }).then(res => {
      //console.log(res)
      if (res.result.length > 0) {
        this.setData({
          collectionCityArray: res.result[0].city
        })
        this.forGetWeather(res.result[0].city)
      } else {
        this.setData({
          collectionCityArray: []
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    this.getCollectionCityArray()

    //获取转入的城市参数，添加城市
    var city = options.city
    if (city != undefined) {
      await wx.cloud.callFunction({
        name:"addCollectionCity",
        data:{
          city:city
        }
      }).then(res =>{
        //console.log(res)
        wx.showToast({
          title: '收藏成功!',
        })
        this.getCollectionCityArray()//刷新收藏城市数组
      })
      wx.showToast({
        title: '添加成功',
      })
    }


  },
  /**
   * 循环请求数据
   */
  forGetWeather(cityArray) {
    let that = this
    //循环请求数据
    let cityWeather = []
    for (let i = 0; i < cityArray.length; i++) {
      wx.request({
        url: 'https://free-api.heweather.net/s6/weather/now?key=0cfed4c1855244bc85cbc7a0177a2b16&location=' + cityArray[i],
        success: function (res) {
          var bg_class = "bg-cloud"
          if (res.data.HeWeather6[0].now.cond_txt.indexOf("雨") > -1) {
            bg_class = "bg-rain"
          } else if (res.data.HeWeather6[0].now.cond_txt.indexOf("晴") > -1) {
            bg_class = "bg-sunny"
          }
          cityWeather[i] = {
            city: res.data.HeWeather6[0].basic.parent_city,
            tmp: res.data.HeWeather6[0].now.tmp,
            cond: res.data.HeWeather6[0].now.cond_code,
            bg_class: bg_class,
            index: i
          }
          //因为请求是异步的，所以每次请求都绑定数据
          that.setData({
            cityWeather: cityWeather
          })
        }
      })
    }
  },
  /**
   * 打开菜单
   */
  openMenu(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    wx.showActionSheet({
      itemList: ['取消收藏'],
      success(res) {
        if (res.tapIndex == 0) {
          //取消收藏
          var newCityArray = that.data.collectionCityArray
          newCityArray.splice(index,1)
          wx.cloud.callFunction({
            name:"deleteCollectionCity",
            data:{
              city:newCityArray
            }
          }).then(res =>{
            //console.log(res)
            wx.showToast({
              title: '取消成功!',
            })
            that.getCollectionCityArray()//刷新收藏城市数组
          })
        }
      },
      fail(res) {

      }
    })
  },
  /**
   * 点击卡片
   */
  navToIndex(e) {
    wx.reLaunch({
      url: '/pages/index/index?city=' + e.currentTarget.dataset.city,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorage({
      key: 'city',
      data: this.data.cityArray,
    })
  },


})