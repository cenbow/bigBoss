Ext.define('Common.view.InventorySearchFormViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.inventorysearchform',

  requires: [
    'Common.store.CommonWhsStore',
    'Common.model.SelectOptionModel'
  ],

  data: {
    title: null,
    baseNoLabel: null
  },
  stores: {
    stockTransferStatusStore: {
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
    }
  }
});