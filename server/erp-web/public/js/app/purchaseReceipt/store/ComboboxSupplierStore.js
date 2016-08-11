Ext.define('PurchaseReceipt.store.ComboboxSupplierStore', {
  extend: 'Ext.data.Store',
  alias: 'store.comboboxsupplierstore',
  
  requires: [
    'PurchaseReceipt.model.CommonComboboxModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Array'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'PurchaseReceipt.model.CommonComboboxModel',
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