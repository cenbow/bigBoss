Ext.define('GoodsReceipt.model.ReceiptDetailGridModel', {
  extend: 'Ext.data.Model',

  requires: [
      'Ext.data.field.Field'
  ],
  idProperty: 'skuId',
  fields: [
	{
      type: 'int',
      name: 'id'
    },
    {
      type: 'int',
      name: 'receiptId'
    },
    {
      type: 'int',
      name: 'whsId'
    },
    {
      type: 'string',
      name: 'whsName'
    },
    {
      type: 'int',
      name: 'whsAreaId'
    },
    {
      type: 'string',
      name: 'whsAreaName'
    },
    {
      type: 'string',
      name: 'whsPickLoc'
    },
    {
      type: 'int',
      name: 'skuId'
    },
    {
      type: 'string',
      name: 'skuCode'
    },
    {
      type: 'string',
      name: 'skuName'
    },
    {
      type: 'string',
      name: 'productCode'
    },
    {
      type: 'string',
      name: 'productName'
    },
    {
      type: 'string',
      name: 'purchaseUnit'
    },
    {
      type: 'int',
      name: 'proportion'
    },
    {
      type: 'int',
      name: 'purchaseQty'
    },
    {
      type: 'string',
      name: 'unit'
    },
    {
      type: 'int',
      name: 'quantity'
    },
    {
      type: 'number',
      name: 'price'
    },
    {
      type: 'number',
      name: 'lineTotal'
    },
    {
      type: 'string',
      name: 'memo'
    },
    {
      type: 'number',
      name: 'stockPrice'
    }
  ]
});