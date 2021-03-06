/*
 * File: app/store/customsTypeStore.js
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

Ext.define('WhsMgmt.store.customsTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.customstypestore',
    requires: [
        'WhsMgmt.model.selectModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'customsTypeStore',
            model: 'WhsMgmt.model.selectModel',
            data: [
                {
                    name: '保税备货',
                    id: 'BONDED_STOCK'
                },
                {
                    name: '保税集货',
                    id: 'BONDED_COLLECT'
                },
                {
                    name: '海外直邮',
                    id: 'OVERSEE_POSTAL'
                }
            ]
        }, cfg)]);
    }
});