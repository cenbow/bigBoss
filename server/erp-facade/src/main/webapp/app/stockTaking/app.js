Ext.require([
    'Common.util.TipsUtil',
    'Common.util.DoActionUtil',
    'Ext.ux.ProgressBarPager',
    'Common.ux.PagingToolbarCustom',
    'Common.overrides.Button',
    'Common.overrides.Splitter',
    'Common.overrides.PagingToolbarCustom'
]);

Ext.application({
    models: [
        'GridModel'
    ],
    stores: [
        'GridStore',
        'StockTakingStatusStore',
        'StockTakingTypeStore',
        'DetailGridStore'
    ],
    views: [
        'StockTakingViewport'
    ],
    name: 'StockTaking',
    appFolder: "js/app/stockTaking",

    launch: function() {
        Ext.create('StockTaking.view.StockTakingViewport');
    }

});


