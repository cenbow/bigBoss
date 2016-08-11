/*
 * File: app/view/MyViewportViewModel.js
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

Ext.define('ExpressMgmt.view.MyViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.myviewport',
  requires: [
    'ExpressMgmt.store.LogisticsStore'
  ],
  data: {
    gridStore: null
  },
  stores: {
    logisticsstore: {
      type: 'logisticsstore',
      autoLoad: true,
      autoSync: true
    }
  }
});