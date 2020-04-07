// function/facility/facility.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.tempData();
  },
  //测试临时数据
  tempData: function () {
    var list = [{
      rank: "1",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "李飞",
      pace: "23456",
    },
    {
      rank: "2",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "张叶",
      pace: "23450",
    }/* ,
    {
      rank: "3",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "王小婷",
      pace: "22345",
    },
    {
      rank: "4",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "袁经理",
      pace: "21687",
    },
    {
      rank: "5",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "陈雅婷",
      pace: "21680",
    },
    {
      rank: "6",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "许安琪",
      pace: "20890",
    },
    {
      rank: "7",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "里俊飞",
      pace: "20741",
    },
    {
      rank: "8",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "李小俊",
      pace: "19511",
    },
    {
      rank: "9",
      txtStyle: "",
      icon: "/img/user-unlogin.png",
      name: "陈俊飞",
      pace: "19501",
    },
      {
        rank: "9",
        txtStyle: "",
        icon: "/img/user-unlogin.png",
        name: "陈俊飞",
        pace: "19501",
      },
      {
        rank: "9",
        txtStyle: "",
        icon: "/img/user-unlogin.png",
        name: "陈俊飞",
        pace: "19501",
      },
      {
        rank: "9",
        txtStyle: "",
        icon: "/img/user-unlogin.png",
        name: "陈俊飞",
        pace: "19501",
      },
      {
        rank: "9",
        txtStyle: "",
        icon: "/img/user-unlogin.png",
        name: "陈俊飞",
        pace: "19501",
      },
      {
        rank: "9",
        txtStyle: "",
        icon: "/img/user-unlogin.png",
        name: "陈俊飞",
        pace: "19501",
      },
      {
        rank: "9",
        txtStyle: "",
        icon: "/img/user-unlogin.png",
        name: "陈俊飞",
        pace: "19501",
      }, */

    ]

    this.setData({
      list: list
    });
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})