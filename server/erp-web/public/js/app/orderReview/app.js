/*
 * File: app.js
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

// @require @packageOverrides
Ext.require([
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom',
  'Common.overrides.GridHeaderContainer',
  'Common.overrides.GridFeatureGrouping',
  'Common.Constant',
  'Common.util.TipsUtil'
]);


Ext.application({
  models: [],
  stores: [],
  views: [
    'MainViewport'
  ],
  name: 'OrderReview',
  appFolder: "js/app/orderReview",

  launch: function () {
    Ext.create('OrderReview.view.MainViewport');
  }

});
