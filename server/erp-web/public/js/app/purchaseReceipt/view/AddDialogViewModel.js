Ext.define('PurchaseReceipt.view.AddDialogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adddialog',

    requires: [
      'PurchaseReceipt.store.ComboboxSupplierStore',
      'Common.store.CommonWhsStore',
      'Common.store.CommonWhsAreaStore',
      'PurchaseReceipt.store.PurchaseReceiptLineGridStore',
      //'PurchaseReturn.store.PurchaseReturnTypeStore'
    ],

    data: {
      supplierId: null,
      postDate: new Date(),
      whsId: null,
      whsAreaId: null,
      memo: null,
      statusList:['PENDING_RECEIVE','PARTIALLY_RECEIVED'],
      purchaseAllowOverReceipt: "false", //是否允许超收
      isOver: "false",//是否已经超收
      isUnitOver: "false",
      //purchaseUnit: null
    },
    stores: {
      //purchaseReturnTypeStore: {
      //type: 'purchasereturntypestore'
      //},
      whsStore: {
        type: 'commonwhsstore',
        autoLoad: true
      },
      whsAreaStore: {
        type: 'commonwhsareastore',
      },
      purchaseReceiptLineGridStore: {
        type: 'purchasereceiptlinegridstore'
      },
      supplierStore: {
        type: 'comboboxsupplierstore',
        autoLoad: true
      }
    }
});