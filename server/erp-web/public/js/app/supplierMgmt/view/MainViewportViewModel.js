Ext.define('SupplierMgmt.view.MainViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.mainviewport',
  
  requires: [
    'SupplierMgmt.store.MainViewportGridStore'
  ],
  
  formulas: {
    addButonDisabled: function (get) {
      return !Ext.Array.contains(_USER.permissions, 'supplierMgmt:edit');
    }
  },
	  
  stores: {
	gridStore: {
	  storeId: 'gridStore',
      type: 'mainviewportgridstore',
      autoLoad: true,
      autoSync: true
    }
  }

});