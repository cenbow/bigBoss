Ext.define('PurchaseReturn.store.ReturnDetailGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.returndetailgridstore',
  
  requires: [
    'PurchaseReturn.model.ReturnDetailGridModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'PurchaseReturn.model.ReturnDetailGridModel',
      proxy: {
        type: 'ajax',
        url: '/api/inventory/purchase/return/lines',
        reader: {
          type: 'json',
          rootProperty: 'data'
        },
        writer: {
          type: 'json',
          clientIdProperty: 'clientId'
        }
      }
    }, cfg)]);
  }
});