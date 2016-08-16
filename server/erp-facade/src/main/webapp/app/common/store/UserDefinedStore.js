Ext.define('Common.store.UserDefinedStore', {
  extend: 'Ext.data.Store',
  alias: 'store.userdefinedstore',

  requires: [
    'Common.model.SelectOptionModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.SelectOptionModel',
      autoSync: false,
      autoLoad: true,
      proxy: {
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }, cfg)]);
  }

});