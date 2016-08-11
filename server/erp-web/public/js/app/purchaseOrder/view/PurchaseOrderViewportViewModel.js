

Ext.define('PurchaseOrder.view.PurchaseOrderViewportViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.purchaseorderviewport',
    requires: [
        'PurchaseOrder.store.PurchaseOrderGridStore',
        'PurchaseOrder.store.PurchaseOrderDetailStore',
        'PurchaseOrder.store.PurchasePaymentStore',
        'Common.store.CommonWhsStore',
        'PurchaseOrder.store.PurchaseOrderStatusStore',
        'PurchaseOrder.store.SupplierStore'
    ],
    data:{
      'createDateTo': '',
      'createDateFrom': '',
    },
    formulas: {
        addButonDisabled: function (get) {
            return !Ext.Array.contains(_USER.permissions, 'purchaseOrder:edit');
        }
    },
    stores: {
        'PurchaseOrderGridStore': {
            type: 'purchaseordergridstore'
        },
        'PurchaseOrderDetailStore': {
            type: 'purchaseorderdetailstore'
        },
        'PurchasePaymentStore': {
            type: 'purchasepaymentstore'
        },
        'CommonWhsStore': {
            autoLoad: true,
            type: 'commonwhsstore'
        },
        'PurchaseOrderStatusStore': {
            type: 'purchaseorderstatusstore'
        },
        'SupplierStore': {
            autoLoad: true,
            type: 'supplierstore'
        }
    }

});