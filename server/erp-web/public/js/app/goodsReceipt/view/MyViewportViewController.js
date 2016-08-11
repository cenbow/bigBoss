Ext.define('GoodsReceipt.view.MyViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.myviewport',

  init: function () {
    var me = this,
      view = me.getView(),
      viewModel = me.getViewModel();

    //防止grid数据加载了，但type数据还没加载
    var typeStore = viewModel.getStore('receiptType');
    typeStore.on('load', function() {
      var gridStore = viewModel.getStore('goodsReceiptGridStore');
      gridStore.load();
    })
  },

  onCommandColumnClick: function (btn, event) {
    var me = this,
      command = btn.command,
      grid = me.getView().down('grid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'update') {
      me._openUpdateDialog(record);
    } else if(command == 'print') {
      me._openPrintDialog(record);
    }
  },

  _openPrintDialog: function(record) {
    var dialog = Ext.create('Common.view.PrintWindow', {
      printOption: {
        url: '/api/inventory/goods-receipt-print.html',
        method: 'POST',
        params: {receiptId: record.id}
      }
    });
    dialog.show();
  },

  _openUpdateDialog: function (record) {
    if (record.get("status") != 'DRAFT') {
      return;
    }
    var me = this;
    var grid = me.getView().down('grid');

    this.__openWindow({isEdit: true, record: record})
  },

  __openWindow: function (option) {
    var me = this;
    var option = option || {};
    var viewModel = me.getViewModel();
    var receiptTypesStore = viewModel.getStore("receiptType");
    
    var stWindow = Ext.create('GoodsReceipt.view.AddDialog', {
      parent: me.getView(),
      callback: me.refreshGrid,
      scope: me,
      receiptTypesStore: receiptTypesStore
    });
    var stViewModel = stWindow.getViewModel();
    if (option.isEdit && option.record) {
      stViewModel.set('receiptId', option.record.get("baseId"));
      stViewModel.set('typeId', option.record.get("type"));
      stWindow.getController().initPage();
    }
    stWindow.show();
  },

  refreshGrid: function () {
    var me = this.scope;
    me.getView().query('form')[0].down('button').fireEvent('click');
  },

  onGridItemSelect: function (dataviewmodel, record, index, eOpts) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore('receiptDetailGridStore');

    var receiptId = record.get("baseId");
    if (receiptId) {
      store.load({params: {receiptId: receiptId}});
    }
  },

  onTableItemDblClick: function (dataview, record, item, index, e, eOpts) {
    this._openUpdateDialog(record);
  },

  onButtonAddClick: function (button, e, eOpts) {
    this.__openWindow();
  },
  renderType: function (typeId, meta, record) {
    var id = parseInt(typeId);
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("receiptType");
    var record = store.getById(id);
    return record ? record.get("name") : null;
  },
  renderStatus: function (status, meta, record) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("inStatusStore");
    var record = store.findRecord("code", status);
    return record ? record.get("name") : null;
  },

});
