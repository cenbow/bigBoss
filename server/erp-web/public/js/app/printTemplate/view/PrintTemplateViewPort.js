/*
 * File: app/view/PrintTemplateViewPort.js
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

Ext.define('PrintTemplate.view.PrintTemplateViewPort', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.printtemplateviewport',

    requires: [
        'PrintTemplate.view.PrintTemplateViewPortViewModel',
        'PrintTemplate.view.PrintTemplateViewPortViewController',
        'Common.util.TipsUtil',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.button.Button',
        'Ext.toolbar.Fill',
        'Ext.form.field.Text',
        'Ext.grid.column.Column',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    controller:'printtemplateviewport',
    viewModel: {
        type: 'printtemplateviewport'
    },
    layout: 'border',

    items: [
        {
            xtype: 'gridpanel',
            store: 'GridStore',
            resizable:true,
            width:800,
            region:'west',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'btn-add',
                            text: '添加',
                            listeners: {
                                click: 'addPrintTemp'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'btn-download',
                            text: '模板编辑器'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'btn-download',
                            text: '本地打印程序'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '快速搜索',
                            labelAlign: 'right',
                            emptyText: '输入模板名称',
                            triggers: {
                                mytrigger: {
                                    handler: 'onButtonSearchClick',
                                    cls: 'x-form-search-trigger'
                                }
                            },
                            listeners: {
                                specialkey: 'onSearchEnter'
                            }
                        }
                    ]
                }
                ,
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: 'GridStore',
                    plugins : [
                        Ext.create("Ext.ux.ProgressBarPager"),
                        Ext.create("Common.ux.PagingToolbarResizer", {})
                    ]
                }
            ],
            columns: {
                defaults: {
                    align: "center",
                    tdCls: 'with-btngroup',
                    sortable:false
                },
                items:[
                    {
                        xtype: 'rownumberer',
                        width:37,
                        text: '序号'
                    },
                    {
                        text: '操作',
                        xtype: 'widgetcolumn',
                        width: 260,
                        tdCls: 'btngroup',
                        dataIndex: 'progress',
                        preventUpdate: false,
                        widget: {
                            xtype: 'buttongroup',
                            baseCls: "",
                            defaultBindProperty: 'system',
                            setSystem:function(){
                                var buttonGroup = this,
                                  record = buttonGroup.getWidgetRecord();
                                var buttons = buttonGroup.items.items;
                                if(record.get('isSysCopied') == 'yes'){
                                    buttons[1].setText('恢复系统设置');
                                    buttons[1].setConfig('command','resume');
                                    buttons[1].setIconCls('btn-edit');
                                }else{
                                    buttons[1].setText('删除');
                                    buttons[1].setConfig('command','delete');
                                    buttons[1].setIconCls('btn-delete');
                                }
                            },
                            layout: {
                                type: "column"
                            },
                            defaults: {
                                handler: "onCommandColumnClick"
                            },
                            items: [{
                                    xtype: "button",
                                    command: "update",
                                    iconCls: "btn-edit",
                                    text: "修改"
                                },
                                {
                                    reference:'isSys',
                                    xtype: "button",
                                    iconCls: "btn-edit",
                                    width:110
                                },
                                {
                                    xtype: "button",
                                    command: "downLoad",
                                    iconCls: "btn-download",
                                    text: "下载模板"
                                }]
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'name',
                        text: '模板名称'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'type',
                        text: '类型',
                        renderer: function (value) {
                            var data = Ext.getStore('TemplateTypeStore').getData().items,
                                text;
                            for(i=0;i<data.length;i++){
                                if(data[i].get("key") == value){
                                    text = data[i].get("value");
                                    break;
                                }
                            }
                            return text;
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'isSysCopied',
                        text: '系统预设',
                        renderer: function (value) {
                            if(value == 'yes'){
                                return '是'
                            }else{
                                return '否'
                            }
                        },
                        width:60
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'pageWidth',
                        text: '纸张宽',
                        width:60
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'pageHeight',
                        text: '纸张高',
                        width:60
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'memo',
                        text: '备注',
                        flex: 1
                    }
                ]
            },
            listeners:{
                itemdblclick:'itemdblclick',
                select:'select'
            }

        },
        {
            xtype: 'panel',
            region:'center',
            html:"<image id='preview' style='width: 100%;'></image>"

        }
    ]

});