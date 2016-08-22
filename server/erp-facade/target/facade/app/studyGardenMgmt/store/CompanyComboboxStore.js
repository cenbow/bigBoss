/*
 * File: app/store/AccountMgmtBranchComboStore.js
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

Ext.define('StudyGardenMgmt.store.CompanyComboboxStore', {
  extend: 'Ext.data.ArrayStore',
  alias: 'store.companycomboboxstore',

  requires: [
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json',
    'StudyGardenMgmt.model.CompanyComboboxModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId:'CompanyComboboxStore',
      //model: 'AccountMgmt.model.CompanyComboboxModel',

      fields:['key','value'],
      proxy: {
        url: FACADE_URL+'/company/list',
        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
      /*proxy: {
        type: 'ajax',
        url: '/api/general/company/related/filter',
        extraParams: {
          //type: cfg.comboxType
        },
        api: {
          create  : "/api/general/company/related/add",
          read    : "/api/general/company/related/filter",
          update  : "/api/general/company/related/update",
          destroy : "/api/general/company/related/delete"
        },
        reader: {
          type: 'json',
          rootProperty: 'data'
        },
        headers: {
          "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
        },
        writer: {
          type: 'json',
          transform: {
            fn: function(data, request) {
              return Ext.Object.toQueryString(data);
            },
            scope: this
          }
        }
      }*/
    }, cfg)]);
  }
});