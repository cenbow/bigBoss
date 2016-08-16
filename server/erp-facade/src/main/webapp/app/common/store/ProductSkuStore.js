Ext.define('Common.store.ProductSkuStore', {
  extend: 'Ext.data.Store',
  alias: 'store.productskustore',
  requires: [
    'Common.model.ProductSkuModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.ProductSkuModel',
      proxy: {
        url: '/api/common/product/search/sku',
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'pageData',
          totalProperty: 'totalCount'
        }
      }
    }, cfg)]);
  }
});