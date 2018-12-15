
export const config = {
  BASE_URL: 'https://www.richepipe.com:9000',
  // BASE_URL: 'http://test.richepipe.com:9200',
  IMG_BASE_URL: 'https://www.richepipe.com',
  // IMG_BASE_URL: 'http://test.richepipe.com',
  USER_SHEET: 'https://www.richepipe.com/dist/excel/员工报名表.xlsx',
  ERR_OK: 200
}

export function getCookie(name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}

export function returnFormData(obj) {
  let str = ''
  for (let key in obj) {
    str += `&${key}=${obj[key]}`
  }
  return str.substr(1)
}

export function inArr(url) {
  const urlArr = [
    '/login',
    '/student/id/1'
  ]
  for (let i in urlArr) {
    if (url == urlArr[i]) {
      return true
    }
  }
  return false
}

export function retrunDuration(date) {
  let arr = date.split('-')
  return arr.join('/')
}
