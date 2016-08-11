Ext.define('StockTransfer.store.StockTransferStatusStore', {
  extend: 'Ext.data.Store',
  alias: 'store.stocktransferstatusstore',

  requires: [
    'Common.model.SelectOptionModel'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.SelectOptionModel',
      data: [
        {
          name: '草稿',
          code: 'DRAFT'
        },
        {
          name: '已入库',
          code: 'TRANSFERRED_IN'
        },
        {
          name: '已取消',
          code: 'CANCELLED'
        }
      ]
    }, cfg)]);
  }
});