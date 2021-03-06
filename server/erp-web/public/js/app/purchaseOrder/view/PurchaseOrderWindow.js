/*
 * File: app/view/PurchaseOrderWindow.js
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

Ext.define('PurchaseOrder.view.PurchaseOrderWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.purchaseorderwindow',

    requires: [
        'PurchaseOrder.view.PurchaseOrderWindowViewModel',
        'PurchaseOrder.view.PurchaseOrderWindowViewController',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.form.field.Number',
        'Ext.grid.column.Date',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],
    controller: 'purchaseorderwindow',
    viewModel: {
        type: 'purchaseorderwindow'
    },
    modal: true,
    height: 551,
    modelValidation: false,
    width: 600,
    layout: 'fit',
    title: '采购订单',

    items: [
        {
            xtype: 'form',
            reference:'form',
            layout: 'border',
            bodyPadding: 10,
            bodyStyle: 'background-color:#FFFFFF;',
            items: [
                {
                    xtype: 'fieldset',
                    region: 'north',
                    height: 150,
                    layout: 'column',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'supplierId',
                            columnWidth: 0.5,
                            margin: '10 10 0 0',
                            fieldLabel: '供应商<span style="color:red">*</span>',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            blankText:'必填',
                            forceSelection: true,
                            allowBlank: false,
                            bind: {
                                store: '{SupplierStore}',
                                value: '{formData.supplierId}'
                            },
                            labelWidth: 70
                        },
                        {
                            xtype: 'datefield',
                            name: 'orderTime',
                            columnWidth: 0.5,
                            margin: '10 10 0 30',
                            format: 'Y/m/d',
                            blankText:'必填',
                            allowBlank: false,
                            editable: false,
                            bind: {
                                value: '{formData.orderTime}'
                            },
                            valueToRaw: function(value) {
                                var me = this;
                                if(!Ext.isDate(value)) {
                                    value = new Date(Number(value))
                                }
                                return me.formatDate(me.parseDate(value));
                            },
                            formatText:'',
                            fieldLabel: '业务日期<span style="color:red">*</span>',
                        },
                        {
                            xtype: 'combobox',
                            columnWidth: 0.5,
                            name: 'whsId',
                            margin: '10 10 0 0',
                            fieldLabel: '仓库名称<span style="color:red">*</span>',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            blankText:'必填',
                            forceSelection: true,
                            allowBlank: false,
                            bind: {
                                store: '{CommonWhsStore}',
                                value: '{formData.whsId}'
                            },
                            labelWidth: 70
                        },
                        {
                            xtype: 'datefield',
                            name: 'expectedReceiptDate',
                            columnWidth: 0.5,
                            margin: '10 10 0 30',
                            format: 'Y/m/d',
                            blankText:'必填',
                            editable: false,
                            allowBlank: false,
                            valueToRaw: function(value) {
                                var me = this;
                                if(!Ext.isDate(value)) {
                                    value = new Date(Number(value))
                                }
                                return me.formatDate(me.parseDate(value));
                            },
                            bind: {
                                value: '{formData.expectedReceiptDate}'
                            },
                            formatText:'',
                            submitFormat: "Y/n/j",
                            fieldLabel: '预计收货日期<span style="color:red">*</span>',
                            listeners: {
                                select: 'refreshDate'
                            }
                        },
                        {
                            xtype: 'textareafield',
                            name: 'memo',
                            columnWidth: 1,
                            height: 58,
                            margin: '10 10 0 0',
                            fieldLabel: '备注',
                            maxLength: 254,
                            maxLengthText: '备注不能超过254个字符',
                            bind: {
                                value: '{formData.memo}'
                            },
                            labelWidth: 70
                        },
                        {
                            xtype: 'textfield',
                            name: 'id',
                            bind: {
                                value: '{formData.id}'
                            },
                            hidden: true
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    bind: {
                        store: '{OrderDetailWindowStore}'
                    },
                    columns: {
                        default:{
                            cls: 'titleAlign'
                        },
                        items:[
                            {
                                xtype: 'rownumberer',
                                width: 50,
                                text: '序号'
                            },
                            {
                                xtype: 'widgetcolumn',
                                width: 40,
                                tdCls: 'btngroup',
                                text: '操作',
                                widget: {
                                    xtype: 'buttongroup',
                                    baseCls: '',
                                    layout: {
                                        type: 'column'
                                    },
                                    defaults: {
                                        handler: 'onCommandColumnClick'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            command: 'Delete',
                                            iconCls: 'btn-delete'
                                        }
                                    ]
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'productCode',
                                text: '商品编码'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'skuCode',
                                text: '规格编码<span class="pencil"></span>',
                                editor: {
                                    xtype: 'textfield',
                                    editable: false,
                                    triggers: {
                                        mytrigger: {
                                            handler: 'chooseGoods',
                                            cls: 'x-form-ellipsis-trigger'
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'skuName',
                                text: '规格名称'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'purchaseQty',
                                align: 'right',
                                text: '采购数量<span class="pencil"></span>',
                                format: '000000000',
                                editor: {
                                    xtype: 'numberfield',
                                    blankText:'必填',
                                    allowBlank: false,
                                    maxLength: 9,
                                    enforceMaxLength: true,
                                    minValue: 1,
                                    listeners: {
                                        change: 'changePurchaseQty'
                                    }
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'purchaseUnit',
                                text: '采购单位<span class="pencil"></span>',
                                editor: {
                                    xtype: 'textfield',
                                    maxLength: 20,
                                    enforceMaxLength: true,
                                    maxLengthText: '长度限制在20个字符内'
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'proportion',
                                align: 'right',
                                text: '比例<span class="pencil"></span>',
                                format: '000000000',
                                editor: {
                                    xtype: 'numberfield',
                                    blankText:'必填',
                                    allowBlank: false,
                                    maxLength: 9,
                                    enforceMaxLength: true,
                                    minValue: 1,
                                    listeners: {
                                        change: 'changeProportion'
                                    }
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'quantity',
                                align: 'right',
                                text: '总采购数量',
                                format: '000000000'
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'price',
                                text: '采购单价<span class="pencil"></span>',
                                align: 'right',
                                format: '000000000.00',
                                editor: {
                                    xtype: 'numberfield',
                                    blankText:'必填',
                                    allowBlank: false,
                                    maxLength: 11,
                                    enforceMaxLength: true,
                                    minValue:0.01,
                                    formBind:true,
                                    listeners: {
                                        change: 'changePrice'
                                    },
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'lineTotal',
                                align: 'right',
                                text: '采购合计'
                            },
                            {
                                xtype: 'datecolumn',
                                dataIndex: 'expectedReceiptDate',
                                text: '预计收货日期<span class="pencil"></span>',
                                align: 'center',
                                format: "Y/n/j",
                                editor: {
                                    xtype: 'datefield',
                                    format: "Y/n/j",
                                    editable: false
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'memo',
                                text: '备注<span class="pencil"></span>',
                                editor: {
                                    xtype: 'textfield',
                                    maxLength: 254,
                                    enforceMaxLength: true,
                                    maxLengthText: '长度限制在254个字符内'

                                }
                            }
                        ]
                    },
                    plugins: [
                        {
                            ptype: 'cellediting',
                            clicksToEdit: 1
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    margin: '5 10 10 5',
                    iconCls: 'btn-save',
                    text: '保存至草稿',
                    handler: 'saveDraft',
                    bind: {
                        hidden: '{hideDraftBtn}'
                    }
                },
                {
                    xtype: 'button',
                    margin: '5 10 10 5',
                    iconCls: 'btn-save',
                    text: '保存并执行',
                    handler: 'savePending',
                },
                {
                    xtype: 'button',
                    margin: '5 10 10 5',
                    iconCls: 'btn-cancel',
                    text: '取消本次采购',
                    bind: {
                        hidden: '{hideCancelBtn}'
                    },
                    handler: 'cancel'
                },
                {
                    xtype: 'button',
                    margin: '5 10 10 5',
                    iconCls: 'btn-cancel',
                    text: '关闭',
                    handler: 'close'
                }
            ]
        }
    ]

});