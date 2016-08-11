Ext.define('ShopOrderList.store.ShopOrderTypeStore', {
  extend: 'Ext.data.Store',
  alias: 'store.shopordertypestore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'ShopOrderTypeStore',
      fields: ["key", "value"],
      data: [
        {
          key: -1,
          value: '全部'
        },
        {
          key: 'GENERAL',
          value: '一般订单'
        },
        {
          key: 'COD',
          value: '货到付款'
        },
        {
          key: 'WDS',
          value: '一件代发'
        },
        {
          key: 'PRESALE',
          value: '预售订单'
        },
        {
          key: 'VIRTUAL',
          value: '虚拟订单'
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