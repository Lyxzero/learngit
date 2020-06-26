// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID
  var express = event.express
  var result = []
  await db.collection('user_express').where({
    openid: openid
  }).get().then(res => {
    result = res.data
  })
  console.log(result)
  if(result.length>0){
    var historyArray = result[0].history
    for(var i = 0 ; i<historyArray.length;i++){
      if(historyArray[i].num==express.num){
        historyArray.splice(i, 1);
        break;
      }
    }
    historyArray.unshift(express);


    await db.collection('user_express').where({
      openid: openid
    }).update({
      data:{
        history:historyArray
      },
      success:res=>{
        console.log(res)
      }
    })
  }else{
    await db.collection('user_express').add({
      data: {
        openid: openid,
        history: [express]
      }
    }).then(res => {
      console.log(res)
    })
  }
  //控制最多10条记录
  if(result.length>10){
    await db.collection('user_express').where({
      openid: openid
    }).update({
      data:{
        history:_.pop()
      },
      success:res=>{
        console.log(res)
      }
    })
  }

}