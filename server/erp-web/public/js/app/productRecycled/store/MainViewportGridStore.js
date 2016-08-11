Ext.define('ProductRecycled.store.MainViewportGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.mainviewportgridstore',
  
  requires: [
    'ProductRecycled.model.MainViewportGridModel',
    'Ext.data.proxy.Ajax'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'GridStore',
      autoLoad: true,
      model: 'ProductRecycled.model.MainViewportGridModel'

    }, cfg)]);
  }




  /*proxy: {
    type: 'ajax',
    baseParams: {},
    autoLoad:true,
    api: {
      read: '/api/product/search/sku'
    },
    actionMethods:{
      read: 'POST'
    },
    extraParams: {
      query: '{query}'
    },
    reader: {
      type: 'json',
      rootProperty: 'data.pageData',
      totalProperty: 'data.totalCount'
    }
  }*/
});