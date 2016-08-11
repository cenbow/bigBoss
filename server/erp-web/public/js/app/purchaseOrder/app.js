Ext.require([
    'Common.util.TipsUtil'
]);
Ext.application({
    models: [
        'SelectOptionModel',
        'PaymentDetialModel',
        'OrderDetailModel',
        'PurchaseOrderModel'
    ],
    stores: [
        'OrderDetailWindowStore'
    ],
    views: [
        'PurchaseOrderViewport',
        'PurchaseOrderWindow'
    ],
    name: 'PurchaseOrder',
    appFolder: "js/app/purchaseOrder",
    launch: function() {
        Ext.create('PurchaseOrder.view.PurchaseOrderViewport');
    }

});
