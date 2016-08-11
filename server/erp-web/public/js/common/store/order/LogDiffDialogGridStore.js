/*
 * File: app/store/LogDiffDialogGridStore.js
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

Ext.define('Common.store.order.LogDiffDialogGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.order.logdiffdialoggridstore',

  requires: [
    'Common.model.order.LogDiffInfoQualifiedModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.order.LogDiffInfoQualifiedModel',
      data: [
        {
          A01: 'necessitatibus',
          A02: 'iusto',
          A03: 'est',
          A04: 'omnis',
          A05: 'eaque'
        },
        {
          A01: 'tempore',
          A02: 'neque',
          A03: 'sequi',
          A04: 'molestiae',
          A05: 'assumenda'
        },
        {
          A01: 'accusantium',
          A02: 'adipisci',
          A03: 'voluptatem',
          A04: 'voluptatem',
          A05: 'quis'
        }
      ]
    }, cfg)]);
  }
});