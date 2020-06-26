// pages/addcity/addcity.js
let provinces = require('./provinces.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot_city: [{
      citysName: "广州市"
    }, {
      citysName: "北京市"
    }, {
      citysName: "深圳市"
    }, {
      citysName: "上海市"
    }, {
      citysName: "南京市"
    }, {
      citysName: "杭州市"
    }, {
      citysName: "武汉市"
    }, ],
    result: []
  },

  /**
   * 键盘输入时触发
   */
  bindKeyInput(e) {
    var city = e.detail.value
    if (city == '') {
      this.setData({
        result: []
      })
      return
    }
    var result = []
    var cityArray = this.data.collectionCityArray
    //从数组中查找城市
    provinces.provinces.forEach(item => {
      item.citys.forEach(res => {
        var isCol = false
        cityArray.forEach(val =>{
          if( res.citysName == val){
            isCol = true
          }
        })
          if (res.citysName.indexOf(city) == 0) {
            result.push({
              citysName: res.citysName,
              title: res.citysName + "," + item.provinceName,
              isCol: isCol
            })
          }

      })
    })


    this.setData({
      result: result
    })
    console.log(this.data.cityArray)
    
  },
  /**
   * 选择城市并返回
   */
  selectCity(e) {
    var city = e.currentTarget.dataset.city
    var cityArray = this.data.collectionCityArray
    for(let i = 0 ;i <cityArray.length;i++){
      if (cityArray[i]==city){
        wx.showToast({
          icon:'none',
          title: '已收藏该城市!',
        })
        return
      }
    }

    wx.reLaunch({
      url: '/pages/collection/collection?city=' + city,
    })
  },
  /**
   * 获取收藏城市数组
   */
  getCollectionCityArray(){
    wx.cloud.callFunction({
      name:"getCollectionCityArray",
    }).then(res =>{
      //console.log(res)
      if(res.result.length>0){
        this.setData({
          collectionCityArray:res.result[0].city
        })
      }else{
        this.setData({
          collectionCityArray:[]
        })
      }
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollectionCityArray()

    
  }
})