Ext.define('PurchaseReturn.view.MyViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.myviewport',

  requires: [
    'PurchaseReturn.store.ComboboxSupplierStore',
    'Common.store.CommonWhsStore',
    'PurchaseReturn.store.PurchaseReturnGridStore',
    'PurchaseReturn.store.ReturnDetailGridStore',
    'PurchaseReturn.store.StockRecordStatusStore',
    'PurchaseReturn.store.PurchaseReturnTypeStore'
  ],

  stores: {
	purchaseReturnGridStore: {
      type: 'purchasereturngridstore',
    },
    returnDetailGridStore: {
      type: 'returndetailgridstore'
    },
    whsStore: {
      type: 'commonwhsstore',
      autoLoad: true
    },
    stockRecordStatusStore: {
      type: 'stockrecordstatusstore'
    },
    purchaseReturnTypeStore: {
      type: 'purchasereturntypestore'
    },
    supplierStore: {
      type: 'comboboxsupplierstore'
    }
  }
});