Ext.define('PurchasePayment.model.PurchasePaymentOrderModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],

  fields: [
    {
      type: 'int',
      name:'id'
    },
    {
      type: 'string',
      name: 'purchaseOrderNo'
    },
    {
      type: 'string',
      name: 'status'
    },
    {
      type: 'string',
      name: 'statusDesc'
    },
    {
      type: 'string',
      name: 'whsId'
    },
    {
      type: 'string',
      name: 'whsName'
    },
    {
      type: 'int',
      name: 'supplierId'
    },
    {
      type: 'string',
      name: 'supplierName'
    },
    {
      type: 'number',
      name: 'totalPurchaseQty'
    },
    {
      type: 'number',
      name: 'totalReceiptQty'
    },
    {
      type: 'number',
      name: 'totalStockQty'
    },
    {
      type: 'number',
      name: 'totalReturnExcgQty'
    },
    {
      type: 'number',
      name: 'totalReturnRefundQty'
    },
    {
      type: 'number',
      name: 'totalLossQty'
    },
    {
      type: 'number',
      name: 'totalReturnQty'
    },
    {
      type: 'number',
      name: 'totalRemainingQty'
    },
    {
      type: 'float',
      name: 'receivedDiscount'
    },
    {
      type: 'date',
      name: 'expectedReceiptDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'float',
      name: 'totalPurchaseFee'
    },
    {
      type: 'float',
      name: 'totalReceiptFee'
    },
    {
      type: 'float',
      name: 'totalPaidFee'
    },
    {
      type: 'date',
      name: 'createDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'date',
      name: 'updateDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'string',
      name: 'createByName'
    },
    {
      type: 'string',
      name: 'memo'
    }
  ]
});