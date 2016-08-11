Ext.define('OrderManually.store.CommonComboboxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.commoncomboboxstore',

    requires: [
        'OrderManually.model.CommonComboboxModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'OrderManually.model.CommonComboboxModel'
        }, cfg)]);
    }
});