/*
 * File: app/model/PurchaseOrderModel.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('PurchaseOrder.model.PurchaseOrderModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Field'
    ],

    fields: [
        {
            name:'id'
        },
        {
            name: 'purchaseOrderNo'
        },
        {
            name: 'statusDesc'
        },
        {
            name: 'whsName'
        },
        {
            name: 'supplierName'
        },
        {
            name: 'totalPurchaseQty'
        },
        {
            name: 'totalReceiptQty'
        },
        {
            name: 'totalStockQty'
        },
        {
            name: 'totalReturnExcgQty'
        },
        {
            name: 'totalReturnRefundQty'
        },
        {
            name: 'totalLossQty'
        },
        {
            name: 'totalReturnQty'
        },
        {
            name: 'totalRemainingQty'
        },
        {
            name: 'totalOverReceiptQty'
        },
        {
            name: 'receiptRate',
            convert: function (value) {
                return value ? value+"%" : "0%";
            }
        },
        {
            name: 'expectedReceiptDate',
            convert: function (value) {
                return value ? new Date(Number(value)) : "";
            }
        },
        {
            name: 'totalPurchaseFee'
        },
        {
            name: 'totalReceiptFee'
        },
        {
            name: 'totalPaidFee'
        },
        {
            name: 'createDate',
            convert: function (value) {
                return value ? new Date(Number(value)) : "";
            }
        },
        {
            name: 'updateDate',
            convert: function (value) {
                return value ? new Date(Number(value)) : "";
            }
        },
        {
            name: 'createByName'
        },
        {
            name: 'memo'
        }
    ]
});