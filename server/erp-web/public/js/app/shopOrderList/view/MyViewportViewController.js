Ext.define('ShopOrderList.view.MyViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.myviewport',

  init: function () {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel();
    var commonWhsStore = viewModel.getStore('commonwhsstore'),
      userGrantShopStore = viewModel.getStore('usergrantshopstore');
    userGrantShopStore.addListener('load', function (curr, recs) {
      userGrantShopStore.insert(0, {key: -1, value: '全部'});
    });
    commonWhsStore.addListener('load', function (curr, recs) {
      commonWhsStore.insert(0, {id: -1, name: '全部'});
    });
    var data = {
      shopId: -1,
      shopOrderType: -1,
      orderAgoTypeStore: 'WITHIN_THREE_DAYS',
      grantWhsId: -1,
      orderStatus: -1,
      shopOrderNo: '',
      memberNick: '',
      receiverMobile: '',
      skuCodes: ''
    };
    viewModel.set("formData", data);
  },

  _openProductWindow: function(){
    var viewCtr = this;
    var window = Ext.create('Common.view.GoodsChooseDialog',
      {
        parent: viewCtr.getView(),
        callback: viewCtr.refreshSkuCodes,
        scope: viewCtr
      });
    window.show();
  },

  refreshSkuCodes: function(arr){
    var viewCtr = this.scope,
      viewModel = viewCtr.getViewModel(),
      formData = viewModel.get("formData");
    var skuCodes = "";
    arr.forEach(function(data,index){
      if(index != 0){
        skuCodes += ",";
      }
      skuCodes += data.skuCode;
    });
    formData.skuCodes = skuCodes;
    viewModel.set("formData", formData);
  },

  searchShopOrderList: function(){
    var viewCtr = this,
      view = viewCtr.getView(),
      viewModel = viewCtr.getViewModel(),
      formCmp = view.down("form"),
      formData = viewModel.get("formData");
    if (!formCmp.isValid()) {
      TipsUtil.showTips("提示", '请检查搜索条件填写是否有误', TipsUtil.WARING);
      return;
    }
    if(formData.shopId == -1)
      formData.shopId = null;
    if(formData.shopOrderType == '-1')
      formData.shopOrderType = null;
    if(formData.orderAgoTypeStore == '-1')
      formData.orderAgoTypeStore = null;
    if(formData.grantWhsId == '-1')
      formData.grantWhsId = null;
    if(formData.orderStatus == '-1')
      formData.orderStatus = null;
    console.log(formData);
  },

  searchRecover: function(){
    var viewCtr = this,
      viewModel = viewCtr.getViewModel();
    var data = {
      shopId: -1,
      shopOrderType: -1,
      orderAgoTypeStore: -1,
      grantWhsId: -1,
      orderStatus: -1,
      shopOrderNo: '',
      memberNick: '',
      receiverMobile: '',
      skuCodes: ''
    };
    viewModel.set("formData", data);
  },

  onGridpanelRowClick: function(tableview, record, tr, rowIndex, e, eOpts){
    var shopOrder = record.data;
    var shopOrderNo = record.get('shopOrderNo');
    this.refreshOrderInfo(shopOrder);
    this.refreshOrderLine(shopOrderNo);
  },

  refreshOrderInfo: function(shopOrder){
    var viewCtr = this,
      viewModel = viewCtr.getViewModel();
    viewModel.set("orderInfoFormData", shopOrder);
  },

  refreshOrderLine: function(shopOrderNo){
    console.log(shopOrderNo);
  }

});
