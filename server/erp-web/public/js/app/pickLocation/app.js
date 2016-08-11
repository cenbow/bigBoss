Ext.require([
    'Common.util.TipsUtil',
    'Common.ux.PagingToolbarCustom',
    'Common.overrides.PagingToolbarCustom'
]);
Ext.application({
    models: [
        'gridModel',
        'pickModel'
    ],
    views: [
        'PickLocationViewPort',
        'Uploadwindow'
    ],
    name: 'PickLocation',
    appFolder: "js/app/pickLocation",
    launch: function() {
        Ext.create('PickLocation.view.PickLocationViewPort');
    }

});
