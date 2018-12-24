function isArrayFn(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

function getDataByCodeandID(ary ,id){
  if (isArrayFn(ary)) {
    let item=ary.filter(item=>{
        return item.fieldcode===id
    })
    if(item.length>0){
      return item[0].fieldname
    }
  }
 return ''
}

// 标准时间转 yyyy-MM-dd
function format(time, format) {
  if (!time) {
    return ''
  }
  time = time.toString().replace(/^\s*/g, '').replace(/\s*$/g, '')
  if (time === '') {
    return ''
  }
  var t = new Date(time)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}
// 时间戳转 yyyy-MM-dd
function fmtDate(obj) {
  if (!obj) {
    return ''
  }
  var date = new Date(obj)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  var d = '0' + date.getDate()
  return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
}
function fmtMonth(obj) {
  var date = new Date(obj)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  return y + '-' + m.substring(m.length - 2, m.length)
}

function hasKey(obj){
  let keys= Object.keys(obj)
  if(keys.length>0){
    return true
  }
  return false
}
const manKit={
  getDataByCodeandID :getDataByCodeandID,
  format: format,
  fmtDate: fmtDate,
  fmtMonth: fmtMonth,
  hasKey:hasKey
}
export default  manKit