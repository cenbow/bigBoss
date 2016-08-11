Ext.define('ProductMgmt.model.MainViewportGridModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],

  fields: [
    {
      name: 'one'
    },
    {
      name: 'displayName',
      convert: function(v, record) {
        return record.get('productName') + ' (商品编码：' + record.get('productCode') + ')';
      }
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
      name: 'salePrice'
    },
    {
      name: 'marketPrice'
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
      name: 'updateByName'
    }
  ]
});