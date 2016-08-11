/**
 * Created by Junyi on 2016/7/28.
 */
Ext.define('PurchasePayment.model.SelectOptionModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],

  fields: [
    {
      name: 'id'
    },
    {
      name: 'name'
    }
  ]
});