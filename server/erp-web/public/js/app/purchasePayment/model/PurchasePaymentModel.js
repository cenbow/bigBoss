Ext.define('PurchasePayment.model.PurchasePaymentModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],

  fields: [
    {
      type: 'int',
      name: 'id'
    },
    {
      type: 'string',
      name: 'paymentNo'
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
      type: 'int',
      name: 'supplierId'
    },
    {
      type: 'string',
      name: 'paymentType'
    },
    {
      type: 'string',
      name: 'paymentTypeDesc'
    },
    {
      type: 'string',
      name: 'paymentMethod'
    },
    {
      type: 'string',
      name: 'paymentMethodName'
    },
    {
      type: 'number',
      name: 'totalFee'
    },
    {
      type: 'date',
      name: 'postDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      name: 'updateBy'
    },
    {
      name: 'memo'
    }
  ]
});