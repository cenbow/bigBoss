Ext.define('Common.store.CommonUserGrantShopStore', {
  extend: 'Ext.data.Store',
  alias: 'store.commonusergrantshopstore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      proxy: {
        type: 'ajax',
        url: '/api/general/shop/userGrantShopList',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }, cfg)]);
  }
});