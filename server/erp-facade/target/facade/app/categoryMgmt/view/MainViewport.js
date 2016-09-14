Ext.define('CategoryMgmt.view.MainViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

    requires: [
        'CategoryMgmt.view.MainViewportViewController',
        'CategoryMgmt.view.MainViewportViewModel',
        'CategoryMgmt.store.ColumnComboboxStore',
        'CategoryMgmt.store.CategoryAllComboboxStore',
        'CategoryMgmt.store.CategoryByUpClassIdComboboxStore',
        'Common.ux.CommandColumn'
    ],

    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },
    layout: 'fit',

    items: [{
        xtype: 'gridpanel',
        title: '分类管理主页',
        reference: "categoryMgmtGrid",
        header: false,
        bind: {
            store: "{gridstore}"
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            height:35,
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype:'label',
                    text:'所属栏目：'
                },
                {
                    xtype:'combobox',
                    emptyText: "请选择",
                    editable: false,
                    displayField:'value',
                    valueField:'key',
                    id:'columnStore',
                    bind:{
                        store:'{columncomboboxstore}',
                        value:'{searchData.columnId}'
                    },
                    listeners:{
                        change:'changeColumn'
                    },
                },
                {
                    xtype:'label',
                    text:'上级分类：'
                },
                {
                    xtype:'combobox',
                    emptyText: "请选择",
                    editable: false,
                    queryMode: 'local',
                    displayField:'value',
                    valueField:'key',
                    id:'upClassStore',
                    bind:{
                        store:'{upclassallstore}',
                        value:'{searchData.upClassId}'
                    },
                    /*listeners:{
                        change:'changeLevelOne'
                    },*/
                },/*{
                    xtype:'label',
                    text:'二级分类：'
                },
                {
                    xtype:'combobox',
                    emptyText: "请选择",
                    editable: false,
                    queryMode: 'local',
                    displayField:'value',
                    valueField:'key',
                    id:'levelTwoStore',
                    bind:{
                        store: '{categorybyupclassidcomboboxstore}',
                        value:'{searchData.levelTwo}'
                    }
                },*/{
                    xtype: 'textfield',
                    width: 400,
                    fieldLabel: '快速搜索',
                    labelAlign: 'right',
                    labelWidth: 60,
                    emptyText: '输入分类名称',
                    enableKeyEvents: true,
                    id:'fastSearch',
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
                },{
                    xtype:'button',
                    text:'清除',
                    listeners: {
                        click: 'clearSearch'
                    },
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
                tdCls: 'with-btngroup'
            },
            items: [

                {
                    text: '序号',
                    xtype: 'rownumberer',
                    align: 'center',
                    width: 37
                },

                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: '分类名称',
                    width: 250
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'categoryName',
                    text: '上级分类',
                    width: 250,
                    /*renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
                        //console.log(1)
                        var upClassName = "";
                        if (value) {
                            store.each(function (record) {
                                if (record.id == value) {
                                    upClassName = record.getData().name;
                                    return false;
                                }
                            })
                        }
                        return upClassName;
                    }*/
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'columnId',
                    text: '所属栏目',
                    width: 140,
                    renderer: function (value) {
                        var store = Ext.StoreMgr.get('ColumnComboboxStore');
                        var columnName = "";
                        store.each(function (record) {
                            if (value == record.getData().key) {
                                columnName = record.getData().value;
                                return false;
                            }
                        })
                        return columnName;
                    }
                }, {
                    xtype: 'gridcolumn',
                    dataIndex: 'leaf',
                    text: '分类级别',
                    width: 140,
                    renderer: function (value) {
                        if (value == 1) {
                            return "一级分类"
                        } else if (value == 2) {
                            return "二级分类"
                        }
                    }
                },

                {
                    xtype: 'gridcolumn',
                    tdCls: 'grid-switch',
                    align: 'center',
                    dataIndex: 'status',
                    text: '是否启用',
                    width:100,
                    renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
                        if (value === 1) {
                            return '<img src="../../images/SwitchOn.png" />';
                        } else {
                            return '<img src="../../images/SwitchOff.png" />';
                        }
                    }
                },{
                    text: '操作',
                    xtype: 'widgetcolumn',
                    width: 80,
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
                            text: "修改"
                        }]
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'upClassId',
                    hidden:true
                    /*renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
                     //console.log(1)
                     var upClassName = "";
                     if (value) {
                     store.each(function (record) {
                     if (record.id == value) {
                     upClassName = record.getData().name;
                     return false;
                     }
                     })
                     }
                     return upClassName;
                     }*/
                },/* {
                    xtype: 'gridcolumn',
                    dataIndex: 'remark',
                    text: '备注',
                    flex: 1
                },*/]
        },
        listeners: {
            cellclick: 'cellclick'
        }
    }]
});