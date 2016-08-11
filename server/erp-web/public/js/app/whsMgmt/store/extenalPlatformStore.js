/*
 * File: app/store/extenalPlaformStore.js
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

Ext.define('WhsMgmt.store.extenalPlatformStore', {
    extend: 'Ext.data.Store',
    alias: 'store.extenalplatformstore',
    requires: [
        'WhsMgmt.model.selectModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'extenalPlatformStore',
            model: 'WhsMgmt.model.selectModel',
            autoLoad:false,
            data: [
                {
                    name: '易宝分销平台',
                    id: 'HIGOUMALL'
                },
                {
                    name: '淘宝',
                    id: 'TAOBAO'
                },
                {
                    name: '天猫',
                    id: 'TMALL'
                },
                {
                    name: '京东',
                    id: 'JD'
                }
            ]
        }, cfg)]);
    }
});