Ext.define('WhsMgmt.view.WhsViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.whsviewport',

    requires: [
        'Common.ux.PagingToolbarResizer',
        'WhsMgmt.view.WhsViewportViewModel',
        'WhsMgmt.view.WhsViewportViewController',
        'WhsMgmt.view.TreeCombobox',
        'Ext.tree.Panel',
        'Ext.button.Button',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Paging',
        'Ext.form.field.Display',
        'Ext.grid.column.RowNumberer'
    ],

    controller: 'whsviewport',
    viewModel: {
        type: 'whsviewport'
    },
    layout: 'border',
    items: [
        {
            xtype: 'treepanel',
            id: 'whsTree',
            region: 'west',
            reference: 'whsTree',
            border: true,
            split: true,
            collapseMode: 'mini',
            collapsible: true,
            width: 200,
            bodyBorder: false,
            useArrows : true,
            animate : true,
            header: false,
            bind:{
                store: '{treestore}'
            },
            split: true,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: "btn-add",
                            id: 'addWhsBtn',
                            bind:{
                              text: '{treeAddBtnText}',
                              disabled: '{editPermission}'
                            },
                            listeners: {
                                click: 'treeAdd'
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'editWhsBtn',
                            iconCls: "btn-edit",
                            text: '编辑',
                            bind:{
                                hidden: '{rootSelected}',
                                disabled: '{editPermission}'
                            },
                            listeners: {
                                click: 'treeUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'deleteWhsBtn',
                            iconCls: "btn-delete",
                            text: '删除',
                            bind:{
                                hidden: '{rootSelected}',
                                disabled: '{editPermission}'
                            },
                            listeners: {
                                click: 'treeDelete'
                            }
                        },
                    ]
                }
            ],
            viewConfig:{
                listeners: {
                   // viewready: 'treeInit'
                }
            },
            listeners: {
                itemcontextmenu: 'rigthKeyMenu',
                afterrender: 'treeInit',
                select: 'selectNode'
            }
        },
        {
            xtype: 'gridpanel',
            region: 'center',
            header: false,
            title: 'My Grid Panel',
            queryMode: 'local',
            bind: {
                store: '{gridstore}',
                border: '1 1 1 1'
            },
            viewConfig: {
                height: 425,
                width: 150
            },
            dockedItems: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    region: 'north',
                    header: false,
                    border: false,
                    title: 'My Form',
                    defaultButton: "searchBtn",
                    layout: 'column',
                    defaults: {
                        columnWidth: 15,
                        labelWidth: 65,
                        margin: 5,
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            xtype: 'treeCombobox',
                            id: 'category',
                            treeHeight : 100,
                            fieldLabel: '商品类目',
                            editable: false,
                            queryMode: 'local',
                            rootVisible: false,
                            //matchFieldWidth: true,
                            canSelectFolders: true,
                            store: Ext.create('Ext.data.TreeStore', {
                                defaultRootProperty: 'items',
                                proxy : {
                                    type : 'ajax',
                                    url : '/api/product/category/tree',
                                    reader : {
                                        type : 'json'
                                    }
                                },
                                fields : [
                                    'id','leaf', 'qtip',
                                    {
                                        name: 'text', mapping: 'name'
                                    }],
                                root : {
                                    text : '所有商品',
                                    expanded : true
                                }
                            }),
                            bind: {
                                value: '{searchOpts.catIdCascade}'
                            },
                            columnWidth: 0.2
                        },
                        {
                            xtype: 'combobox',
                            dock: 'top',
                            fieldLabel: '商品品牌',
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            columnWidth: 0.2,
                            bind: {
                                store: '{productbrandstore}',
                                value: '{searchOpts.brandId}'
                            },
                            valueField: 'id'
                        },
                        {
                            xtype: 'combobox',
                            dock: 'top',
                            fieldLabel: '商品产地',
                            displayField: 'name',
                            forceSelection: true,
                            queryMode: 'local',
                            columnWidth: 0.2,
                            bind: {
                                store: '{productoriginstore}',
                                value: '{searchOpts.originId}'
                            },
                            valueField: 'id'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '快速搜索',
                            columnWidth: 0.3,
                            emptyText: '商品编码/规格编码/规格名称/条形码',
                            bind: {
                                value: '{searchOpts.query}'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: '实际库存',
                            columnWidth: 0.15,
                            allowDecimals: false,
                            bind: {
                                value: '{searchOpts.greaterThen}'
                            },
                            decimalSeparator: ".",
                            minValue: 0.0
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: '到',
                            columnWidth: 0.12,
                            labelWidth: 20,
                            allowDecimals: false,
                            bind: {
                                value: '{searchOpts.lessThen}',
                                minValue: '{searchOpts.greaterThen}',
                            } ,
                            decimalSeparator: ".",
                            minValue: 0.0
                        },
                        {
                            xtype: 'button',
                            reference: 'searchBtn',
                            iconCls: 'btn-search',
                            handler: 'search',
                            columnWidth: 0.06,
                            text: '查询'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'btn-clear',
                            columnWidth: 0.06,
                            handler: 'reset',
                            text: '清空'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    border: '1 1 1 1',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: '回收站',
                            listeners: {
                                click: 'reCycle'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            handler: 'search',
                            bind: '{searchOpts.hasStock}',
                            fieldLabel: '',
                            hideLabel: true,
                            boxLabel: '仅显示库存商品'
                        },
                        {
                            //xtype: 'splitbutton',
                            xtype: 'button',
                            text: '导出excel',
                            id: 'exportExcel',
                            listeners: {
                                click: 'exportExcel'
                            },
                            iconCls: 'page-excel',
                           /* menu: {
                                xtype: 'menu',
                                width: 200,
                                items: [
                                    {
                                        xtype: 'menuitem',
                                        text: '导出所有仓库excel',
                                        iconCls: 'page-excel',
                                        listeners: {
                                            click: 'exportExcelAll'
                                        }
                                    }
                                ]
                            }*/
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'displayfield',
                            dock: 'right',
                            margin: '0 20 0 20',
                            fieldLabel: '实际库存总数',
                            labelWidth: 80,
                            bind: {
                                value: '{totalQuantity}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            margins: '',
                            dock: 'right',
                            margin: '0 20 0 20',
                            fieldLabel: '在售库存总计',
                            labelWidth: 80,
                            bind: {
                                hidden: '{areaSelected}',
                                value: '{totalSaleStock}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            margins: '',
                            dock: 'right',
                            margin: '0 20 0 20',
                            fieldLabel: '可用库存总计',
                            labelWidth: 80,
                            bind: {
                                value: '{totalAvailable}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            dock: 'right',
                            margin: '0 20 0 20',
                            fieldLabel: '库存总计成本',
                            labelWidth: 80,
                            renderer: function (value, field) {
                               return Ext.util.Format.round(value,2);
                            },
                            bind: {
                                hidden: '{areaSelected}',
                                value: '{totalStockValue}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'pagingcustomtoolbar',
                    id: 'pickLocationGrid',
                    dock: 'bottom',
                    displayInfo: true,
                    bind: {
                        store: '{gridstore}'
                    }
                }

            ],
            columns: {
                defaults: {
                    cls: 'titleAlign'
                },
                items: [
                    {
                        xtype: 'rownumberer',
                        width: 52,
                        dataIndex: 'index',
                        text: '序号'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'productCode',
                        text: '商品编码'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        dataIndex: 'skuCode',
                        text: '规格编码'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 300,
                        dataIndex: 'skuName',
                        text: '规格名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'barCode',
                        text: '条形码'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'catName',
                        text: '商品分类'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'originName',
                        text: '产地'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'brandName',
                        text: '品牌'
                    },
                    {
                        xtype: 'numbercolumn',
                        width: 100,
                        dataIndex: 'quantity',
                        align: 'right',
                        format: '000000000',
                        text: '实际库存'
                    },
                    {
                        xtype: 'numbercolumn',
                        width: 100,
                        align: 'right',
                        format: '000000000',
                        dataIndex: 'reserved',
                        text: '  临时占用'
                    },
                    {
                        xtype: 'numbercolumn',
                        width: 100,
                        dataIndex: 'available',
                        align: 'right',
                        format: '000000000',
                        text: '  可用库存'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'onWay',
                        text: '  在途库存',
                        align: 'right',
                        format: '000000000',
                        bind: {
                            hidden: '{areaSelected}'
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        width: 100,
                        text: '成本单价',
                        dataIndex: 'stockPrice',
                        align: 'right',
                        format: '000000000.00',
                        bind: {
                            hidden: '{areaSelected}'
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        width: 150,
                        dataIndex: 'stockValue',
                        text: '  库存总成本',
                        align: 'right',
                        format: '000000000.00',
                        bind: {
                            hidden: '{areaSelected}'
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        width: 100,
                        dataIndex: 'lastPurchasePrice',
                        text: '  最近采购价格',
                        align: 'right',
                        format: '000000000.00',
                        bind: {
                            hidden: '{areaSelected}'
                        }
                    }
                ]
            }
        }
    ]

});