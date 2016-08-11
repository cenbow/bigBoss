Ext.define('StockTransfer.store.StockTransferTypeStore', {
  extend: 'Ext.data.Store',
  alias: 'store.stocktransfertypestore',

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
          name: '仓内转储',
          code: 'WITHIN_WHS'
        },
        {
          name: '多仓转储',
          code: 'BETWEEN_WHS'
        }
      ]
    }, cfg)]);
  }
});