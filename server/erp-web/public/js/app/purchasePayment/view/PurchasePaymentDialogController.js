/**
 * Created by Junyi on 216/7/26.
 */
Ext.define('PurchasePayment.view.PurchasePaymentDialogController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.purchasepaymentdialog',

  requires: [],
  init: function() {
    var me = this, viewModel = me.getViewModel();
    var store = viewModel.getStore('paymentLineStore');
    store.on('endupdate', function() {
      var form = me.getView().down('form');
      if(form) {
        var totalFee = form.down('#totalFee');
        store.calc(totalFee);
        var payType = form.getComponent('paymentType').getRawValue();
        var payMethod = form.getComponent('paymentMethod').getRawValue();
        store.each(function(record) {
          record.set('paymentTypeDesc', payType);
          record.set('paymentMethodName', payMethod);
        })
      }
    })
  },
  initPage: function () {
    var me = this;
    var viewModel = me.getViewModel();
    var paymentId = viewModel.get("paymentId");
    Ext.Ajax.request({
      method: 'GET',
      url: '/api/purchase/payment/view/' + paymentId,
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (json.success) {
            viewModel.set(json.data);
          } else {
            TipsUtil.showTips("错误", json.error.message || "服务器错误！");
          }
        }
      }
    });
    /* var supplierStore = viewModel.getStore("supplierStore");
     Ext.create('Common.ux.StoreLoadCoordinator', {
     stores: [supplierStore],
     listeners: {
     load: function () {
     var lineStore = viewModel.getStore('paymentLineStore');
     lineStore.load({params: {paymentId: paymentId}});
     }
     }
     });*/

    var lineStore = viewModel.getStore('paymentLineStore');
    lineStore.load({params: {paymentId: paymentId}, callback: function(records) {
      Ext.each(records, function(record) {
        Ext.Ajax.request({
          method: 'GET',
          url: '/api/purchase/payment/order/view/'+record.get('purchaseOrderNo'),
          success: function (request) {
            if (request.responseText) {
              var json = Ext.decode(request.responseText);
              if (json.success && json.data && json.data.result && json.data.result.length) {
                var purchaseOrder = json.data.result[0];
                record.set('totalPurchaseFee', purchaseOrder.totalPurchaseFee);
                record.set('totalReceiptFee', purchaseOrder.totalReceiptFee);
                record.set('totalPaidFee', purchaseOrder.totalPaidFee);
              }
            }
          }
        });
      })
    }});
  },
  /**
   * 打开二级页面
   */
  onButtonLineAddClick: function () {
    // Ext.create('PurchasePayment.view.SelectPaymentOrderDialog').show();
    var me = this;
    me._openChooseDialog();
  },

  _openChooseDialog: function () {

    var form = Ext.getCmp('paymentForm');
    var supplierId = form.getComponent('supplier').getValue();
    if(!supplierId || supplierId === -1) {
      Ext.MessageBox.alert("提示", "请选择供应商");
      return;
    }

    var me = this;
    var view = me.getView();
    var vm = me.getViewModel();
    var orderChoose = Ext.create('PurchasePayment.view.SelectPaymentOrderDialog', {
      parent: view,
      callback: Ext.bind(me.getRecords, me)
    });
    var viewModel = orderChoose.getViewModel();
    viewModel.set('supplierId', supplierId);
   /* var viewModel = orderChoose.getViewModel();
    var gridStore = viewModel.getStore("gridStore");
    var records =
    if (records && Array.isArray(records)) {
      Ext.each(records, function (record) {
        var model = new gridStore.model(record);
        gridStore.add(model);
      })
    } else {
      //gridStore.load();
    }*/
    orderChoose.getController().initPage();
    orderChoose.show();

  },
  /**
   * 从订单中选择回调
   * @param records
   */
  getRecords: function (datas) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.get("paymentLineStore");

    var form = Ext.getCmp('paymentForm');
    var payType = form.getComponent('paymentType').getValue();

    var records = [];
    Ext.each(datas, function(data) {
      var record = new store.model();
      record.set('totalPurchaseFee', data.totalPurchaseFee);
      record.set('totalReceiptFee', data.totalReceiptFee);
      record.set('totalPaidFee', data.totalPaidFee);


      record.set('purchaseOrderId', data.id);
      record.set('purchaseOrderNo', data.purchaseOrderNo);

     /* record.set("paymentTypeDesc", payType);
      record.set("paymentMethodName", payMethod);*/

      var totalFee = data.totalPurchaseFee;
      var paidFee = data.totalPaidFee;
      record.set('paymentAmount', 0);
      if(payType === 'PAY') {
        record.set('paymentAmount', totalFee - paidFee);
      }
      record.set('discountAmount', 0);
      me.getLineTotal(record);
      records.push(record);
    });
    store.add(records);
  },

  onPaymentTypeChange: function () {
    var me = this;

    var form = Ext.getCmp('paymentForm');
    var payType = form.getComponent('paymentType').getRawValue();
    var payMethod = form.getComponent('paymentMethod').getRawValue();

    var store = me.getView().down('grid').store;
    store.queryBy(function(record) {
      record.set("paymentTypeDesc", payType);
      record.set("paymentMethodName", payMethod);
      me.getLineTotal(record);
    })
  },

  editRow: function() {
    var me = this, view = me.getView();
    var grid = view.down('grid'), selection = grid.getSelectionModel().getSelection();
    if(selection && selection.length) {
      var record = selection[0];
      me.getLineTotal(record);
    }
  },
  getLineTotal: function (record) {
    var paymentAmount = record.get('paymentAmount');
    var discountAmount = record.get('discountAmount') || 0;
    if(Ext.isNumber(paymentAmount) && Ext.isNumber(discountAmount)) {

      var form = Ext.getCmp('paymentForm');
      var payType = form.getComponent('paymentType').getValue();

      var paidFee = paymentAmount + discountAmount;
      if(payType === 'REFUND') {
        paidFee = -paidFee;
      }
      record.set('paidFee', paidFee);
    }
  },

  /**
   * btn-group的动作进行
   * @param btn
   * @param event
   */
  onCommandColumnClick: function (btn, event) {
    var viewCtr = this,
      command = btn.command,
      grid = viewCtr.getView().down('grid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'Delete') {
      viewCtr._deleteRecord(record);
    }
  },

  /**
   * 删除库存调拨里的sku
   * @param record
   * @private
   */
  _deleteRecord: function (record) {
    var store = this.getView().down('grid').store;
    var viewCtr = this;
    Ext.MessageBox.confirm('提示', '确认删除？', function (option) {
      if (option === 'yes') {
        store.remove(record);
      }
    })
  },
  /**
   * 统一获取提交数据
   * @returns {*}
   * @private
   */
  _dataForSubmit: function () {
    var me = this;
    var form = me.getView().down('form');
    if (!form.isValid()) {
      return false;
    }

    var viewModel = me.getViewModel();
    var store = viewModel.getStore("paymentLineStore");
    if (store.getCount() == 0) {
      TipsUtil.showTips("提示", "缺少商品信息");
      return false;
    }
    var payment = form.getValues() || {};

    if (!payment.postDate) {
      delete payment.postDate;
    }
    var lines = store.getRange();
    var lineArr = [];

    var paymentTypeCmp = form.getComponent('paymentType');
    var payMethodCmp = form.getComponent('paymentMethod');

    var paymentType = paymentTypeCmp.getValue();
    var paymentMethodId = payMethodCmp.getValue();
    var paymentMethodName = payMethodCmp.getRawValue();

    payment.paymentType = paymentType;
    payment.paymentMethodId = paymentMethodId;
    payment.paymentMethodName = paymentMethodName;
    var lineFail = false;
    Ext.each(lines, function (line) {
      line.set('paymentType', paymentType);
      line.set('paymentMethodId', paymentMethodId);
      line.set('paymentMethodName', paymentMethodName);

      var paymentAmount = line.get('paymentAmount');
      var discountAmount = line.get('discountAmount');
      if (isNaN(paymentAmount) || isNaN(discountAmount)) {
        TipsUtil.showTips("提示", "采购订单信息有误");
        lineFail = true;
        return false;
      }
      if(paymentAmount == 0 && discountAmount== 0) {
        TipsUtil.showTips("提示", "结款金额和折扣金额不能同时为0");
        lineFail = true;
        return false
      }

      var purchaseFee = line.get('totalPurchaseFee');
      var totalPaidFee = line.get('totalPaidFee');
      var paidFee = line.get('paidFee');
      if(paymentType === 'PAY') {
        if(paidFee > (purchaseFee - totalPaidFee)) {
          TipsUtil.showTips("错误", "结算金额超出范围！");
          lineFail = true;
          return false;
        }
      } else if(paymentType === 'REFUND'){
        if(paidFee > totalPaidFee) {
          TipsUtil.showTips("错误", "结算金额超出范围！");
          lineFail = true;
          return false;
        }
      }



      if (line.get('memo') && line.get('memo').length > 255) {
        TipsUtil.showTips("提示", "备注长度不能超过255个字符");
        lineFail = true;
        return false;
      }
      lineArr.push(line.getData())
    });
    if (lineFail) {
      return;
    }
    payment.lines = Ext.encode(lineArr);
    return payment;
  },
  /**
   * 保存至草稿
   */
  _submit: function (post) {
    var url = '/api/purchase/payment/' + (post === true ? 'post' : 'draft');
    var me = this;
    var view = me.getView();
    var stockTransfer = me._dataForSubmit();
    if (stockTransfer) {
      Ext.Ajax.request({
        method: 'POST',
        url: url,
        params: stockTransfer,
        success: function (request) {
          if (request.responseText) {
            var json = Ext.decode(request.responseText);
            if (json.success) {
              view.callback();
              view.close()
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      });
    }
  },
  onButtonSaveDraftClick: function () {
    var viewCtr = this;
    viewCtr._submit(false);
  },
  /**
   * 保存并结款
   */
  onButtonSavePostClick: function () {
    var viewCtr = this;
    viewCtr._submit(true);
  },
  /**
   * 取消本次结款
   */
  onButtonCancelClick: function () {
    var me = this;
    var view = me.getView();
    var form = view.down('form');
    var data = form.getValues();
    if (data.id) {
      Ext.MessageBox.confirm('提示', '确认取消？', function (option) {
        if (option === 'yes') {
          Ext.Ajax.request({
            method: 'POST',
            url: '/api/purchase/payment/cancel/' + data.id,
            success: function (request) {
              if (request.responseText) {
                var json = Ext.decode(request.responseText);
                if (json.success) {
                  view.callback();
                  view.close()
                } else {
                  TipsUtil.showTips("错误", json.error.message || "服务器错误！");
                }
              }
            }
          });
        }
      });
    } else {
      view.close()
    }
  },
  validateEdit: function(editor,cell, record){
    if(cell.field === 'paymentAmount') {
      var record = cell.record;
      if(record.get('paymentType') == 'PAY') {
        var avaliable = record.get('totalPurchaseFee') - record.get('totalPaidFee');
        if(cell.value > avaliable) {
          TipsUtil.showTips("错误", "结算金额超出范围！");
          return false;
        }
      } else if(record.get('paymentType') == 'REFUND'){
        if(cell.value > record.get('totalPaidFee')) {
          TipsUtil.showTips("错误", "结算金额超出范围！");
          return false;
        }
      }

    }
  },
  /**
   * 取消
   * @param button
   * @param e
   * @param eOpts
   */
  onButtonCloseClick: function (button, e, eOpts) {
    var viewCtr = this;

    viewCtr.getView().close();
  },
  onSupplierSelect: function() {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore('paymentLineStore');
    store.removeAll();
  }
});