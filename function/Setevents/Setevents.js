var app = getApp();
var utils = require("../../utils/util.js");
var blemessage = require("../../utils/blemessage.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    time: "12:01",
    time1: "15:30",
    textLog: "",
    countries: ["30分钟", "60分钟", "两小时", "三小时"],
    countryIndex: 0,
    remind: ["默认", "蜂鸣", "灯光"],
    remindIndex: 0,
    period: ["按天", "按周", "按月"],
    periodIndex: 0,
    // 字数限制
    current: 0,
    max: 10,
    length: 0,
    information:"",
    code:3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  },

  bindTimeChange: function(e) {
    console.log('开始时间 发生选择改变，携带值为', e.detail.value);
    /* var bijiao = time - time1;
    bijiao > 0 ? true : false;
    if (bijiao) {
     
    } else {
      app.showModal1("开始时间不能大于结束时间");
    } */
    this.setData({
      time: e.detail.value,
    })

  },
  bindTimeChange1: function(e) {
    console.log('结束时间 发生选择改变，携带值为', e.detail.value);
    this.setData({
      time1: e.detail.value
    })
  },
  bindCountryChange: function(e) {
    console.log('提醒间隔 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindPeriod: function(e) {
    console.log('提醒周期 发生选择改变，携带值为', e.detail.value);
    this.setData({
      periodIndex: e.detail.value
    })
  },
  RemindtheWay: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      remindIndex: e.detail.value
    })
  },
  // 文本框字数限制
  limit: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length
    });
  },
  // 获取输入框的值
  getDataBindTap: function(e) {
    var information = e.detail.value; //输入的内容
    var value = e.detail.value.length; //输入内容的长度
    var lastArea = 10 - value; //剩余字数
    if (lastArea < 0) {
      app.showModal1("标题长度最大为10s");
    }
    var that = this;
    that.setData({
      information: information,
      lastArea: lastArea
    })
    console.log(information + "内容长度" + lastArea)
  },
  length(e) {
    let length = e.detail.value.length
    // console.log(length)
    this.setData({
      length: length
    })
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
  sendAp: function() {
    var that = this;
    //数据传输完后关闭页面
    /* wx.navigateBack({
      delta: 1
    }) */

    app.globalData = that.data
    console.log(app.globalData)
    blemessage.sentOrder();
    console.log("初始化数据" + JSON.stringify(that.data));

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