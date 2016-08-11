Ext.define('Common.view.GoodsChooseDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.goodschoosedialog',

    requires: [
        'Common.util.TipsUtil',
        'Common.view.GoodsChooseDialogViewController',
        'Common.view.GoodsChooseDialogViewModel',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Common.ux.PagingToolbarCustom',
        'Common.overrides.Button',
        'Common.overrides.Splitter',
        'Common.overrides.PagingToolbarCustom',
        'Common.overrides.GridHeaderContainer',
        'Common.overrides.JsonWrite'
    ],

    controller: 'goodschoosedialog',
    viewModel: {
        type: 'goodschoosedialog'
    },
    
    autoHeight: true,
    width: 800,
    height:600,
    frame: true,
    modal:true,
    labelSelector: '：',
    title: '选择商品',
    layout: 'fit',
    items: {
        xtype: 'gridpanel',
        reference: 'productGrid',
        header: false,
        bind: {
        	 store: '{gridStore}'
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'textfield',
                width: 300,
                fieldLabel: '快速搜索',
                labelAlign: 'right',
                labelWidth: 60,
                emptyText: '商品编码/规格编码/规格名称/条形码',
                triggers: {
                    fastQueryTrigger: {
                        handler: 'onFastQueryButtonClick',
                        cls: 'x-form-search-trigger'
                    }
                },
                listeners: {
                    specialkey: 'onEnterKey'
                }
            }]
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: {
                store: '{gridStore}'
            },
            plugins : [
                Ext.create("Ext.ux.ProgressBarPager"),
                Ext.create("Common.ux.PagingToolbarResizer",{}),
                Ext.create("Common.ux.PagingSelectionRecorder",{})
            ]
           /* xtype: 'pagingcustomtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: {
                store: '{gridStore}'
            },
            plugins : [
                Ext.create("Common.ux.PagingSelectionRecorder",{})
            ]*/
        }],
        selModel: {
            type: 'checkboxmodel',
            injectCheckbox: 1,
            pruneRemoved : false,
            enableKeyNav:false,
            mode: 'SIMPLE'
        },
        /*selModel: {
            type: 'spreadsheet',
            // Disables sorting by header click, though it will be still available via menu
            columnSelect: true,
            checkboxSelect: true,
            pruneRemoved: false,
            extensible: 'y'
        },*/
        columns: {
            defaults: {
                align: "center",
                width: 90
            },
            items: [{
                xtype: 'rownumberer',
                text: '序号',
                width: 37
            }, /*{
                xtype: 'checkcolumn',
                text: '选择'
            }, */{
                xtype: 'gridcolumn',
                dataIndex: 'productCode',
                text: '商品编码'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'skuCode',
                text: '规格编码'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'skuName',
                text: '规格名称'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'upperBarCode',
                text: '条形码'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'productCatName',
                text: '商品类目'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'productOriginName',
                text: '产地'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'productBrandName',
                text: '品牌'
            }]
        }
    },
    buttonsAlign: 'right',
    buttons: [{
        xtype: 'button',
        iconCls: 'btn-select',
        text: '选择',
        listeners: {
            click:'onButtonSelectClick'
        }
    },{
        xtype: 'button',
        iconCls: 'btn-cancel',
        text: '取消',
        listeners: {
            click: 'onCancelButtonClick'
        }
    }],

    constructor: function(cfg) {
        var me = this;
        var grid = me.items;
        cfg = cfg || {};
        grid.selModel.mode = cfg.singleMode ?  "SINGLE" : grid.selModel.mode;
        me.callParent([Ext.apply({}, cfg)]);
    }
});