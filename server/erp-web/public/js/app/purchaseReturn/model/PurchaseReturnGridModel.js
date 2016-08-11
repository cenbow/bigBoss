Ext.define('PurchaseReturn.model.PurchaseReturnGridModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],
  idProperty: 'baseId',
  fields: [
	{
      type: 'int',
      name: 'baseId'
    },
    {
      type: 'int',
      name: 'companyId'
    },
    {
      type: 'string',
      name: 'baseNo'  /*退货单号*/
    },
    {
      type: 'string',
      name: 'purchaseOrderNo'  /*采购单号*/
    },
    {
      type: 'string',
      name: 'type'
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
      type: 'int',
      name: 'supplierId'
    },
    {
      type: 'string',
      name: 'supplierName'
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
      name: 'memo'
    },
    {
      type: 'date',
      name: 'postDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'int',
      name: 'createBy'
    },
    {
      type: 'string',
      name: 'createByName'
    },
    {
      type: 'date',
      name: 'createDate',
      convert: function (value) {
    	  return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'int',
      name: 'updateBy'
    },
    {
      type: 'string',
      name: 'updateByName'
    },
    {
      type: 'date',
      name: 'updateDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    }
  ]
});