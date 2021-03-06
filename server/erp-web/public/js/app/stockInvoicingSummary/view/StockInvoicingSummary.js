/*
 * File: app/view/MyViewport.js
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

Ext.define('StockInvoicingSummary.view.StockInvoicingSummary', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.stockinvoicingsummary',

    requires: [
        'StockInvoicingSummary.view.StockInvoicingSummaryViewController',
        'StockInvoicingSummary.view.StockInvoicingSummaryViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.view.Table',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button',
    ],
    controller: 'stockinvoicingsummary',
    viewModel: {
        type: 'stockinvoicingsummary'
    },
    layout: 'fit',

    items: [
        {
            xtype: 'gridpanel',
            region: 'center',
            bind: {
                store: 'GridStore'
            },
            dockedItems: [
                {
                    xtype: 'form',
                    reference: 'form',
                    dock: 'top',
                    width: 100,
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.2,
                        margin: 7,
                        labelWidth: 80
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'createDateFrom',
                            fieldLabel: '开始时间',
                            editable: false,
                            value: function () {
                                var date = new Date();
                                return new Date(date.getFullYear(), date.getMonth(), 1);
                            }(),
                            format: "Y/n/j",
                            listeners: {
                                select : function(view, fromValue) {
                                    var form = view.up('form');
                                    var postDateTo = form.getComponent('createDateTo');
                                    postDateTo.setMinValue(fromValue);
                                    var toValue = postDateTo.getValue();
                                    if(toValue < fromValue) {
                                        postDateTo.setValue('');
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'createDateTo',
                            name: 'createDateTo',
                            fieldLabel: '结束时间',
                            format: "Y/n/j",
                            value: new Date()
                        },
                        {
                            xtype: 'combobox',
                            name: 'whsId',
                            fieldLabel: '仓库',
                            editable: false,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            emptyText: '请选择',
                            bind: {
                                store: '{commonwhsstore}'
                            },
                            listeners: {
                                select: function (filed, newValue) {
                                    Ext.data.StoreManager.lookup('commonwhsareastore').load({id: newValue.get('id')});
                                    filed.next().reset();
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'skuCodes',
                            fieldLabel: '商品信息',
                            reference: 'text',
                            emptyText: '规格编码(多个商品以逗号分隔)',
                            triggers: {
                                mytrigger: {
                                    handler: 'onButtonGoodsChooseClick',
                                    cls: 'x-form-ellipsis-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            columnWidth: 0.2,
                            layout: {
                                type: 'anchor'
                            },
                            defaults: {
                                handler: 'onCommandColumnClick',
                                anchor: '50%'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'searchBtn',
                                    iconCls: 'btn-search',
                                    command: 'query',
                                    text: '查询',
                                    margin: '0 15% 0 0'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'btn-clear',
                                    command: 'empty',
                                    margin: '0 0 0 15%',
                                    text: '清空'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: 'GridStore',
                    plugins: [
                        Ext.create("Ext.ux.ProgressBarPager"),
                        Ext.create("Common.ux.PagingToolbarResizer", {})
                    ]
                }
            ],
            columns: {
                defaults: {
                    cls: 'titleAlign',
                    tdCls: 'with-btngroup',
                    sortable: false
                },
                items: [
                    {
                        xtype: 'rownumberer',
                        width: 50,
                        text: '序号'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'productCode',
                        text: '商品编码',
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'skuCode',
                        text: '规格编码',
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'skuName',
                        text: '规格名称',
                        width: 200
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'whsName',
                        text: '仓库名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'beforeQty',
                        text: '期初库存',
                        align:'right'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'beforeValue',
                        text: '期初库存<br>总成本（元）',
                        align:'right'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'afterQty',
                        text: '期末库存',
                        align:'right'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'afterValue',
                        text: '期末库存<br>总成本（元）',
                        align:'right'
                    },
                    {
                        xtype: 'numbercolumn',
                        text: '入库',
                        defaults: {
                            cls: 'titleAlign',
                            align:'right'
                        },
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'purchaseReceiptQty',
                                text: '采购入库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'aftersaleReturnQty',
                                text: '售后入库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'stockTransferInQty',
                                text: '调拨入库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'goodsReceiptQty',
                                text: '杂项入库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'stockTakingInQty',
                                text: '盘点入库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'totalInQty',
                                text: '总入库量'
                            }
                        ]
                    },
                    {
                        xtype: 'numbercolumn',
                        text: '出库',
                        defaults: {
                            cls: 'titleAlign',
                            align:'right'
                        },
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'orderQty',
                                text: '销售出库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'aftersaleIssueQty',
                                text: '售后出库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'purchaseReturnQty',
                                text: '采购退货量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'stockTransferOutQty',
                                text: '调拨出库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'goodsIssueQty',
                                text: '杂项出库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'stockTakingOutQty',
                                text: '盘点出库量'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'totalOutQty',
                                text: '总出库量'
                            }
                        ]
                    },
                    {
                        xtype: 'numbercolumn',
                        text: '库存成本变化',
                        defaults: {
                            cls: 'titleAlign',
                            align:'right'
                        },
                        columns: [
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'orderChangeValue',
                                text: '销售'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'aftersaleChangeValue',
                                text: '售后'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'purchaseChangeValue',
                                text: '采购'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'stockTransferChangeValue',
                                text: '调拨'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'goodsChangeValue',
                                text: '杂项'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'stockTakingChangeValue',
                                text: '盘点'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'totalChangeValue',
                                text: '总变化'
                            }
                        ]
                    }
                ]
            }
        }
    ]

});