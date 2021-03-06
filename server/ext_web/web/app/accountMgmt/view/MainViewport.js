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
            items: [
                {
                xtype: 'tbfill'
            }, {
                xtype: 'textfield',
                width: 235,
                fieldLabel: '快速搜索',
                labelAlign: 'right',
                labelWidth: 60,
                emptyText: '输入用户名/公司名称/公司代码',
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onFastSearchTextFieldSpecialKey'
                },
                triggers: {
                    fastQueryTrigger: {
                        handler: 'onFastQueryButtonClick',
                        cls: 'x-form-search-trigger'
                    }
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
                        command: "Update",
                        iconCls: "btn-edit",
                        text: "信息修改"
                    }, {
                        xtype: "button",
                        command: "Reset",
                        iconCls: "btn-password-edit",
                        text: "密码修改"
                    }, {
                        xtype: "button",
                        command: "Permission",
                        iconCls: "btn-permission",
                        text: "权限"
                    }, {
                        xtype: "button",
                        command: "Delete",
                        iconCls: "btn-delete",
                        text: "删除"
                    }]
                }
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
                dataIndex: 'companyName',
                text: '公司(团队)名称',
                width:270
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'companyCode',
                text: '公司(团队)代码',
                width:170
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'roleName',
                text: '用户角色'
            },{
                xtype: 'gridcolumn',
                width: 160,
                dataIndex: 'createDate',
                formatter: 'date("Y/m/d H:i:s")',
                align: 'center',
                text: '创建日期'
            },  {
                xtype: 'gridcolumn',
                dataIndex: 'status',
                text: '状态'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'remark',
                text: '备注',
                flex:1
            }]
        },
        listeners: {
        }
    }]
});