const { weappRedis } = require('../../plugins/index')
const request = require('request');
const { weapp } = require('../../config/index')
console.log('weapp', weapp);

const sign = require('../../utils/weapp/sign');
async function getAccessToken() {
  const access_token = await weappRedis.get('access_token')
  console.log('access_token', access_token);

  if (!!access_token) {
    return access_token
  } else {
    return new Promise((resolve, reject) => {
      request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${weapp.appId}&secret=${weapp.secret}`,
        async (error, response, body) => {
          if (!error && response.statusCode == 200) {
            let accessTokenInfo = JSON.parse(body)
            console.log('accessTokenInfo', accessTokenInfo);
            weappRedis.set('access_token', accessTokenInfo.access_token, 'EX', accessTokenInfo.expires_in)
            resolve(accessTokenInfo.access_token)
          } else {
            reject(false)
          }
        })
    })
  }


}

async function getJsApiTicket(accessToken) {
  const jsapiTicket = await weappRedis.get('jsapi_ticket')
  console.log('jsapiTicket', jsapiTicket);

  if (!!jsapiTicket) {
    return jsapiTicket
  } else {
    return new Promise((resolve, reject) => {
      request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let jsApiTicketInfo = JSON.parse(body)
          console.log('jsApiTicketInfo', jsApiTicketInfo);
          weappRedis.set('jsapi_ticket', jsApiTicketInfo.ticket, 'EX', jsApiTicketInfo.expires_in)
          resolve(jsApiTicketInfo.ticket)
        } else {
          reject(false)
        }
      })
    })
  }


}
const WeappService = {
  jsSdkConfig: async (url) => {
    console.log('url', url);
    // 首先获取access_token
    const accessToken = await getAccessToken()
    const jsapiTicket = await getJsApiTicket(accessToken)
    const config = sign(jsapiTicket, url)
    return config
  }
}

module.exports = WeappService