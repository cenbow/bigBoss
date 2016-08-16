Ext.define('Common.view.PurchaseSearchFormViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.purchasesearchform',

  requires: [
    'Common.store.CommonWhsStore',
    'Common.store.CommonSupplierStore',
    'Common.model.SelectOptionModel'
  ],

  data: {
    title: null,
    baseNoLabel: null
  },
  stores: {
    inStatusStore: {
      model: 'Common.model.SelectOptionModel',
      type: 'store',
      data: [
        {
          name: '全部',
          code: ''
        },
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
    outStatusStore: {
      model: 'Common.model.SelectOptionModel',
      type: 'store',
      data: [
        {
          name: '全部',
          code: ''
        },
        {
          name: '草稿',
          code: 'DRAFT'
        },
        {
          name: '已出库',
          code: 'TRANSFERRED_OUT'
        },
        {
          name: '已取消',
          code: 'CANCELLED'
        }
      ]
    },
    whsStore: {
      type: 'commonwhsstore',
      autoLoad: true
    },
    supplierStore: {
      type: 'commonsupplierstore',
      autoLoad: true
    }
  }
});