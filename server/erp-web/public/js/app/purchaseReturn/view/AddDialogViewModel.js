Ext.define('PurchaseReturn.view.AddDialogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adddialog',

    requires: [
      'PurchaseReturn.store.ComboboxSupplierStore',
      'Common.store.CommonWhsStore',
      'Common.store.CommonWhsAreaStore',
      'PurchaseReturn.store.ReturnDetailGridStore',
      'PurchaseReturn.store.PurchaseReturnTypeStore'
    ],

    data: {
      supplierId: null,
      postDate: new Date(),
      whsId: null,
      whsAreaId: null,
      memo: null,
      statusList:['PARTIALLY_RECEIVED','FULLY_RECEIVED']
    },
    stores: {
      purchaseReturnTypeStore: {
    	type: 'purchasereturntypestore'
      },
      whsStore: {
        type: 'commonwhsstore',
        autoLoad: true
      },
      whsAreaStore: {
        type: 'commonwhsareastore',
      },
      returnDetailGridStore: {
        type: 'returndetailgridstore'
      },
      supplierStore: {
        type: 'comboboxsupplierstore',
        autoLoad: true
      }
    }
});