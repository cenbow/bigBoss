Ext.require([
    'Common.util.TipsUtil',
    'Common.ux.PagingToolbarCustom',
    'Common.overrides.PagingToolbarCustom'
]);
Ext.application({
    models: [
        'selectModel',
        'treeModel',
        'gridModel'
    ],
    views: [
        'WhsViewport',
        'WhsWindow',
        'RecycleWindow',
        'WhsAreaWindow'
    ],
    name: 'WhsMgmt',
    appFolder: "js/app/whsMgmt",

    launch: function() {
        Ext.create('WhsMgmt.view.WhsViewport');
    }

});
