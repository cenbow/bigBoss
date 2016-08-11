/**
 * Created by Junyi on 2016/7/28.
 */
Ext.define('PurchasePayment.model.PurchasePaymentLineModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Integer',
    'Ext.data.field.String'
  ],
  idProperty: 'purchaseOrderId',
  field: [
    {
      type: 'string',
      name: 'purchaseOrderNo'
    },
    {
      type: 'number',
      name: 'totalPurchaseFee'
    },
    {
      type: 'number',
      name: 'totalReceiptFee'
    },
    {
      type: 'number',
      name: 'totalPaidFee'
    },
    {
      name: 'memo'
    }
  ]

})