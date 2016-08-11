Ext.define('GoodsReceipt.store.GoodsReceiptGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.goodsreceiptgridstore',
  
  requires: [
    'GoodsReceipt.model.GoodsReceiptGridModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'GoodsReceipt.model.GoodsReceiptGridModel',
      proxy: {
        type: 'ajax',
        url: '/api/inventory/goods/receipt/filter',
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