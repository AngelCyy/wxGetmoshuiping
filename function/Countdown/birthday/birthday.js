// function/Countdown/birthday/birthday.js

var app = getApp();
var utils = require("../../../utils/util.js");
var setDatelist = require("../../../utils/json.js");
var blemessage = require("../../../utils/blemessage.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    checkeds: true,
    time: "12:01",
    time1: "15:30",
    date: utils.getDate(),
    textLog: "",
    countries: ["当天", "提前1天", "提前3天", "提前5天"],
    countryIndex: 0,
    remind: ["默认", "蜂鸣", "灯光"],
    remindIndex: 0,
    name: "",
    deviceId: "",
    uuid: "",
    code:4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var timestampq = (new Date()).valueOf();
    var test4 = utils.js_date_time(timestamp);
    var test1 = utils.js_date_timeshifen(timestamp);
    console.log(timestamp + "\n" + timestampq + test1);
    //var log = that.data.textLog + "时间戳：" + test4 + "\n" + timestampq + "\n";
    
    this.setData({
      time: test1,
      time1: test1,
    })
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log("获取本地的存储数据" + res.data.name + "\n" + res.data.deviceId + "\n" + res.data.uuid);
        that.setData({
          name: res.data.name,
          deviceId: res.data.deviceId,
          uuid: res.data.uuid,
        })
      },
    })

  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value,
    })
    console.log("设置当前时间为" + e.detail.value);
  },
  bindTimeChange1: function(e) {
    this.setData({
      time1: e.detail.value
    })
    console.log("设置当前时间为2：：" + e.detail.value);
  },
  bindCountryChange: function(e) {
    //0 为当天  1提前1天  2提前3天  3提前5天
    console.log('picker country 时间间隔发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  RemindtheWay: function(e) {
    //0 为默认 1为蜂鸣 2为灯光
    console.log('picker country 提醒发生选择改变，携带值为', e.detail.value);
    this.setData({
      remindIndex: e.detail.value
    })
  },
  sendAp: function() {
    var that = this;
    //数据传输完后关闭页面
    /* wx.navigateBack({
      delta: 1
    }) */
    
    app.globalData=that.data
    blemessage.sentOrder();
    console.log("初始化数据"+JSON.stringify(that.data));
    
  },
  /**
   * switch开关监听
   */
  listenerSwitch: function(e) {
    console.log('switch类型开关当前状态-----', e.detail.value);
    this.setData({
      checked: e.detail.value
    })
  },
  listenerSwitch1: function(e) {
    console.log('重复提醒类型开关当前状态-----', e.detail.value)
    this.setData({
      checkeds: e.detail.value
    })
  },
  changeDate(e) {
    console.log("日期发生变化"+e.detail.value)
    this.setData({
      date: e.detail.value
    });
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