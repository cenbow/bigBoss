/**
 * Created by Junyi on 2016/8/8.
 */
Ext.define('CustomerMgmt.store.DocumentTypeStore', {
  extend: 'Ext.data.Store',
  alias: 'store.documenttypestore',

  requires: [
    'CustomerMgmt.model.CommonComboboxModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'CustomerMgmt.model.CommonComboboxModel',
      data: [
        {
          name: '身份证',
          code: 'ID_CARD'
        },
        {
          name: '护照',
          code: 'PASSPORT'
        },
        {
          name:'军官证',
          code:'OFFICER'
        },
        {
          name:'其他',
          code:'OTHER'
        }
      ]
    }, cfg)]);
  }
});