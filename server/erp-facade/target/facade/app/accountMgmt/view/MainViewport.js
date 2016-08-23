Ext.define('AccountMgmt.view.MainViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

    requires: [
        'AccountMgmt.view.MainViewportViewController',
        'AccountMgmt.view.MainViewportViewModel',
        'Common.ux.CommandColumn'
    ],

    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    layout: 'fit',

    items: [{
        xtype: 'gridpanel',
        title: '帐号管理主页',
        reference: "accountMgmtGrid",
        header: false,
        bind: {
            store: "{gridstore}"
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            height:32,
            items: [
                {
                    xtype: 'tbfill'
                }, {
                    xtype: 'textfield',
                    width: 400,
                    fieldLabel: '快速搜索',
                    labelAlign: 'right',
                    labelWidth: 60,
                    labelHeight:28,
                    height:28,
                    emptyText: '输入用户名/姓名/公司名称/公司代码',
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
                    width: 300,
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
                        }, {
                            xtype: "button",
                            command: "Delete",
                            iconCls: "btn-delete",
                            text: "删除"
                        }]
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'companyCode',
                    text: '公司代码',
                    width: 170
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'companyName',
                    text: '公司名称',
                    width: 270
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'userName',
                    text: '用户名'
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: '姓名'
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'roleName',
                    text: '用户角色'
                }, {
                    xtype: 'gridcolumn',
                    tdCls: 'grid-switch',
                    align: 'center',
                    dataIndex: 'status',
                    text: '是否启用',
                    width: 200,
                    renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
                        if (value === 1) {
                            return '<img src="../../images/SwitchOn.png" />';
                        } else {
                            return '<img src="../../images/SwitchOff.png" />';
                        }
                    }
                }, {
                    xtype: 'gridcolumn',
                    width: 160,
                    dataIndex: 'createDate',
                    formatter: 'date("Y/m/d H:i:s")',
                    align: 'center',
                    text: '创建日期'
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'remark',
                    text: '备注',
                    flex: 1
                }]
        },
        listeners: {
            cellclick: 'cellclick'
        }
    }]
});