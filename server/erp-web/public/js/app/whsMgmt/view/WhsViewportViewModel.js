/*
 * File: app/view/WhsViewportViewModel.js
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

Ext.define('WhsMgmt.view.WhsViewportViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.whsviewport',
    requires: [
        'WhsMgmt.store.gridStore',
        'WhsMgmt.store.treeStore',
        'WhsMgmt.store.stockTypeStore',
        'WhsMgmt.store.productBrandStore',
        'WhsMgmt.store.productCategoryStore',
        'WhsMgmt.store.productOriginStore'
    ],
    data:{
        rootSelected: true,
        stockSelected: false,
        areaSelected: false,
        totalStockValue: 0,
        totalSaleStock: 0,
        totalAvailable: 0,
        totalStockValue: 0
    },
    formulas: {
        treeAddBtnText: function (get) {
            var rootSelected = get('rootSelected');
            return rootSelected?'添加仓库':'添加库区';
        },
        treeAdd: function (get){
            var rootSelected = get('rootSelected');
            return rootSelected?'addWhs':'addWhsArea';
        },
        treeUpdate: function (get){
            var stockSelected = get('stockSelected');
            return stockSelected?'updateWhs':'updateWhsArea';
        },
        treeDelete: function (get){
            var stockSelected = get('stockSelected');
            return stockSelected?'deleteWhs':'deleteWhsArea';
        },
        editPermission: function (get) {
            return !Ext.Array.contains(_USER.permissions, 'whsMgmt:edit');
        }
    },
    stores: {
        gridstore: {
            type: 'gridstore'
        },
        treestore: {
            type: 'treestore'
        },
        productbrandstore: {
            type: 'productbrandstore'
        },
        productcategorystore: {
            type: 'productcategorystore'
        },
        productoriginstore: {
            type: 'productoriginstore'
        }
    }

});