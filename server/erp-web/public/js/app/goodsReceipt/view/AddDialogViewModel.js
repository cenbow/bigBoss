Ext.define('GoodsReceipt.view.AddDialogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adddialog',

    requires: [
      'GoodsReceipt.store.CommonComboboxStore',
      'Common.store.CommonWhsStore',
      'Common.store.CommonWhsAreaStore',
      'GoodsReceipt.store.ReceiptDetailGridStore'
    ],

    data: {
      typeId: null,
      postDate: new Date(),
      whsId: null,
      whsAreaId: null,
      memo: null
    },
    stores: {
      receiptTypeStore: {
    	storeId: 'receiptTypeStore',
        type: 'commoncomboboxstore',
        autoLoad: true
      },
      whsStore: {
        type: 'commonwhsstore',
        autoLoad: true
      },
      whsAreaStore: {
        type: 'commonwhsareastore',
      },
      receiptDetailGridStore: {
        type: 'receiptdetailgridstore'
      }
    }
});