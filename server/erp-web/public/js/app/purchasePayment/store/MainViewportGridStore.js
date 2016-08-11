Ext.define('PurchasePayment.store.MainViewportGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.mainviewportgridstore',

  requires: [
    'PurchasePayment.model.PurchasePaymentModel',
    'Ext.data.proxy.Ajax'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'PurchasePayment.model.PurchasePaymentModel',
      proxy: {
        url: '/api/purchase/payment/filter',
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data.pageData',
          totalProperty: 'data.totalCount'
        }
      }
    }, cfg)]);
  }

});