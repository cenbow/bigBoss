Ext.define('Common.store.CommonSupplierStore', {
  extend: 'Ext.data.Store',
  alias: 'store.commonsupplierstore',
  
  requires: [
    'Common.model.SelectOptionModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Array'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.SelectOptionModel',
      proxy: {
    	url: '/api/common/supplier/list/enabled',
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }, cfg)]);
  }
});