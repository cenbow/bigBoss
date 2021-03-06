/*
 * File: app/model/SkuModel.js
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

Ext.define('ProductMgmt.model.ProductInfoDialogGridModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],

  fields: [
    //'id','companyId',
    //'productId','skuCode',
    //'upperSkuCode','skuName',
    //'property','barCode','upperBarCode','status',
    //'salePrice','marketPrice',
    //'unit','purchaseUnit',
    //'proportion','size',
    //'weight','createBy',
    //'createDate','updateBy',
    //'updateDate','companyId'
    'id', 'companyId',
    'productId',
    'skuCode', 'upperSkuCode',
    'skuName', 'property',
    'barCode', 'upperBarCode',
    'status', 'salePrice',
    'marketPrice', 'unit',
    'purchaseUnit', 'proportion',
    'size', 'weight',
    'createBy', 'createDate',
    'updateBy', 'updateDate',
    'isFromDb'
  ],
  validations: {
    skuCode: [
      {type: "presence", message: "请填写规格编码"},
      {type: "length", max: 50, maxOnlyMessage: "规格编码长度50个字符内"}
    ],
    skuName: [
      {type: "presence", message: "请填写规格名称"},
      {type: "length", max: 100, maxOnlyMessage: "规格名称长度控制在100个字符内"}
    ],
    barCode: [
      {type: "length", max: 100, maxOnlyMessage: "条形码长度控制在100个字符内"}
    ],
    property: [
      {type: "length", max: 100, maxOnlyMessage: "规格属性长度控制在100个字符内"}
    ],
    salePrice: [
      {type: "presence", message: "请填写销售价"},
      {type: "range", min: 0, max: 100000, bothMessage: "销售价应在{0}~{1}之间"}
    ],
    marketPrice: [
      {type: "presence", message: "请填写市场参考价"},
      {type: "range", min: 0, max: 100000, bothMessage: "市场参考价应在{0}~{1}之间"}
    ],
    weight: [
      {type: "presence", message: "请填写计费重量(kg)"},
      {type: "range", min: 0, max: 100000, bothMessage: "计费重量应在{0}~{1}之间"}
    ],
    size: [
      {type: "presence", message: "请填写体积(m3)"},
      {type: "range", min: 0, max: 100000, bothMessage: "体积应在{0}~{1}之间"}
    ],
    unit: [
      {type: "length", max: 20, maxOnlyMessage: "计量单位长度控制在20个字符内"}
    ],
    purchaseUnit: [
      {type: "length", max: 20,  maxOnlyMessage: "采购单位长度控制在20个字符内"}
    ],
    proportion: [
      {type: "presence", message: "请填写比例"},
      {type: "range", min: 0, max: 100000, bothMessage: "比例应在{0}~{1}之间"}
    ]
  }
});
