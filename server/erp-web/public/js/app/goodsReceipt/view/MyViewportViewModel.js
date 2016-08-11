Ext.define('GoodsReceipt.view.MyViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.myviewport',

  requires: [
    'GoodsReceipt.store.CommonComboboxStore',
    'Common.store.CommonWhsStore',
    'GoodsReceipt.store.GoodsReceiptGridStore',
    'GoodsReceipt.store.ReceiptDetailGridStore',
    'GoodsReceipt.store.StockRecordStatusStore'
  ],


  stores: {
    goodsReceiptGridStore: {
      type: 'goodsreceiptgridstore',
    },
    receiptDetailGridStore: {
      type: 'receiptdetailgridstore'
    },
    whsStore: {
      type: 'commonwhsstore',
      autoLoad: true
    },
    stockRecordStatusStore: {
      type: 'stockrecordstatusstore'
    },
    receiptType: {
      storeId: 'receiptType',
      type: 'commoncomboboxstore',
      autoLoad: true
    },
    inStatusStore: {
      model: 'Common.model.SelectOptionModel',
      type: 'store',
      data: [
        {
          name: '草稿',
          code: 'DRAFT'
        },
        {
          name: '已入库',
          code: 'TRANSFERRED_IN'
        },
        {
          name: '已取消',
          code: 'CANCELLED'
        }
      ]
    },
  }
});