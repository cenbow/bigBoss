/*
 * File: app/model/MarketInfoMgmtGridModel.js
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

Ext.define('MarketInfoMgmt.model.MainViewportGridModel', {
  extend: 'Ext.data.Model',

  fields: [
    {
      name: 'id'
    },
    {
      name: 'name'
    },
    {
      name: 'levelOne'
    },
    {
      name: 'levelTwo'
    },
    {
      name: 'status'
    },
    {
      type: 'date',
      name: 'publishDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      name: 'createBy'
    },
    {
      name: 'createName'
    },
    {
      type: 'date',
      name: 'createDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      name: 'companyName'
    },
    {
      name: 'companyCode'
    },
    {
      name: 'columnId'
    },
    {
      name: 'url'
    }
  ]
});