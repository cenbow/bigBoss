Ext.define('PurchaseReturn.store.StockRecordStatusStore', {
  extend: 'Ext.data.Store',
  alias: 'store.stockrecordstatusstore',

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
          name: '已出库',
          code: 'TRANSFERRED_OUT'
        },
        {
          name: '已取消',
          code: 'CANCELLED'
        }
      ]
    }, cfg)]);
  }
});