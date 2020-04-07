//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //this.getUserInfo()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,

      })
      var name=userInfo.nickName
      console.log("11111111111"+name)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        var user=res.userInfo
        var name=user.nickName
        var photo = user.avatarUrl
        var gender = user.gender //性别 0：未知、1：男、2：女
        var province = user.province
        var city = user.city
        var country = user.country
        console.log("用户数据: " + name+"\n"+photo+"\n"+gender+"\n"+province+"\n"+city+"\n"+country)
      }
     
      
      
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
         var user= res.userInfo
         var name=user.nickName
         console.log("姓名"+name)
        }
      })
      console.log("3333333333")
    }
  },
  getUserInfo: function(e) {
    console.log("触发事件点击事件"+e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    
    
  }
})
