// function/function.js
var app = getApp();
var utils = require("../utils/util.js");
var blemessage = require("../utils/blemessage.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textLog: "",
    deviceId: "",
    name: "",
    allRes: "",
    serviceId: "",
  },
  getSkip: function() {
    wx.navigateTo({
      url: '/function/remind/remind',
    })
  },
  goCountdown: function() {
    wx.navigateTo({
      url: '/function/Countdown/Countdown',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var devid = decodeURIComponent(options.deviceId);
    var devname = decodeURIComponent(options.name);
    var devserviceid = decodeURIComponent(options.serviceId);
    var log = "设备名=" + devname + "\n设备UUID=" + devid + "\n服务UUID=" + devserviceid + "\n";
    console.log(log);
    this.setData({
      textLog: log,
      deviceId: devid,
      name: devname,
      serviceId: devserviceid
    });
    //that.getBLEDeviceCharacteristics();
    blemessage.getBLEDeviceCharacteristics(that.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  //获取蓝牙设备某个服务中的所有 characteristic（特征值）
  getBLEDeviceCharacteristics: function (order) {
    var that = this;
    wx.getBLEDeviceCharacteristics({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      success: function (res) {
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.properties.read) {//该特征值是否支持 read 操作
            var log = that.data.textLog + "该特征值支持 read 操作:" + item.uuid + "\n";
            console.log(log);
            that.setData({
              textLog: log,
              readCharacteristicId: item.uuid
            });
          }
          if (item.properties.write) {//该特征值是否支持 write 操作
            var log = that.data.textLog + "该特征值支持 write 操作:" + item.uuid + "\n";
            console.log(log);
            that.setData({
              textLog: log,
              writeCharacteristicId: item.uuid,
              canWrite: true
            });

          }
          if (item.properties.notify || item.properties.indicate) {//该特征值是否支持 notify或indicate 操作
            var log = that.data.textLog + "该特征值支持 notify 操作:" + item.uuid + "\n";
            that.setData({
              textLog: log,
              notifyCharacteristicId: item.uuid,
            });
            that.notifyBLECharacteristicValueChange();
          }

        }

      }
    })
    // that.onBLECharacteristicValueChange();   //监听特征值变化
  },

  //启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。
  //注意：必须设备的特征值支持notify或者indicate才可以成功调用，具体参照 characteristic 的 properties 属性
  notifyBLECharacteristicValueChange: function () {
    var that = this;

    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      characteristicId: that.data.notifyCharacteristicId,
      success: function (res) {
        var log = that.data.textLog + "notify启动成功" + res.errMsg + "\n";
        that.setData({
          textLog: log,
        });
        that.onBLECharacteristicValueChange();   //监听特征值变化
      },
      fail: function (res) {
        wx.showToast({
          title: 'notify启动失败',
          mask: true
        });
        setTimeout(function () {
          wx.hideToast();
        }, 2000)
      }

    })

  },
  //监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
  onBLECharacteristicValueChange: function () {
    var that = this;
    wx.onBLECharacteristicValueChange(function (res) {
      var resValue = utils.ab2hext(res.value); //16进制字符串
      var resValueStr = utils.hexToString(resValue);

      var log0 = that.data.textLog
        + "成功获取：直接返回数据" + res.value + "\n"
        + "ArrayBuffer转16进制字符串示例" + resValue + " \n"
        + "16进制转字符串" + resValueStr + "\n"
      //+ "字符串转16进制" + resValueStr1 + "\n"
      /* +"16进制转字符串"+valuestr1+"\n" */
      // + "16进制转字符串22" + valuestr2 + "\n";
      that.setData({
        textLog: log0,
      });

    });
  },
  //发送指令
  sentOrder: function () {
    var that = this;
    //var orderStr = that.data.orderInputStr;//指令
    var orderStr = "1SG你在干什么妮子弹头我15846959693981584695969398102";
    var zhuangtai = "1";
    var zhiling = "SG";
    var biaoti = "你在干什么妮子弹头我";
    var kaishi = "1584695969398";
    var jieshu = "1584695969398";
    var txzqi = "1584695969398";
    var order = utils.stringToBytes(orderStr);

    that.getTimeout();
    that.writeBLECharacteristicValue(order);
    console.log("1111111111111111");

    var account = 'abc';
    var password = '123';

    var loginin = "sfsafafsf";
    wx.request({
      //http://192.168.33.1:8080/login/toLogin
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
      },
      success: function (res) {
        // success
        console.log("网络请求")
        console.log("数据打印" + res.data.data + res.data.code + res.data.msg + "\n" + JSON.stringify(res.data))

        console.log("网络请求")
      },
      fail: function (res) {
        console.log("fail:" + res)
        // fail
      }
    })
  },
  //向低功耗蓝牙设备特征值中写入二进制数据。
  //注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
  writeBLECharacteristicValue: function (order) {
    var that = this;
    let byteLength = order.byteLength;
    var log = that.data.textLog + "当前执行指令的字节长度:" + byteLength + "\n";
    console.log(log);
    that.setData({
      textLog: log,
    });
    wx.writeBLECharacteristicValue({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      characteristicId: that.data.writeCharacteristicId,
      
      // 这里的value是ArrayBuffer类型
      value: order.slice(0, 20),//order.slice(0, 20)
      success: function (res) {
        if (byteLength > 20) {
          setTimeout(function () {
            that.writeBLECharacteristicValue(order.slice(20, byteLength));//order.slice(20, byteLength)
          }, 150);
        }
        var log = that.data.textLog + "写入成功：" + res.errMsg + "\n";
        console.log(log);
        
        that.setData({
          textLog: log + "\n",
        });
        console.log("发送数据时的写入："+that.data.deviceId + "\n" + that.data.serviceId + "\n" + that.data.writeCharacteristicId);
      },

      fail: function (res) {
        var log = that.data.textLog + "写入失败" + res.errMsg + "\n";
        console.log(log);
        that.setData({
          textLog: log,
        });
      }
      

    })
  },

  getTimeout: function () {
    var that = this;

    var timestamp = Date.parse(new Date());
    var timestampq = (new Date()).valueOf();
    var test4 = utils.js_date_time(timestamp);
    var test1 = utils.js_date_time(timestampq);
    console.log(timestamp + "\n" + timestampq);
    var log = that.data.textLog + "时间戳：" + test4 + "\n" + timestampq + "\n";
    that.setData({
      textLog: log + "\n",
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})