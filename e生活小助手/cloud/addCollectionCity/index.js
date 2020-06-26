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
  var result = []
  await db.collection('user_collection').where({
    openid: openid
  }).get().then(res => {
    result = res.data
  })
  console.log(result)
  if (result.length > 0) {
    await db.collection('user_collection').where({
      openid: openid
    }).update({
      data:{
        city:_.push(city)
      },
      success:res=>{
        console.log(res)
      }
    })
  } else {
    await db.collection('user_collection').add({
      data: {
        openid: openid,
        city: [city]
      }
    }).then(res => {
      console.log(res)
    })
  }


}