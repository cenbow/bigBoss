Ext.define('Common.view.GoodsChooseDialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.goodschoosedialog',

  requires: [
    'Common.store.ProductSkuStore'
  ],
  data: {
    selectedData: []
  },

  stores: {
    gridStore: {
      type: 'productskustore',
    }
  }
});