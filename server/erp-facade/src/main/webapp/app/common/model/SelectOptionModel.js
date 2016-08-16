Ext.define('Common.model.SelectOptionModel', {
  extend: 'Ext.data.Model',
  alias: 'model.selectoptionmodel',

  requires: [
    'Ext.data.field.String'
  ],

  fields: [
    {
      type: 'int',
      name: 'id'
    },
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