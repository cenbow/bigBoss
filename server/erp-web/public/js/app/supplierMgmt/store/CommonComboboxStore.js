Ext.define('SupplierMgmt.store.CommonComboboxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.commoncomboboxstore',

    requires: [
        'SupplierMgmt.model.CommonComboboxModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'SupplierMgmt.model.CommonComboboxModel'
        }, cfg)]);
    }
});