/*
 * File: app/view/WhsWindowViewModel.js
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

Ext.define('ExpressMgmt.view.WhsChooseWindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.whschoosewindow',
  requires: [
    'Common.store.CommonWhsStore'
  ],


  data: {
    gridStore: null,
    logisticsId: null,
    logisticsName: null
  },
  stores: {
    whsStore: {
      type: 'commonwhsstore',
      autoLoad: true
    }
  }

});