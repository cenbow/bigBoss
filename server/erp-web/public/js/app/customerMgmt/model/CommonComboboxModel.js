/**
 * Created by Junyi on 2016/8/5.
 */
Ext.define('CustomerMgmt.model.CommonComboboxModel', {
  extend: 'Ext.data.Model',

  fields: [
    {
      name: 'id', mapping: 'id'
    },
    {
      name: 'name', mapping: 'name'
    }
  ]
});