Ext.define('GoodsReceipt.store.ReceiptDetailGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.receiptdetailgridstore',
  
  requires: [
    'GoodsReceipt.model.ReceiptDetailGridModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'GoodsReceipt.model.ReceiptDetailGridModel',
      proxy: {
        type: 'ajax',
        url: '/api/inventory/goods/receipt/lines',
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