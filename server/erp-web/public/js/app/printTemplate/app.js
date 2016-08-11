Ext.application({
    models: [
        'GridModel',
        'TemplateTypeModel'
    ],
    stores: [
        'GridStore',
        'TemplateTypeStore'
    ],
    views: [
        'PrintTemplateViewPort',
        'TemplateInfoWindow'
    ],
    name: 'PrintTemplate',
    appFolder: "js/app/printTemplate",

    launch: function() {
        Ext.create('PrintTemplate.view.PrintTemplateViewPort');
    }

});
