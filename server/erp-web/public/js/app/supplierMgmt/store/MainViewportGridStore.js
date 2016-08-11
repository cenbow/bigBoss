Ext.define('SupplierMgmt.store.MainViewportGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.mainviewportgridstore',
  
  requires: [
    'SupplierMgmt.model.MainViewportGridModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'SupplierMgmt.model.MainViewportGridModel',
      proxy: {
        type: 'ajax',
        baseParams: {},
        api: {
          read: '/api/general/supplier/filter',
          update: '/api/general/supplier/enable'
        },
        reader: {
          type: 'json',
          rootProperty: 'data.pageData',
          startProperty: 'data.start',
          limitProperty: 'data.pageSize',
          totalProperty: 'data.totalCount'
        }
      },
      listeners: {
          exception: function (proxy, type, action, options, response) {
              Ext.MessageBox.alert("错误","服务器异常!");
              me.rejectChanges();
          }
      }
    }, cfg)]);
  }
});