Ext.define('ProductRecycled.model.MainViewportGridModel', {
  extend: 'Ext.data.Model',

  requires: [
      'Ext.data.field.Field'
  ],

  /*fields: [
    'id', 'companyId', 'productcode',
    'productname', 'productcatid', 'productbrandid',
    'productoriginid', 'isspuogiented', 'isskusepcific',
    'status', 'createby',
    'createdate', 'updateby',
    'updatedate'
  ]*/
  idProperty:'skuId',
  fields: [
    {
      name: 'skuId'
    },
    {
      name: 'productCode'
    },
    {
      name: 'skuCode'
    },
    {
      name: 'skuName'
    },
    {
      name: 'barCode'
    },
    {
      name: 'productCatName'
    },
    {
      name: 'productOriginName'
    },
    {
      name: 'productBrandName'
    },
    {
      name: 'weight'
    },
    {
      name: 'size'
    },
    {
      name: 'unit'
    },
    {
      name: 'purchaseUnit'
    },
    {
      name: 'proportion'
    },
    {
      name: 'createDate',
      type: 'date',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      name: 'updateDate',
      type: 'date',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      name: 'updateBy'
    },
    {
      name:'status'
    }
  ]
});