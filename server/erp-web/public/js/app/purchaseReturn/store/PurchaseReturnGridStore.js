Ext.define('PurchaseReturn.store.PurchaseReturnGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.purchasereturngridstore',
  
  requires: [
    'PurchaseReturn.model.PurchaseReturnGridModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'PurchaseReturn.model.PurchaseReturnGridModel',
      proxy: {
        type: 'ajax',
        url: '/api/inventory/purchase/return/filter',
        reader: {
          type: 'json',
          rootProperty: 'data.result',
          startProperty: 'data.start',
          limitProperty: 'data.pageSize',
          totalProperty: 'data.totalCount'
        }
      }
    }, cfg)]);
  }
});