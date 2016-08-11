Ext.application({
    models: [
        'GridModel'
    ],
    stores: [
        'GridStore'
    ],
    views: [
        'StockInvoicingSummary'
    ],
    name: 'StockInvoicingSummary',
    appFolder: "js/app/stockInvoicingSummary",

    launch: function() {
        Ext.create('StockInvoicingSummary.view.StockInvoicingSummary');
    }

});
