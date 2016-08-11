/**
 * Created by Junyi on 2016/7/26.
 */
Ext.define('PurchasePayment.view.MainViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.mainviewport',
  requires: [
    'Common.store.CommonSupplierStore',
    'PurchasePayment.store.PurchasePaymentTypeStore',
    'PurchasePayment.store.PurchasePaymentStatusStore',
    'PurchasePayment.store.PurchasePaymentLineStore',
  ],
  data: {},
  stores: {
    gridStore: {
      type: 'mainviewportgridstore',
      autoLoad: true
    },
    supplierStore: {
      type: 'commonsupplierstore',
      autoLoad: true
    },
    statusStore: {
      type: 'purchasepaymentstatusstore'
    },
    typeStore: {
      type: 'purchasepaymenttypestore'
    },
    paymentLineStore: {
      type: 'purchasepaymentlinestore'
    }
  }

});