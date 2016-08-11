Ext.define('ExpressMgmt.store.AreaTreeStore', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.areatreestore',

  requires: [
    'ExpressMgmt.model.AreaTreeModel',
    'Ext.data.TreeStore',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],
  defaultRootProperty: 'items',
  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      /*folderSort: true,*/
      defaultRootProperty: 'items',
      model: 'ExpressMgmt.model.AreaTreeModel',
      proxy: {
        type: 'ajax',
        url: '/api/common/country/tree'
      }

    }, cfg)]);
  }
});
