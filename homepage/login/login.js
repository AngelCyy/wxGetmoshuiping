const app = getApp();

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    result: '',
    loadingHidden: true,
    showView: true,
    showModal: false,
    devices: [],
    connected: false,
    chs: [],
    textLog: "",
    start: true,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,

      })
      // var name = userInfo.nickName
      //console.log("11111111111" + name)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        var user = res.userInfo
        var name = user.nickName
        var photo = user.avatarUrl
        var gender = user.gender //性别 0：未知、1：男、2：女
        var province = user.province
        var city = user.city
        var country = user.country
        console.log("用户数据: " + name + "\n" + photo + "\n" + gender + "\n" + province + "\n" + city + "\n" + country)
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
          var user = res.userInfo
          var name = user.nickName
          console.log("姓名" + name)
        }
      })
      console.log("3333333333")
    }
  },
  getUserInfo: function(e) {
    console.log("点击事件" + e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getScancode: function() {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        var redata = "";
        _this.setData({
          result: result,
          redata: result
        })
        console.log("扫描数据1" + result + "\n" + redata)
        this.startScan();
      }

    })


  },


  showButton: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView),
    })
  },
  showBusy: function() {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
  },
  submit: function() {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function() {

  },


  go: function() {
    this.setData({
      showModal: false
    })
  },
  //蓝牙模块

  //清空log日志
  startClear: function() {
    var that = this;
    that.setData({
      textLog: ""
    });
  },
  /**
   * 流程：
   * 1.先初始化蓝牙适配器，
   * 2.获取本机蓝牙适配器的状态，
   * 3.开始搜索，当停止搜索以后在开始搜索，就会触发蓝牙是配置状态变化的事件，
   * 4.搜索完成以后获取所有已经发现的蓝牙设备，就可以将devices中的设备Array取出来，
   * 5.然后就可以得到所有已经连接的设备了
   */
  startScan: function() {
    var that = this;
    that._discoveryStarted = false;
    console.log("调用蓝牙连接")
    if (that.data.isopen) { //如果已初始化小程序蓝牙模块，则直接执行扫描
      that.getBluetoothAdapterState();
      console.log("已经初始化蓝牙模块")

    } else {
      that.openBluetoothAdapter();
      console.log("未初始化蓝牙模块")

    }
  },
  //初始化小程序蓝牙模块
  openBluetoothAdapter: function() {
    var that = this;
    wx.openBluetoothAdapter({
      success: function(res) {
        var log = that.data.textLog + "打开蓝牙适配器成功！\n";
        console.log(log);
        that.setData({
          textLog: log,
          isopen: true
        });
        that.getBluetoothAdapterState();
        /*  wx.navigateTo({
           url: '/homepage/login/login',
         }) */

      },
      fail: function(err) {
        isopen: true;
        app.showModal1("蓝牙开关未开启");
        var log = that.data.textLog + "蓝牙开关未开启 \n";
        that.setData({
          textLog: log
        });
      }
    })
    //监听蓝牙适配器状态变化事件
    wx.onBluetoothAdapterStateChange(function(res) {
      console.log('onBluetoothAdapterStateChange', res)
      var isDvailable = res.available; //蓝牙适配器是否可用
      if (isDvailable) {
        that.getBluetoothAdapterState();
      } else {
        that.stopBluetoothDevicesDiscovery(); //停止搜索
        that.setData({
          devices: []
        });
        app.showModal1("蓝牙开关未开启");
      }
    })
  },
  //关闭蓝牙模块，使其进入未初始化状态。
  closeBluetoothAdapter: function() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false
  },
  //获取本机蓝牙适配器状态
  getBluetoothAdapterState: function() {
    var that = this;
    wx.getBluetoothAdapterState({
      success: function(res) {
        var isDiscov = res.discovering; //是否正在搜索设备
        var isDvailable = res.available; //蓝牙适配器是否可用
        if (isDvailable) {
          var log = that.data.textLog + "本机蓝牙适配器状态：可用 \n";
          console.log(log)
          that.setData({
            textLog: log
          });

          if (!isDiscov) {
            //扫描附近蓝牙设备
            that.startBluetoothDevicesDiscovery();
          } else {
            var log = that.data.textLog + "已在搜索设备 \n";
            console.log(log);
            that.setData({
              textLog: log
            });
          }
        }
      }
    })
  },
  //开始扫描附近的蓝牙外围设备。
  //注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
  startBluetoothDevicesDiscovery: function() {
    var that = this;
    if (that._discoveryStarted) {
      return
    }
    that._discoveryStarted = true;
    app.showLoading("正在扫描..");
    var log = that.data.textLog + "正在扫描..\n";
    that.setData({
      textLog: log
    });
    setTimeout(function() {
      wx.hideLoading(); //隐藏loading
      /*  wx.navigateTo({
         url: '/homepage/login/login',
       }) */
    }, 3000);
    wx.startBluetoothDevicesDiscovery({
      services: [],
      allowDuplicatesKey: true, //是否允许重复上报同一设备, 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI(信号) 值会有不同
      success: function(res) {
        var log = that.data.textLog + "扫描附近的蓝牙外围设备成功，准备监听寻找新设备:" + res + "\n";
        console.log(log);
        that.setData({
          textLog: log
        });
        that.onBluetoothDeviceFound(); //监听寻找到新设备的事件
      }
    });

  },


  //停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
  stopBluetoothDevicesDiscovery: function() {
    var that = this;
    var log = that.data.textLog + "停止搜寻附近的蓝牙外围设备 \n";
    that.setData({
      textLog: log
    });
    wx.stopBluetoothDevicesDiscovery()
  },
  //监听寻找到新设备的事件
  onBluetoothDeviceFound: function() {
    var that = this;
    wx.onBluetoothDeviceFound(function(res) {
      res.devices.forEach(function(device) {
        if (!device.name && !device.localName) {
          return
        }
        const foundDevices = that.data.devices;
        const idx = inArray(foundDevices, 'deviceId', device.deviceId);
        const datas = {};
        if (idx === -1) {
          datas[`devices[${foundDevices.length}]`] = device
        } else {
          datas[`devices[${idx}]`] = device
        }
        that.setData(datas)
        var dataid = "C7:61:F7:C1:2C:26";
        console.log("本页数据" + that.data.result)
        var daid = device.deviceId
        if (dataid === daid) {
          console.log("数据打印" + dataid + "\n" + device.deviceId)

          if (that.data.start === true) {
            that.createBLEConnection(device);
            that.data.start = false;
            console.log("连接蓝牙")
          }else{
            console.log("当start为false是不会链接蓝牙"+that.data.start)
          }
        } else {
          console.log("数据错误"  + daid)
        }

        that.stopBluetoothDevicesDiscovery();


      })
    })
  },
  //连接低功耗蓝牙设备。
  createBLEConnection: function(ds) {
    //app.showModal1("连接设备，设备为低功耗设备！");

    var that = this;
    // const ds = e.currentTarget.dataset;
    const devId = ds.deviceId; //设备UUID
    const name = ds.name; //设备名
    console.log(ds + devId + name);
    // that.stopConnectDevices();  //配对之前先断开已连接设备
    // app.showLoading("正在连接，请稍后");

    var log = that.data.textLog + "正在连接，请稍后..\n";
    that.setData({
      textLog: log
    });
    app.showLoading("连接中..");
    wx.createBLEConnection({
      deviceId: devId,
      success: function(res) {
        wx.hideLoading(); //隐藏loading
        var log = that.data.textLog + "配对成功,获取服务..\n";
        console.log(log)
        that.setData({
          textLog: log,
          connected: true,
          name,
          devId,
        });
        that.getBLEDeviceServices(devId)
      },
      fail: function(err) {
        wx.hideLoading(); //隐藏loading
        var log = that.data.textLog + "连接失败，错误码：" + err.errCode + "\n";
        that.setData({
          textLog: log
        });
        console.log(log)

        if (err.errCode === 10012) {
          that.data.start = true;
          app.showModal1("连接超时,请重试!");
        } else if (err.errCode === 10013) {
          that.data.start =true;
          app.showModal1("连接失败,蓝牙地址无效!");
        } else {
          that.data.start = true;
          app.showModal1("连接失败,请重试!111"); // + err.errCode10003原因多种：蓝牙设备未开启或异常导致无法连接;蓝牙设备被占用或者上次蓝牙连接未断开导致无法连接
        }

        that.closeBLEConnection()
      },

    });
    that.stopBluetoothDevicesDiscovery(); //停止搜索
  },
  //断开与低功耗蓝牙设备的连接
  closeBLEConnection: function() {
    wx.closeBLEConnection({
      deviceId: this.data.devId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },

  //获取蓝牙设备所有 service（服务）
  getBLEDeviceServices: function(devId) {
    var that = this;
    wx.getBLEDeviceServices({
      deviceId: devId,
      success: function(res) {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) { //该服务是否为主服务
            var s = res.services[i].uuid;
            var log = that.data.textLog + "该服务是为主服务:" + res.services[i].uuid + "\n";
            that.setData({
              textLog: log
            });
            console.log("准备跳转页面log"+that.data.name + "\n" + devId + "\n" + res.services[i].uuid)
            wx.navigateTo({
              /*  url: '/pages/functionPage/functionPage?name=' + encodeURIComponent(that.data.name) + '&deviceId=' + encodeURIComponent(devId) + '&serviceId=' + encodeURIComponent(res.services[i].uuid) */
             /*  url: '/function/function?name=' + encodeURIComponent(that.data.name) + '&deviceId=' + encodeURIComponent(devId) + '& serviceId=' + encodeURIComponent(res.services[i].uuid) */
              url: '/function/function?name=' + encodeURIComponent(that.data.name) + '&deviceId=' + encodeURIComponent(devId) +
               '&serviceId=' + encodeURIComponent(res.services[i].uuid)
            
            });
            wx.setStorage({
              key: 'user',
              data: {
                name:that.data.name,
                deviceId:devId,
                uuid:res.services[i].uuid
              },
            })
            return
          }
        }
      }
    })
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