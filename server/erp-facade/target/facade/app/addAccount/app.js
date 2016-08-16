Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Common': '../../app/common',
        'Ext': '../../js/extjs'
    }
});
Ext.require([
    'Common.util.TipsUtil',
    'Common.util.DoActionUtil',
    'Ext.ux.ProgressBarPager',
    'Common.ux.PagingToolbarCustom',
    'Common.overrides.Button',
    'Common.overrides.Splitter',
    'Common.overrides.PagingToolbarCustom',
    'Common.overrides.GridHeaderContainer',
    'Common.overrides.JsonWrite'
]);

Ext.application({
    models: [

    ],
    stores: [
        'addAccount.store.CompanyComboboxStore',
        'addAccount.store.RoleComboboxStore'
    ],
    views: [
        'MainWindow'
    ],
    name: 'addAccount',
    appFolder: '../../app/addAccount',

    init: function (app) {

    },

    launch: function () {
        Ext.create('addAccount.view.MainWindow');
    }

});
