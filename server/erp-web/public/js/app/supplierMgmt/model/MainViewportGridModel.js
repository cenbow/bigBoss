Ext.define('SupplierMgmt.model.MainViewportGridModel', {
  extend: 'Ext.data.Model',

  requires: [
      'Ext.data.field.Field'
  ],
         
  fields: [
	{
	  name: 'activeFlag'
	},
    {
      name: 'code'
    },
    {
      name: 'name'
    },
    {
      name: 'coopStartTime'
    },
    {
      name: 'contactName'
    },
    {
      name: 'contactPhone'
    },
    {
      name: 'bankName'
    },
    {
      name: 'bankAccount'
    },
    {
      name: 'provinceName'
    },
    {
      name: 'cityName'
    },
    {
      name: 'districtName'
    },
    {
      name: 'zipCode'
    },
    {
      name: 'address'
    },
    {
      name: 'produceCat'
    },
    {
      name: 'produceItems'
    },
    {
      name: 'memo'
    }
  ]
});