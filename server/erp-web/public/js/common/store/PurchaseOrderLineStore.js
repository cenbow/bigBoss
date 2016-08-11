Ext.define('Common.store.PurchaseOrderLineStore', {
  extend: 'Ext.data.Store',
  alias: 'store.purchaseorderlinestore',
  requires: [
    'Common.model.PurchaseOrderLineModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};

    me.callParent([Ext.apply({
      model: 'Common.model.PurchaseOrderLineModel',
      proxy: {
        url: '/api/common/purchase/order/line/filter',
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data.result',
          totalProperty: 'data.totalCount'
        }
      }
    }, cfg)]);
  }
});