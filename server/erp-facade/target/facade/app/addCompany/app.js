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
        'addCompany.store.CompanyComboboxStore',
        'addCompany.store.RoleComboboxStore'
    ],
    views: [
        'MainWindow'
    ],
    name: 'addCompany',
    appFolder: '../../app/addCompany',

    init: function (app) {

    },

    launch: function () {
        Ext.create('addCompany.view.MainWindow');
    }

});
