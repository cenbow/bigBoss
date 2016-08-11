Ext.define('ProductMgmt.store.MainViewportTreeStore', {
  extend: 'Ext.data.TreeStore',
  alias: "store.mainviewporttreestore",

  requires: [
    'Ext.data.field.Field'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      defaultRootProperty: 'items',
      fields : [
        'id','leaf', 'qtip',
        {
          name: 'text', mapping: 'name'
        }],
      proxy: {
        type: 'ajax',
        url: '/api/product/category/tree',
        reader: {
          type: 'json'
        }
      }
    }, cfg)]);
  }
});