Ext.define('PurchaseReturn.store.ComboboxSupplierStore', {
  extend: 'Ext.data.Store',
  alias: 'store.comboboxsupplierstore',
  
  requires: [
    'PurchaseReturn.model.CommonComboboxModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Array'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'PurchaseReturn.model.CommonComboboxModel',
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