/*
 * File: app/model/CustomsInfoQualifiedModel.js
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

Ext.define('Common.model.order.TabReceiveGoodsInfoFormModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Integer',
    'Ext.data.field.String',
    'Ext.data.field.Date',
    'Common.ux.FormUrlencodedWriter'
  ],
  identifier: 'negative',

  fields: [
    {
      type: 'int',
      name: 'parentId'
    },
    {
      type: 'int',
      name: 'id'
    },
    {
      type: 'string',
      name: 'A01'
    },
    {
      type: 'string',
      name: 'A02'
    },
    {
      type: 'string',
      name: 'A03'
    },
    {
      type: 'string',
      name: 'A04'
    },
    {
      type: 'string',
      name: 'A05'
    },
    {
      type: 'string',
      name: 'A06'
    },
    {
      type: 'string',
      name: 'A07'
    },
    {
      type: 'string',
      name: 'A08'
    },
    {
      type: 'string',
      name: 'A09'
    },
    {
      type: 'string',
      name: 'A10'
    },
    {
      type: 'string',
      name: 'A11',
      defaultValue: 1
    },
    {
      type: 'string',
      name: 'A12'
    }
  ],

  proxy: {
    type: 'ajax',
    actionMethods: {
      create: 'POST', read: 'GET', update: 'POST', destroy: 'GET'
    },
    api: {
      create: '/api/order/reveive/goods/save',
      update: '/api/order/reveive/goods/save'
    },
    writer: {
      type: 'formurlencoded',
      writeAllFields: true
    }
  }
});