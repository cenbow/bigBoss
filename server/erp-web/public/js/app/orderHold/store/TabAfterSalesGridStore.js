/*
 * File: app/store/TabAfterSalesGridStore.js
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

Ext.define('OrderHold.store.TabAfterSalesGridStore', {
  extend: 'Ext.data.Store',

  requires: [
    'OrderHold.model.AfterSalesQualifiedModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'TabAfterSalesGridStore',
      model: 'OrderHold.model.AfterSalesQualifiedModel',
      data: [
        {
          A01: 'illum',
          A02: 'ex',
          A03: 'natus',
          A04: 'et',
          A05: 'est',
          A06: 'temporibus',
          A07: 'enim',
          A08: 'ut',
          A09: 'sit',
          A10: '11/15/2010',
          A11: '12/15/2004',
          A12: 'quo'
        },
        {
          A01: 'qui',
          A02: 'natus',
          A03: 'qui',
          A04: 'atque',
          A05: 'laboriosam',
          A06: 'velit',
          A07: 'ipsa',
          A08: 'mollitia',
          A09: 'ducimus',
          A10: '3/3/2008',
          A11: '9/6/2005',
          A12: 'quam'
        },
        {
          A01: 'facilis',
          A02: 'rerum',
          A03: 'sit',
          A04: 'vel',
          A05: 'aut',
          A06: 'aut',
          A07: 'nemo',
          A08: 'aliquam',
          A09: 'neque',
          A10: '1/9/2009',
          A11: '9/8/2012',
          A12: 'voluptate'
        },
        {
          A01: 'facere',
          A02: 'sunt',
          A03: 'necessitatibus',
          A04: 'quae',
          A05: 'voluptatibus',
          A06: 'id',
          A07: 'fugiat',
          A08: 'maiores',
          A09: 'cupiditate',
          A10: '12/24/2008',
          A11: '2/27/2001',
          A12: 'officiis'
        },
        {
          A01: 'unde',
          A02: 'illum',
          A03: 'enim',
          A04: 'dolor',
          A05: 'cupiditate',
          A06: 'tempora',
          A07: 'minus',
          A08: 'neque',
          A09: 'id',
          A10: '10/12/2006',
          A11: '2/9/2006',
          A12: 'eius'
        },
        {
          A01: 'consequuntur',
          A02: 'architecto',
          A03: 'sint',
          A04: 'alias',
          A05: 'ea',
          A06: 'quas',
          A07: 'quod',
          A08: 'corporis',
          A09: 'qui',
          A10: '3/9/2002',
          A11: '9/7/2006',
          A12: 'voluptate'
        }
      ]
    }, cfg)]);
  }
});