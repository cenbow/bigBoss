/*
 * File: app/store/NoticeShowMgmtBranchComboStore.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('NoticeShowMgmt.store.CategoryComboboxStore', {
  extend: 'Ext.data.ArrayStore',
  alias: 'store.categorycomboboxstore',

  requires: [
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId:'CategoryComboboxStore',
      fields:['key','value'],
      autoLoad:true,
      proxy: {
        url: FACADE_URL+'/category/listByColumnCode1',
        type: 'ajax',
        extraParams:{
          code:'0004'
        },
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }

    }, cfg)]);
  }
});