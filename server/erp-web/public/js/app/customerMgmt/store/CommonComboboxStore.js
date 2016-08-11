/**
 * Created by Junyi on 2016/8/5.
 */
Ext.define('CustomerMgmt.store.CommonComboboxStore', {
  extend: 'Ext.data.Store',
  alias: 'store.commoncomboboxstore',

  requires: [
    'CustomerMgmt.model.CommonComboboxModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'CustomerMgmt.model.CommonComboboxModel'
    }, cfg)]);
  }
});