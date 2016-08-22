/*
 * File: app/store/CompanyMgmtBranchComboStore.js
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

Ext.define('CompanyMgmt.store.RoleComboboxStore', {
  extend: 'Ext.data.ArrayStore',
  alias: 'store.rolecomboboxstore',

  requires: [
    'CompanyMgmt.model.RoleComboboxModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId:'RoleComboboxStore',
      //model: 'CompanyMgmt.model.RoleComboboxModel',
      fields:['key','value'],
      data: [
        {
          type: '0001',
          value: '超级管理员'
        },
        {
          type: '0002',
          value: '普通管理员'
        },
        {
          type: '0003',
          value: '普通用户'
        }
      ],
      proxy: {
        type: 'ajax',
        reader: {
          type: 'array'
        }
      }
      /*proxy: {
        type: 'ajax',
        url: '/api/general/role/related/filter',
        extraParams: {
          //type: cfg.comboxType
        },
        api: {
          create  : "/api/general/role/related/add",
          read    : "/api/general/role/related/filter",
          update  : "/api/general/role/related/update",
          destroy : "/api/general/role/related/delete"
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