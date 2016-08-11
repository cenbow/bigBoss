Ext.define('PurchaseReceipt.view.MyViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.myviewport',

  requires: [
    'PurchaseReceipt.store.PurchaseReceiptGridStore',
    'PurchaseReceipt.store.PurchaseReceiptLineGridStore'
  ],

  stores: {
    purchaseReceiptGridStore: {
      type: 'purchasereceiptgridstore',
      autoLoad: true
    },
    purchaseReceiptLineGridStore: {
      type: 'purchasereceiptlinegridstore'
    }
  }
  //
  //stores: {
  //purchaseReturnGridStore: {
  //    type: 'purchasereturngridstore',
  //  },
  //  returnDetailGridStore: {
  //    type: 'returndetailgridstore'
  //  },
  //  whsStore: {
  //    type: 'commonwhsstore',
  //    autoLoad: true
  //  },
  //  stockRecordStatusStore: {
  //    type: 'stockrecordstatusstore'
  //  },
  //  purchaseReturnTypeStore: {
  //    type: 'purchasereturntypestore'
  //  },
  //  supplierStore: {
  //    type: 'comboboxsupplierstore'
  //  }
  //}
});