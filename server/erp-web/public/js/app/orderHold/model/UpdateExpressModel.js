/**
 * Created by Junyi on 2016/8/4.
 */

Ext.define('OrderHold.model.UpdateExpressModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.String',
    'Ext.data.field.Date'
  ],

  fields: [
    {
      type: 'string',
      name: 'code'
    },
    {
      type: 'string',
      name: 'name'
    }
  ]
});