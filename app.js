//app.js
App({
  data:{
    exitApp: true,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log("获取信息失败", res)
      }
    })
    this.globalData.sysinfo = wx.getSystemInfoSync();
  },
    /* //屏幕适配
    wx.getSystemInfo({
      success(res) {
        windowWidth = res.windowWidth;
        windowHeigth = res.windowHeight;
        px2rpx = 750 / windowWidth;
      }
    }) */
    /* wx.openBluetoothAdapter({
      success: function (res) {

      },
      fail: function (res) {
        wx.showModal({
          content: "连接设备需要打开蓝牙，检测蓝牙未打开，请去手机设置中打开",
          showCancel: true,
          confirmText: "确定",
          confirmColor: "#1bb1fe",
          cancelColor: "#999",
          success: function (res) {
            //有取消按钮时，确认的回调函数
            if (res.confirm) {
             
             console.log("关闭小程序")
            }
          }
        })
      },
      complete(res) {
      }
    })
  }, */

  globalData: {
    code:0,
    userInfo: null,
    checked: true,
    checkeds: true,
    time: "12:01",
    time1: "15:30",
    date: "2020-01-01",
    textLog: "",
    countries: ["当天", "提前1天", "提前3天", "提前5天"],
    countryIndex: 0,
    remind: ["默认", "蜂鸣", "灯光"],
    remindIndex: 0,
    name: "",
    deviceId: "",
    uuid: "",
    period: ["按天", "按周", "按月"],
    periodIndex: 0,
    information: "默认标题",
  },
  getbledata:{
      message:"",
      code:"",
  },
  //弹窗提示,有确认按钮
  showModal1: function (txt) {
    wx.showModal({
      title: "提示",
      content: txt,
      showCancel: false,
      confirmText: "确定"
    })
  },
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            //url: '../setting/setting',
          })
        }
      }
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    
  },
  getModel: function() { //获取手机型号
    return this.globalData.sysinfo["model"]
  },
  getWxVersion: function() { //获取微信版本号
    return this.globalData.sysinfo["version"]
  },
  getSystem: function() { //获取操作系统版本
    return this.globalData.sysinfo["system"]
  },
  getPlatform: function() { //获取客户端平台
    return this.globalData.sysinfo["platform"]
  },
  getSDKVersion: function() { //获取客户端基础库版本
    return this.globalData.sysinfo["SDKVersion"]
  },
  //loading
  showLoading: function (txt) {
    wx.showLoading({
      title: txt,
      mask: true
    });
  },
 
})