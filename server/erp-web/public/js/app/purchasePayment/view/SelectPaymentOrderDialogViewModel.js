/**
 * Created by Junyi on 2016/7/26.
 */
Ext.define('PurchasePayment.view.SelectPaymentOrderDialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.selectpaymentorderdialog',


  requires: [
    'PurchasePayment.model.PurchasePaymentOrderModel'
  ],

  stores: {
    selectPaymentOrderStore: {
      //type: 'mainviewportgridstore',
      model: 'PurchasePayment.model.PurchasePaymentOrderModel',
      proxy: {
        type: 'ajax',
        url: '/api/purchase/payment/order/filter',
        extraParams: {
          status: 'PENDING_RECEIVE,PARTIALLY_RECEIVED,FULLY_RECEIVED'
        },
        reader: {
          type: 'json',
          rootProperty: 'data.result',
          startProperty: 'data.start',
          limitProperty: 'data.pageSize',
          totalProperty: 'data.totalCount'
        }
      }
    }
  }
});