/**
 * Created by Junyi on 2016/7/26.
 */
Ext.define('PurchasePayment.view.PurchasePaymentDialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.purchasepaymentdialog',

  requires: [
    'Common.store.UserDefinedStore',
    'PurchasePayment.store.PurchasePaymentTypeStore',
    'PurchasePayment.store.PurchasePaymentStatusStore',
    'PurchasePayment.store.PurchasePaymentLineStore'
  ],
  data: {
    supplierId: null,
    paymentType: null,
    paymentMethodId:null,
    totalFee: null,
    memo: null
  },
  stores: {
    supplierStore: {
      type: 'commonsupplierstore',
      autoLoad: true
    },
    typeStore: {
      type: 'purchasepaymenttypestore'
    },
    paymentMethodStore: {
      type: 'userdefinedstore',
      proxy: {
        api: {
          save: '/api/purchase/payment/method/save',
          read: '/api/purchase/payment/method/list'
          //create  : '/api/inventory/goods/issue/type/add',
          //update  : '/api/inventory/goods/issue/type/update',
          //destroy : '/api/inventory/goods/issue/type/delete'
        },
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    },
    paymentLineStore: {
      type: 'purchasepaymentlinestore',
      calc: function(amoutPaySumField) {
        var store = this,
          sum = 0;
        store.each(function(record) {
          sum += (record.get('paymentAmount') || 0);
        });
        amoutPaySumField.setValue(sum);
      }
    }
  }
});