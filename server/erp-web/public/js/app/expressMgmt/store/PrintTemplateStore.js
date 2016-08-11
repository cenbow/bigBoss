Ext.define('ExpressMgmt.store.PrintTemplateStore', {
  extend: 'Ext.data.Store',
  alias: 'store.printtemplatestore',
  requires: [
    'Common.model.SelectOptionModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Array'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.SelectOptionModel',
      proxy: {
        url: '/api/common/print/template/list',
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }, cfg)]);
  }
});

