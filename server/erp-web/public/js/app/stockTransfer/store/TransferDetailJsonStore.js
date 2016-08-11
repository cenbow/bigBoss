Ext.define('StockTransfer.store.TransferDetailJsonStore', {
  extend: 'Ext.data.Store',
  alias: 'store.transferdetailjsonstore',
  requires: [
    'StockTransfer.model.TransferDetailModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'StockTransfer.model.TransferDetailModel',
      proxy: {
        type: 'ajax',
        url: '/api/inventory/stock/transfer/lines',
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