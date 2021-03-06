/*
 * File: app/model/SalePlatformModel.js
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

Ext.define('ProductMgmt.model.SalesPlatformModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],

  fields: [
    {
      name: 'id'
    },
    {
      name: 'skuId'
    },
    {
      name: 'platform'
    },
    {
      name: 'property'
    },
    {
      name: 'createDate'
    }
  ],

  validations: {
    platform: [
      {type: "presence", message: "请选择分销平台"}
    ],
    property: [
      {type: "presence", message: "请填写平台规格编码"},
      {type: "length", max: 100, maxOnlyMessage: "规格名称长度控制在100个字符内"}
    ]
  }
});