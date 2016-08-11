Ext.define('ShopOrderList.store.ShopOrderLineStore', {
  extend: 'Ext.data.Store',
  alias: 'store.shoporderlinestore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'ShopOrderLineStore',
      fields: ["outerSkuId", "outerSkuName", "price", 'quantity', 'weight', 'lineTotal'],
      data: [
        {
          outerSkuId: '121515454545',
          outerSkuName: '商品1-1',
          price: 2.1,
          quantity: 7,
          weight: 9.6,
          lineTotal: 29
        },
        {
          outerSkuId: '213254545445445545',
          outerSkuName: '商品1-2'
        },
        {
          outerSkuId: '121254584854',
          outerSkuName: '商品1-3'
        },
        {
          outerSkuId: '121515155458',
          outerSkuName: '长度长度aaaaaaaassssss'
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