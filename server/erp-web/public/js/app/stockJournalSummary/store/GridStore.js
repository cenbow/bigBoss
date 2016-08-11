/*
 * File: app/store/MyJsonStore.js
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

Ext.define('StockJournalSummary.store.GridStore', {
    extend: 'Ext.data.Store',

    requires: [
        'StockJournalSummary.model.GridModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GridStore',
            autoLoad: true,
            model: 'StockJournalSummary.model.GridModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/api/report/stockJournal/filter'
                },
                actionMethods:{
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data.result',
                    startProperty: 'data.start',
                    limitProperty: 'data.pageSize',
                    totalProperty: 'data.totalCount'
                }
            }
        }, cfg)]);
    }
});