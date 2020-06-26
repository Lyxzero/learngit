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
  var city = event.city

  await db.collection('user_collection').where({
    openid: openid
  }).update({
    data:{
      city:city
    },
    success:res=>{
      console.log(res)
    }
  })
}