Ext.define('ProductMgmt.store.MainViewportGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.mainviewportgridstore',

  requires: [
    'ProductMgmt.model.MainViewportGridModel',
    'Ext.data.proxy.Ajax'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model : 'ProductMgmt.model.MainViewportGridModel'
    }, cfg)]);
  }
});