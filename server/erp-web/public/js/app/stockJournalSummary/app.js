Ext.application({
    models: [
        'GridModel'
    ],
    stores: [
        'GridStore',
        'StockJournalBaseTypeStore',
        'StockRecordStatusStock'
    ],
    views: [
        'StockJournalSummary'
    ],
    name: 'StockJournalSummary',
    appFolder: "js/app/stockJournalSummary",

    launch: function() {
        Ext.create('StockJournalSummary.view.StockJournalSummary');
    }

});
