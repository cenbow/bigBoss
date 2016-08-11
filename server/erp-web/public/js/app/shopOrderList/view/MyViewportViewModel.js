Ext.define('ShopOrderList.view.MyViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.myviewport',

  requires: [
    'Common.store.CommonWhsStore',
    'Common.store.CommonUserGrantShopStore'
  ],

  data: {
    formData: {
      shopId: -1,
      shopOrderType: -1,
      orderAgoTypeStore: 'WITHIN_THREE_DAYS',
      grantWhsId: -1,
      orderStatus: -1,
      shopOrderNo: '',
      memberNick: '',
      receiverMobile: '',
      skuCodes: ''
    },
    orderLineFormData: {

    },
    orderInfoFormData: {
      memberNick: '',
      receiverName: ''
    }
  },

  stores: {
    usergrantshopstore: {
      type: 'commonusergrantshopstore',
      autoLoad: true
    },
    'commonwhsstore': {
      type: 'commonwhsstore',
      autoLoad: true
    }
  }

});