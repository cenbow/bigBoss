/*
 * File: app/view/MyWindowViewModel.js
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

Ext.define('CompanySetting.view.MainWindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.mainwindow',

  requires: [
    'CompanySetting.store.ServiceJudgeListStore',
    'CompanySetting.store.FinancialJudgeListStore',
    'CompanySetting.store.DeliverTypeListStore'
  ],

  data: {
    formData: {
      orderReviewType: "",
      deliverWeighWarn: "",
      orderFinancialReviewType: "",
      orderRefundMaxPct: '',
      deliverType: '',
      deliverExamineOmniBarcode: '',
      deliverWeighWarnLimit: ''
    }
  },

  formulas: {
    disabledServiceJudge: function (get) {
      return get('formData.orderReviewType') != "REVIEW_ON_DEMAND";
    },
    disabledDeliverWeightWarnLimit: function (get) {
      return !get('formData.deliverWeighWarn');
    },
    disabledFinancialJudge: function (get) {
      return get('formData.orderFinancialReviewType') == 'REVIEW_NONE' || get('formData.orderFinancialReviewType') == null;
    }
  },

  stores: {
    serviceJudgeListStore: {
      type: 'companysetting.servicejudgeliststore',
      autoLoad: true
    },
    financialjudgeliststore: {
      type: 'companysetting.financialjudgeliststore',
      autoLoad: true
    },
    delivertypeliststore: {
      type: 'companysetting.delivertypeliststore',
      autoLoad: true
    }
  }
})
;