// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {

  var userdata = []
  await db.collection('user_opid').get().then(res => {
    userdata = res.data
  })

  let Cosresult = []
  for (var i = 0; i < userdata.length; i++) {
    var data = {}
    await rp("https://free-api.heweather.net/s6/weather/forecast?key=0cfed4c1855244bc85cbc7a0177a2b16&location=" + userdata[i].location)
      .then(res => {
        data = JSON.parse(res)
      })

    var city = data.HeWeather6[0].basic.parent_city
    var tmp = data.HeWeather6[0].daily_forecast[0].tmp_min + "°~" + data.HeWeather6[0].daily_forecast[0].tmp_max + "°"
    var cond = data.HeWeather6[0].daily_forecast[0].cond_txt_d
    var time = data.HeWeather6[0].update.loc.substring(0, 10)
    var tips = ""
    if (cond.indexOf("雨") != -1) {
      tips = "今天有雨，出门记得带伞。"
    } else if (cond.indexOf("晴") != -1) {
      if (data.HeWeather6[0].daily_forecast[0].tmp_max > 30) {
        tips = "温度较高,请注意防晒。"
      } else {
        tips = "天气较好,祝您有个好心情。"
      }

    } else if (cond.indexOf("阴") != -1) {
      tips = "阴天快乐。"
    } else {
      tips = "祝您生活愉快。"
    }

    // await cloud.callFunction({
    //   name: 'sendweather',
    //   data: {
    //     city: city,
    //     tmp: tmp,
    //     cond: cond,
    //     time: time,
    //     opid: userdata[i]._openid,
    //     tips: tips
    //   }
    // })
    
      var result = await cloud.openapi.subscribeMessage.send({
        touser: userdata[i]._openid, // 通过 getWXContext 获取 OPENID
        page: ' pages/index/index', //要跳转到那个小程序页面
        data: { //推送的内容
          date1: {
            value: time
          },
          phrase2: {
            value: city
          },
          phrase3: {
            value: cond
          },
          character_string4: {
            value: tmp
          },
          thing5: {
            value: tips
          }
        },
        templateId: 'KE7LnP7VmruRBH7jhIiRDa4DbEDn0nQhYYzph9S_h5Y' //模板id
      })
      
    Cosresult.push(result)
    

  }
  console.log(Cosresult)
}