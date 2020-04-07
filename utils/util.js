const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//蓝牙功能共享utils

// 字符串转byte
function stringToBytes(str) {
  var strArray = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    strArray[i] = str.charCodeAt(i);
  }
  const array = new Uint8Array(strArray.length)
  strArray.forEach((item, index) => array[index] = item)
  return array.buffer;
}


function strToHexCharCode(str) {
  if (str === "")
    return "";
  var hexCharCode = [];
  hexCharCode.push("0x");
  for (var i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16));
  }
  return hexCharCode.join("");
}

// ArrayBuffer转16进制字符串示例
function ab2hext(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

//16进制转字符串
function hexToString(str) {
  var trimedStr = str.trim();
  var rawStr =
    trimedStr.substr(0, 2).toLowerCase() === "0x" ?
      trimedStr.substr(2) :
      trimedStr;
  var len = rawStr.length;
  if (len % 2 !== 0) {
    // alert("Illegal Format ASCII Code!");
    return "";
  }
  var curCharCode;
  var resultStr = [];
  for (var i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join("");
}
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(
    new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function utf8changeunicode(binarylist) {
  var endindex = 0;//判断需要循环几次后存入数据
  var binarylistcope = [];//存储处理后的数据
  var endbinarycope = '';//存储处理后的数据
  // 循环取出数组中的二进制
  var i = 0;
  while (i < binarylist.length) {
    // 循环判断字符串否和标准
    var t = 0;//计数t
    var str = binarylist[i];
    while (t < str.length) {
      var index = str.substring(t, t + 1);
      // 如果符合规则 = 1 计数+1  否则跳出判断
      if (index == 0) {
        break;
      }
      else {
        t++;
      }
    }
    var end = t + 1; //判断需要截取的index
    if (endindex == 0) {
      endindex = t;
      endbinarycope = '';
    }
    var endstr = str.substring(end, str.length);
    if (endindex == 1) {
      endbinarycope += endstr;
      binarylistcope.push(endbinarycope);
      endindex--;
    }
    else if (endindex == 0) {
      endbinarycope += endstr;
      binarylistcope.push(endbinarycope);
    }
    else {
      endbinarycope += endstr;
      endindex--;
    }
    i++
  }
  var unicodelist = this.changehexadecimal(binarylistcope);
  console.log(unicodelist);
  var stringlist = [];
  for (var a = 0; a < unicodelist.length; a++) {
    while (unicodelist[a].length < 4) {
      unicodelist[a] = '0' + unicodelist[a];
    }
    stringlist.push('\\u' + unicodelist[a]);
  }
  console.log(stringlist);
  var namedev = '{"str":"';
  for (var i = 0; i < stringlist.length; i++) {

    namedev += stringlist[i];
  }
  namedev = namedev + '"}';
  return JSON.parse(namedev).str
}

function changehexadecimal(binarylist) {
  var charary = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  var numary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var endlist = [];
  for (var i = 0; i < binarylist.length; i++) {
    var str = binarylist[i];
    var numb = str.length;
    while (numb % 4 != 0) {
      str = '0' + str;
      numb = str.length;
    }
    var endstr = '';
    for (var t = 0; t < str.length / 4; t++) {
      var cons = str.substring(t * 4, t * 4 + 4);
      var cc = 0;
      for (var k = 0; k < cons.length; k++) {
        var cont = parseInt(cons.substring(k, k + 1));
        var num = cons.length - k - 1;
        var kf = 2;
        if (num == 0) {
          kf = 1;
        }
        else if (num == 1) {
          kf = 2;
        }
        else {
          while (num - 1 >= 1) {
            kf = 2 * kf;
            --num;
          }
        }
        cc = kf * cont + cc;
      }
      for (var k = 0; k < numary.length; k++) {
        if (cc == numary[k]) {
          cc = charary[k];
        }
      }
      endstr += cc;
    }
    endlist.push(endstr)
  }
  return endlist;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        out += str.charAt(i - 1);
        break;
      case 12: case 13:
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
}

//todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')

}





/*微信app版本比较*/
function versionCompare(ver1, ver2) {
  var version1pre = parseFloat(ver1)
  var version2pre = parseFloat(ver2)
  var version1next = parseInt(ver1.replace(version1pre + ".", ""))
  var version2next = parseInt(ver2.replace(version2pre + ".", ""))
  if (version1pre > version2pre)
    return true
  else if (version1pre < version2pre)
    return false
  else {
    if (version1next > version2next)
      return true
    else
      return false
  }
}



//时间戳转换成日期时间
function js_date_time(unixtime) {
  var date = new Date(unixtime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return y + '年' + m + '月' + d + '日' + h + '时' + minute + '分';
}
//时间戳转换成日期时间
function js_date_timeshifen(unixtime) {
  var date = new Date(unixtime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return h + ':' + minute;
}

function getDate(){
  var timestamp = Date.parse(new Date());
  var date = new Date(timestamp);
  //获取年份  
  var Y = date.getFullYear();
  //获取月份  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //获取当日日期 
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
  //return Y + '年' + M + '月' + D + '日';
  return Y + '-' + M + '-' + D;
}
//时间戳转换成日期时间
function getTime() {
  var timestamp = Date.parse(new Date());
  //var date = new Date(timestamp);
  var date = new Date(timestamp);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return h + ':' + minute;
}

module.exports = {
  formatTime: formatTime,

  //蓝牙模块
  stringToBytes: stringToBytes,
  ab2hext: ab2hext,
  hexToString: hexToString,
  versionCompare: versionCompare,
  ab2hex: ab2hex,
  utf8changeunicode: utf8changeunicode,
  changehexadecimal: changehexadecimal,
  utf8to16: utf8to16,
  ab2str: ab2str,
  strToHexCharCode: strToHexCharCode,
  js_date_time: js_date_time,
  js_date_timeshifen: js_date_timeshifen,
  formatDate: formatDate,
  getDates: getDates,
  dateLater: dateLater,
  getDate: getDate,
}
