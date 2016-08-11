Ext.define('StockTransfer.store.StockTransferJsonStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stocktransferjsonstore',
    requires: [
        'StockTransfer.model.StockTransferModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'StockTransfer.model.StockTransferModel',
            proxy: {
                type: 'ajax',
                url: '/api/inventory/stock/transfer/filter',
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