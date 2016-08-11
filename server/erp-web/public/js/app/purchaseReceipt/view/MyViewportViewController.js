Ext.define('PurchaseReceipt.view.MyViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.myviewport',

  init: function () {

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
    } else if(command == 'cancel') {
      me._onButtonCancelClick(record);
    }
  },

  /**
   * 取消出库
   */
  _onButtonCancelClick: function (record) {
    var me = this;
    var view = me.getView();
    var purchaseReturnId = record.get("baseId");
    if (purchaseReturnId) {
      Ext.MessageBox.confirm('提示', '确认取消？',function(option) {
        if (option === 'yes') {
          Ext.Ajax.request({
            method: 'POST',
            url: '/api/purchase/purchase/receipt/cancel/' + purchaseReturnId,
            success: function (request) {
              if (request.responseText) {
                var json = Ext.decode(request.responseText);
                if (json.success) {
                  view.query('form')[0].down('button').fireEvent('click');
                } else {
                  TipsUtil.showTips("错误", json.error.message || "服务器错误！");
                }
              }
            }
          });
        }
      });
    }
  },
  
  _openPrintDialog: function(record) {
    var dialog = Ext.create('Common.view.PrintWindow', {
      printOption: {
        url: '/api/purchase/purchase-receipt-print.html',
        method: 'POST',
        params: {receiptId: record.id}
      }
    });
    dialog.show();
  },

  _openUpdateDialog: function (record) {
    if (record.get("status") != '草稿') {
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
    
    var stWindow = Ext.create('PurchaseReceipt.view.AddDialog', {
      parent: me.getView(),
      callback: me.refreshGrid,
      scope: me
    });
    var stViewModel = stWindow.getViewModel();
    if (option.isEdit && option.record) {
      stViewModel.set('purchaseReceiptId', option.record.get("baseId"));
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
    var store = viewModel.getStore('purchaseReceiptLineGridStore');

    var purchaseReceiptId = record.get("baseId");
    if (purchaseReceiptId) {
      store.load({params: {purchaseReceiptId: purchaseReceiptId}});
    }
  },

  onTableItemDblClick: function (dataview, record, item, index, e, eOpts) {
    this._openUpdateDialog(record);
  },

  onButtonAddClick: function (button, e, eOpts) {
    this.__openWindow();
  }
});
