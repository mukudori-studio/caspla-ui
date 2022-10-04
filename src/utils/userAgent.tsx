
const ua = window.navigator.userAgent.toLowerCase()
let mobileType:any

if (ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
  mobileType = 'mobile'
} else if (ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
  mobileType = 'tablet'
} else if (ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document) {
  mobileType =' tablet'
} else {
  mobileType = 'pc'
}

export default mobileType
