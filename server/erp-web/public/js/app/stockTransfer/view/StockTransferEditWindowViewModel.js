/*
 * File: app/view/StockTransferEditWindowViewModel.js
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

Ext.define('StockTransfer.view.StockTransferEditWindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.stocktransfereditwindow',
  requires: [
    'Common.store.CommonWhsStore',
    'Common.store.CommonWhsAreaStore',
    'StockTransfer.store.StockTransferTypeStore',
    'StockTransfer.store.TransferDetailJsonStore'
  ],
  data: {
    fromWhsId: null,
    toWhsId: null,
    fromWhsAreaId: null,
    toWhsAreaId: null,
    type: null
  },
  stores: {
    fromWhsStore: {
      type: 'commonwhsstore',
      autoLoad: true
    },
    toWhsStore: {
      type: 'commonwhsstore',
      autoLoad: true
    },
    fromWhsAreaStore: {
      type: 'commonwhsareastore'
    },
    toWhsAreaStore: {
      type: 'commonwhsareastore'
    },
    stockTransferTypeStore: {
      type: 'stocktransfertypestore'
    },
    transferDetailStore: {
      type: 'transferdetailjsonstore'
    }
  }

});