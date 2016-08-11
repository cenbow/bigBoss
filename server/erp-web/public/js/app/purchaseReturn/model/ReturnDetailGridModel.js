Ext.define('PurchaseReturn.model.ReturnDetailGridModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],  
  idProperty: 'purchaseOrderLineId',
  fields: [
	{
      type: 'int',
      name: 'id'
    },
    {
      type: 'int',
      name: 'purchaseReturnId'
    },
    {
      type: 'int',
      name: 'purchaseOrderId'
    },
    {
      type: 'string',
      name: 'purchaseOrderNo'
    },
    {
      type: 'int',
      name: 'purchaseOrderLineId'
    },
    {
      type: 'string',
      name: 'type'
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
      type: 'int',
      name: 'totalStockQty' //实际入库
    },
    {
      type: 'int',
      name: 'totalOverReceiptQty' //超收数量
    }
  ]
});