Ext.define('PickLocation.view.PickLocationViewPortViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.picklocationviewport',
    requires: [
        'PickLocation.store.gridStore',
        'PickLocation.store.pickStore'
    ],
    data: {
        searchOpts:{
            query: ''
        }
    },
    formulas: {
        editPermission: function (get) {
            return !Ext.Array.contains(_USER.permissions, 'pickLocation:edit');
        }
    },
    stores: {
        gridStore: {
            type: 'gridstore',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                extraParams:'{searchOpts}',
                api: {
                    read: '/api/product/search/sku'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data.pageData',
                    totalProperty: 'data.totalCount'
                }
            }
        },
        pickStore: {
            type: 'pickstore',
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read: '/api/inventory/warehouse/pickloc/list',
                    update: '/api/inventory/warehouse/pickloc/add'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    writeAllFields: true,
                    writeRecordId: false
                }
            }
        }
    }
});