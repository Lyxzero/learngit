// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideModal:true, //模态框的状态  true-隐藏  false-显示
    animationData:{},//
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.getUserInfo({
     success: (res) => {
      //console.log(res)
      this.setData({
        userInfo:res.userInfo
      })
     },
     fail:err=>{
      //console.log(err)
     }
   })
  },
  login:function(){
    
   
  },
  getuserinfo(e){
    //console.log(e.detail)
    if(e.detail.errMsg=="getUserInfo:fail auth deny"){
      wx.showToast({
        icon:"none",
        title: '拒绝授权',
      })
    }else if(e.detail.errMsg=="getUserInfo:ok"){
      wx.showToast({
        icon:"success",
        title: '授权成功',
      })
      this.setData({
        userInfo:e.detail.userInfo
      })
      this.hideModal()
    }else{
      wx.showToast({
        icon:"none",
        title: '授权失败',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 显示遮罩层
  showModal: function () {
    var that=this;
    that.setData({
      hideModal:false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation 
    setTimeout(function(){
      that.fadeIn();//调用显示动画
    },200)   
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that=this; 
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true
      })      
    },300)//先执行下滑动画，再隐藏模块
    
  },

  //动画集
  fadeIn:function(){
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })    
  },
  fadeDown:function(){
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),  
    })
  }, 
})