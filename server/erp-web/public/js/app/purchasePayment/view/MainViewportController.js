/**
 * Created by Junyi on 2016/7/26.
 */
Ext.define('PurchasePayment.view.MainViewportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',

  requires: [
    /*'PurchasePayment.view.PurchasePaymentDialog'*/
  ],

  init: function () {
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var form = view.down('form');
    Ext.each(form.items.items, function (item) {
      item.addListener('specialkey', me.refreshGrid, me)
    });

    var supplierStore = viewModel.getStore('supplierStore');
    me._insertOptionAll(supplierStore);

    var statusStore = viewModel.getStore('statusStore');
    me._insertOptionAll(statusStore);

    var typeStore = viewModel.getStore('typeStore');
    me._insertOptionAll(typeStore);

  },
  _insertOptionAll: function (store) {
    if (store.getProxy().type == 'ajax') {
      store.on('load', function () {
        store.insert(0, {code: '', id: -1, name: '全部'});
      });
    } else {
      store.insert(0, {code: '', id: -1, name: '全部'});
    }
  },


  /**
   *  打开二级页面
   */
  addPurchasePayment: function (btn) {
    this.__openWindow();
  },

  onCommandColumnClick: function (btn, event) {
    var me = this,
      command = btn.command,
      grid = me.getView().down('grid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);
    if (command == 'Update') {
      me._openUpdateDialog(record);
    } else if (command == 'Cancel') {
      me.cancelPurchasePayment(record);
    }
  },
  refreshGrid: function () {
    var me = this;
    me.onButtonSearchClick();
  },
  /**
   * 取消
   */
  cancelPurchasePayment: function (record) {
    var me = this;
    Ext.MessageBox.confirm('提示', '确认取消？', function (option) {
      if (option === 'yes') {
        Ext.Ajax.request({
          method: 'POST',
          url: '/api/purchase/payment/cancel/' + record.id,
          success: function (request) {
            if (request.responseText) {
              var json = Ext.decode(request.responseText);
              if (json.success) {
                me.refreshGrid();
              } else {
                TipsUtil.showTips("错误", json.error.message || "服务器错误！");
              }
            }
          }
        });
      }
    });
  },

  /**
   * 查询
   * @param btn
   */
  onButtonSearchClick: function (btn) {
    var me = this;
    var viewModel = me.getViewModel();
    var form = Ext.ComponentQuery.query('form')[0];
    if (!form.isValid()) {
      Ext.MessageBox.alert("提示", "查询条件格式不正确.");
      return;
    }
    var formData = form.getValues();
    var store = viewModel.get('gridStore');
    for (var key in formData) {
      var data = formData[key];
      if (!data || data == -1) {
        delete formData[key];
      }
    }
    store.getProxy().extraParams = formData;
    store.load();
  },

  /**
   * 清空
   * @param btn
   */
  onButtonClearClick: function (btn) {
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var form = Ext.ComponentQuery.query('form')[0];
    form.reset();

    var store = viewModel.get('gridStore');
    store.getProxy().extraParams = {};
    store.loadPage(1);
  },

  onTableItemDblClick: function (dataview, record, item, index, e, eOpts) {
    this._openUpdateDialog(record);
  },
  onSelectionChange: function (dataview, selected, eOpts) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore('paymentLineStore');

    if (selected.length == 0) {
      store.removeAll();
    } else if (selected.length == 1) {
      var record = selected[0];
      var paymentId = record.get("id");
      if (paymentId) {
        var paymentMethodName = record.get('paymentMethodName');
        store.load({params: {paymentId: paymentId}, callback: function(records) {
          Ext.each(records, function(record) {
            record.set("paymentMethodName", paymentMethodName);
          });
        }});
      }
    }
  },
  _openUpdateDialog: function (record) {
    if (record.get("status") != 'DRAFT') {
      return;
    }
    var me = this;
    var grid = me.getView().down('grid');
    me.__openWindow({isEdit: true, record: record})
  },
  __openWindow: function (option) {
    var me = this;
    var option = option || {};
    var stWindow = Ext.create('PurchasePayment.view.PurchasePaymentDialog', {
      callback: Ext.bind(me.refreshGrid, me),
    });
    var stViewModel = stWindow.getViewModel();
    var form = stWindow.down('form');
    form.reset({resetRecord : true});
    if (option.isEdit && option.record.id) {
      stViewModel.set('isEdit', true);
      stViewModel.set('paymentId', option.record.id);

      /* form.loadRecord(option.record);*/
      stWindow.getController().initPage();
    } else {
    }
    stWindow.show();
  }
});