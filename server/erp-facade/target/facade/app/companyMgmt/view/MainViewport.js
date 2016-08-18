Ext.define('CompanyMgmt.view.MainViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

    requires: [
        'CompanyMgmt.view.MainViewportViewController',
        'CompanyMgmt.view.MainViewportViewModel',
        'Common.ux.CommandColumn'
    ],

    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    layout: 'fit',

    items: [{
        xtype: 'gridpanel',
        title: '公司管理主页',
        reference: "companyMgmtGrid",
        header: false,
        bind: {
            store: "{gridstore}"
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'tbfill'
                }, {
                    xtype: 'textfield',
                    width: 400,
                    fieldLabel: '快速搜索',
                    labelAlign: 'right',
                    labelWidth: 60,
                    emptyText: '输入公司名称/公司代码',
                    enableKeyEvents: true,
                    listeners: {
                        specialKey: 'onFastSearchTextFieldSpecialKey'
                    },
                    triggers: {
                        fastQueryTrigger: {
                            handler: 'onFastQueryButtonClick',
                            cls: 'x-form-search-trigger'
                        }
                    },
                    bind: {
                        value: "{searchData.text}"
                    }
                }]
        }, {
            xtype: 'pagingcustomtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: {
                store: "{gridstore}"
            }
        }],
        columns: {
            defaults: {
                align: "center",
                //cls: 'titleAlign',
                //menuDisabled: true,
                tdCls: 'with-btngroup'
            },
            items: [{
                text: '序号',
                xtype: 'rownumberer',
                align: 'center',
                width: 37
            },
                {
                    text: '操作',
                    xtype: 'widgetcolumn',
                    width: 200,
                    tdCls: 'btngroup',
                    dataIndex: 'progress',
                    widget: {
                        xtype: 'buttongroup',
                        baseCls: "",
                        layout: {
                            type: "column"
                        },
                        defaults: {
                            handler: "onCommandColumnClick"
                        },
                        items: [{
                            xtype: "button",
                            command: "View",
                            iconCls: "btn-search",
                            text: "查看"
                        }, {
                            xtype: "button",
                            command: "Update",
                            iconCls: "btn-edit",
                            text: "修改"
                        }]
                    }
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: '公司名称',
                    width: 260,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        console.log(123)
                        metaData.tdAttr = "data-qtip='" + value + " <br>  '";
                        return value;
                    }

                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'code',
                    text: '公司代码',
                    width: 320
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'createDate',
                    text: '创建日期',
                    formatter: 'date("Y/m/d")',
                    width: 320
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'remark',
                    text: '备注',
                    flex: 1
                }]
        },
        listeners: {}
    }]
});