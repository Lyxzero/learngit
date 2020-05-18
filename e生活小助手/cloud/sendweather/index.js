// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
  
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      // touser: 'ow4Xd4lu2C52Elt5TlHsaJspZbLs', // 通过 getWXContext 获取 OPENID
      // page: ' pages/index/index', //要跳转到那个小程序页面
      // data: { //推送的内容
      //   date1: {
      //     value: '2020-4-24'
      //   },
      //   phrase2: {
      //     value: '潮州'
      //   },
      //   phrase3: {
      //     value: '阴'
      //   },
      //   character_string4: {
      //     value: '19'
      //   },
      //   thing5: {
      //     value: '测试'
      //   }
      // },
      // templateId: 'KE7LnP7VmruRBH7jhIiRDa4DbEDn0nQhYYzph9S_h5Y' //模板id
      touser: event.opid, // 通过 getWXContext 获取 OPENID
      page: ' pages/index/index', //要跳转到那个小程序页面
      data: { //推送的内容
        date1: {
          value: event.time
        },
        phrase2: {
          value: event.city
        }, 
        phrase3: {
          value: event.cond
        },
        character_string4: {
          value: event.tmp
        },
        thing5: {
          value: event.tips
        }
      },
      templateId: 'KE7LnP7VmruRBH7jhIiRDa4DbEDn0nQhYYzph9S_h5Y' //模板id
    })
    console.log(result)
    
  } catch (err) {
    console.log("err",err)
    
  }

}