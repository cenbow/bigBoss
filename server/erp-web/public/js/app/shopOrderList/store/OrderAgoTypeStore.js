Ext.define('ShopOrderList.store.OrderAgoTypeStore', {
  extend: 'Ext.data.Store',
  alias: 'store.orderagotypestore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'OrderAgoTypeStore',
      fields: ["key", "value"],
      data: [
        {
          key: 'WITHIN_ONE_DAYS',
          value: '24小时以内'
        },
        {
          key: 'WITHIN_TWO_DAYS',
          value: '48小时以内'
        },
        {
          key: 'WITHIN_THREE_DAYS',
          value: '72小时以内'
        },
        {
          key: 'WITHIN_THREE_SEVEN_DAYS',
          value: '3-7天以内'
        },
        {
          key: 'WITHIN_THIRTY_DAYS',
          value: '30天以内'
        },
        {
          key: 'WITHIN_NINETY_DAYS',
          value: '90天以内'
        },
        {
          key: -1,
          value: '全部'
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