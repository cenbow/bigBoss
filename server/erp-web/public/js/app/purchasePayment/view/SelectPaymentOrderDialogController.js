/**
 * Created by Junyi on 2016/7/26.
 */
Ext.define('PurchasePayment.view.SelectPaymentOrderDialogController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.selectpaymentorderdialog',

  requires: [],

  initPage: function() {
    var me = this;
    var viewModel = me.getViewModel();
    var supplierId = viewModel.get('supplierId');
    var paymentOrderStore = viewModel.getStore('selectPaymentOrderStore');
    paymentOrderStore.getProxy().setExtraParam('supplierId', supplierId);
    paymentOrderStore.load();
  },
  /**
   * 添加并继续
   */
  onButtonAddClick: function (button, e, eOpts) {
    var me = this;
    var view = me.getView();
    var grid = view.down('grid');
    var selections = grid.getSelectionModel().getSelection();
    if (selections && selections.length) {
      var arr = [];
      Ext.each(selections, function (selection) {
        arr.push(selection.getData());
      });
      view.callback(arr);
    } else {
      TipsUtil.showTips('提示', '请选择至少一件商品')
    }
  },

  /**
   *添加并结束
   */
  onButtonAddCloseClick: function () {
    this.onButtonAddClick();
    this.getView().close();
  },
  /**
   * 关闭
   */
  onButtonCloseClick: function (button, e, eOpts) {
    var viewCtr = this;
    viewCtr.getView().close();
  },


  /**
   * 快速搜索
   */
  onFastQueryButtonClick: function (button, trigger, e) {
    var me = this;
    var viewModel = me.getViewModel();
    var paymentOrderStore = viewModel.getStore('selectPaymentOrderStore');
    var text = button.getValue();
    paymentOrderStore.getProxy().setExtraParam('purchaseOrderNo', text);
    paymentOrderStore.load();
  },

  /**
   * 回车快速搜索
   * @param field
   * @param e
   */
  onEnterKey: function (field, e) {
    if (e.getKey() == Ext.EventObject.ENTER) {
      this.onFastQueryButtonClick(field);
    }
  },
});