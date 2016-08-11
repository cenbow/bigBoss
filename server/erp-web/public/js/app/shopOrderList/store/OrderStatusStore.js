Ext.define('ShopOrderList.store.OrderStatusStore', {
  extend: 'Ext.data.Store',
  alias: 'store.orderstatusstore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'OrderStatusStore',
      fields: ["key", "value"],
      data: [
        {
          key: -1,
          value: '全部'
        },
        {
          key: 'PENDING_CONSIGN',
          value: '未发货'
        },
        {
          key: 'CONSIGNED',
          value: '已发货'
        }
      ],
      proxy: {
        type: 'ajax',
        reader: {
          type: 'json'
        }
      }
    }, cfg)]);
  }
});