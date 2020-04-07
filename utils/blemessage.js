var utils = require("../utils/util.js");
var showdate = require("../utils/json.js");
var app = getApp();
data: {
  textLog: "";
  deviceId: "";
  name: "";
  allRes: "";
  serviceId: "";
  readCharacteristicId: "";
  checked: true;
  var notifyCharacteristicId = "";
  connected: true;
  canWrite: false;

}
var writeCharacteristicId = "";
var serviceId = "";
var deviceId = "";
//获取蓝牙设备某个服务中的所有 characteristic（特征值）
function getBLEDeviceCharacteristics(order) {
  //var that = this;
  wx.getBLEDeviceCharacteristics({
    deviceId: order.deviceId,
    serviceId: order.serviceId,
    success: function(res) {
      for (let i = 0; i < res.characteristics.length; i++) {
        let item = res.characteristics[i]
        if (item.properties.read) { //该特征值是否支持 read 操作
          var log = "该特征值支持 read 操作:" + item.uuid + "\n";
          console.log(log);
          readCharacteristicId: item.uuid

        }
        if (item.properties.write) { //该特征值是否支持 write 操作
          var log = "该特征值支持 write 操作:" + item.uuid + "\n";
          console.log(log);
          var writeCharacteristicId = item.uuid;
          canWrite: true;

          wx.setStorage({
            key: 'write',
            data: {
              deviceId: order.deviceId,
              serviceId: order.serviceId,
              writeCharacteristicId: writeCharacteristicId
            },
          })
          console.log("存储writeCharacteristicId" + writeCharacteristicId)
        }
        if (item.properties.notify || item.properties.indicate) { //该特征值是否支持 notify或indicate 操作
          var log = "该特征值支持 notify 操作:" + item.uuid + "\n";
          console.log(log);
          var notifyCharacteristicId = item.uuid;
          //that.notifyBLECharacteristicValueChange(order);
          //data.notifyCharacteristicId=item.uuid;
          console.log(JSON.stringify(order));
          notifyBLECharacteristicValueChange(order, notifyCharacteristicId)
        }
      }
    }
  })
  console.log("公共类的数据切换");
  // that.onBLECharacteristicValueChange();   //监听特征值变化
}
//启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。
//注意：必须设备的特征值支持notify或者indicate才可以成功调用，具体参照 characteristic 的 properties 属性
function notifyBLECharacteristicValueChange(order1, notify1) {
  var that = this;
  console.log("notify 功能特征" + JSON.stringify(order1)),
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      deviceId: order1.deviceId,
      serviceId: order1.serviceId,
      characteristicId: notify1,

      success: function(res) {
        var log = "notify启动成功" + res.errMsg + "\n";
        console.log(log);
        /* that.setData({
          textLog: log,
        }); */
        //that.onBLECharacteristicValueChange(); //监听特征值变化
        onBLECharacteristicValueChange();
      },
      fail: function(res) {
        console.log("启动失败" + JSON.stringify(res));
        wx.showToast({
          title: 'notify启动失败',
          mask: true
        });
        setTimeout(function() {
          wx.hideToast();
        }, 2000)
      }

    })
}
//监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
function onBLECharacteristicValueChange() {
  var that = this;
  wx.onBLECharacteristicValueChange(function(res) {
    var resValue = utils.ab2hext(res.value); //16进制字符串
    var resValueStr = utils.hexToString(resValue);

    app.getbledata = resValue;

    var log0 = "成功获取：直接返回数据" + res.value + "\n" +
      "ArrayBuffer转16进制字符串示例" + resValue + " \n" +
      "16进制转字符串" + resValueStr + "\n";
    console.log(log0);

  });
}
//发送指令
function sentOrder() {
  var that = this;
  //var orderStr = that.data.orderInputStr;//指令
  //var orderStr = "1SG你在干什么妮子弹头我15846959693981584695969398102";
  var zhuangtai = "1";
  var zhiling = "SG";
  var biaoti = "你在干什么妮子弹头我";
  var kaishi = "1584695969398";
  var jieshu = "1584695969398";
  var txzqi = "1584695969398";
  //var order = utils.stringToBytes(orderStr);

  /* var count = "";
  for (var i = 0; i <= nate.countries.length; i++) {
    if (i === nate.countryIndex) {
      console.log(nate.countries[i])
      count = nate.countries[i]
    }
  } */
  var natedata="";
  var nate = app.globalData;
  console.log("验证码  的数据"+nate.code)
  switch (nate.code) {
    case 1:
      //喝水提醒
      natedata = "HS" + nate.checked + "/" + nate.time + "/" + nate.time1 + "/" + nate.countryIndex + "/" + nate.remindIndex;
      console.log("喝水提醒"+natedata)
      break;
    case 2:
      //吃药提醒
      natedata = "CY" + nate.checked + "/" + nate.time + "/" + nate.time1 + "/" + nate.countryIndex + "/" + nate.remindIndex;
      console.log("吃药提醒" + natedata)
      break;
    case 3:
      //添加事件提醒
      var datal=isNull(nate.information)
      console.log("1111111111"+datal)
      if (datal){
        app.showModal1("事件名称不能为空")
      }else{
        natedata = "SJ" + nate.checked + "/" + nate.information + "/" + nate.time + "/" + nate.time1 + "/" + nate.periodIndex +
          "/" + nate.countryIndex + "/" + nate.remindIndex
        console.log("添加事件提醒" + natedata)
      }
      break;
    case 4:
      //生日提醒
      natedata = "SR" + nate.checked + "/" + nate.date + "/" + nate.countryIndex + "/" + nate.remindIndex + "/" + nate.checkeds;
      console.log("生日提醒" + natedata)
      break;
    case 5:
      //高考提醒
      natedata = "GK" + nate.checked + "/" + nate.date + "/" + nate.countryIndex + "/" + nate.remindIndex + "/" + nate.checkeds;
      console.log("高考提醒" + natedata)
      break;
    case 6:
      //添加倒计时提醒
      console.log("添加倒计时提醒" + natedata)
      break;
    default:
    console.log("未定义数据")
      break;

  }

  console.log(natedata)


  var order = utils.stringToBytes(natedata);
  //that.getTimeout();
  writeBLECharacteristicValue(order);

  var account = 'abc';
  var password = '123';
  var loginin = "sfsafafsf";
  wx.request({
    /* //http://192.168.33.1:8080/login/toLogin
    //参数 logininfo

    url: 'http://192.168.11.23:8080/login/toLoginpost',//?logininfo=' + loginin,
    //url: 'http://192.168.11.20:8080/GJPServlet_war_exploded/DemoServlet?account=' + account + '&password=' + password,
    //http://localhost:8080/GJPServlet_war_exploded/DemoServlet?account=abc&password=123
    //'http://39.98.77.66:25689/ble/bleUnLock?hexRandom=' + msgData
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    data: {
      logininfo: "1111111111111111",//JSON.stringify("1111111111111111")
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, */
    success: function(res) {
      // success
      console.log("网络请求")
      console.log("数据打印" + res.data.msg + "\n" + JSON.stringify(res.data))

      console.log("网络请求")
    },
    fail: function(res) {
      console.log("fail:" + res)
      // fail
    }
  })
}
//向低功耗蓝牙设备特征值中写入二进制数据。
//注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
function writeBLECharacteristicValue(order) {
  var that = this;
  let byteLength = order.byteLength;
  var writeCharacteristicId = "";
  //console.log("1111传入数据值" + nate.checked + nate.checkeds + nate.date + nate.countryIndex + nate.remindIndex)
  wx.getStorage({
    key: 'write',
    success: function(res) {
      deviceId = res.data.deviceId;
      serviceId = res.data.serviceId;
      writeCharacteristicId = res.data.writeCharacteristicId;
      console.log("数据存储取值" + "\n" + JSON.stringify(res));
    },
  })
  var log = "当前执行指令的字节长度:" + byteLength;


  console.log(log);
  wx.writeBLECharacteristicValue({
    deviceId: deviceId,
    serviceId: serviceId,
    characteristicId: writeCharacteristicId,

    // 这里的value是ArrayBuffer类型
    value: order.slice(0, 20), //order.slice(0, 20)
    success: function(res) {
      if (byteLength > 20) {
        setTimeout(function() {
          writeBLECharacteristicValue(order.slice(20, byteLength)); //order.slice(20, byteLength)
        }, 150);
      }
      var log = "写入成功：" + res.errMsg + "\n";
      console.log(log);

    },

    fail: function(res) {
      var log = "写入失败" + res.errMsg + "\n";
      console.log(log);

    }

  })
}
function isNull(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

module.exports = {
  getBLEDeviceCharacteristics: getBLEDeviceCharacteristics,
  sentOrder: sentOrder,

}