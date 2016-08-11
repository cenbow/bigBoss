Ext.define('CompanySetting.store.DeliverTypeListStore', {
  extend: 'Ext.data.Store',
  alias: 'store.companysetting.delivertypeliststore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      fields: ["id","text"],
      proxy: {
        type: 'ajax',
        url: '/api/general/company/setting/deliver/list',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }, cfg)]);
  }
});