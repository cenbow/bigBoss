Ext.define('Common.model.ProductSkuModel', {
  extend: 'Ext.data.Model',
  alias: 'model.productskumodel',

  requires: [
    'Ext.data.field.String'
  ],
  idProperty: 'skuId',
  fields: [
    {
      type: 'int',
      name: 'skuId'
    },
    {
      type: 'int',
      name: 'productId'
    },
    {
      type: 'string',
      name: 'skuCode'
    },
    {
      type: 'string',
      name: 'upperSkuCode'
    },
    {
      type: 'string',
      name: 'skuName'
    },
    {
      type: 'string',
      name: 'property'
    },
    {
      type: 'string',
      name: 'barCode'
    },
    {
      type: 'string',
      name: 'upperBarCode'
    },
    {
      type: 'string',
      name: 'status'
    },
    {
      type: 'string',
      name: 'statusName'
    },
    {
      type: 'float',
      name: 'salePrice'
    },
    {
      type: 'float',
      name: 'marketPrice'
    },
    {
      type: 'string',
      name: 'unit'
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
      type: 'float',
      name: 'size'
    },
    {
      type: 'float',
      name: 'weight'
    }
    ,
    {
      type: 'int',
      name: 'quantity'
    },
    {
      type: 'string',
      name: 'productCatName'
    },
    {
      type: 'string',
      name: 'productOriginName'
    },
    {
      type: 'string',
      name: 'productBrandName'
    }
  ]
});