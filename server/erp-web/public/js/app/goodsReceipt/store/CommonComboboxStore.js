Ext.define('GoodsReceipt.store.CommonComboboxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.commoncomboboxstore',

    requires: [
        'GoodsReceipt.model.CommonComboboxModel'
    ],

    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'GoodsReceipt.model.CommonComboboxModel',
            proxy: {
                type: 'ajax',
                api: {
                    save  : '/api/inventory/goods/receipt/type/save',
                    read  : '/api/inventory/goods/receipt/type/list'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }, cfg)]);
    }

});