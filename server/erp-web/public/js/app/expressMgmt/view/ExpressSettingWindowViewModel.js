/*
 * File: app/view/ExpressSettingWindowViewModel.js
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

Ext.define('ExpressMgmt.view.ExpressSettingWindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.expresssettingwindow',
  requires: [
    'ExpressMgmt.store.DeliveryLineStore'
  ],
  data: {
    gridStore: null,
    whsId: null,
    whsName: null,
    logisticsId: null,
    logisticsName: null,
    setTemplateBtnText: '设置模版',

   /* fieldLabel_1: '首重重量(g)',
    fieldLabel_2: '首重费用',
    fieldLabel_3: '续重重量(g)',
    fieldLabel_4: '续重费用',*/
    fieldLabel_1: null,
    fieldLabel_2: null,
    fieldLabel_3: null,
    fieldLabel_4: null,
    fee: {},
    /*BY_QUANTITY: {
      fieldLabel_1: '首件件数(件)',
      fieldLabel_2: '首件费用',
      fieldLabel_3: '续件件数(件)',
      fieldLabel_4: '续件费用'
    },*/
    BY_WEIGHT: {
      fieldLabel_1: '首重重量(g)',
      fieldLabel_2: '首重费用',
      fieldLabel_3: '续重重量(g)',
      fieldLabel_4: '续重费用'
    },
    BY_SIZE: {
      fieldLabel_1: '标准体积(平方米)',
      fieldLabel_2: '标准费用',
      fieldLabel_3: '增加体积(平方米)',
      fieldLabel_4: '增加费用'
    }

  },
  stores: {
    lineStore: {
      type: 'deliverylinestore'
    },
    valuationTypeStore: {
      fields: ['name', 'value'],
      data: [/*{
       name: '按件',
       value: 'BY_QUANTITY'
       },*/
        {
          name: '按重量',
          value: 'BY_WEIGHT'
        }, {
          name: '按体积',
          value: 'BY_SIZE'
        }]
    }
  }
});