/*
 * File: app/view/SelectAddEditProductMenuViewModel.js
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

Ext.define('ProductMgmt.view.CategoryInfoDialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.categoryinfodialog',
  requires: [
    'ProductMgmt.store.CommonComboboxStore'
  ],

  data: {
    addFlag: null,
    parentId: null,
    formData: {},
    referController: null
  },

  formulas: {
    disabledIsParent: function (get) {
      return !get('addFlag');
    },
    disabledCustomsCatId: function (get) {
      return get('formData.isParent');
    }
  },

  stores: {
    customCatStore: {
      type: 'productmgmt.commoncomboboxstore',
      autoLoad: true,
      url: '/api/product/category/list/custom'
    }
  }

});