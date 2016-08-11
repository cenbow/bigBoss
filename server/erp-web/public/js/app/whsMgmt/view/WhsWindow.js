/*
 * File: app/view/WhsWindow.js
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

Ext.define('WhsMgmt.view.WhsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.whswindow',

    requires: [
        'WhsMgmt.view.WhsWindowViewModel',
        'WhsMgmt.view.WhsWindowViewController',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox'
    ],
    controller: 'whsWindow',
    viewModel: {
        type: 'whswindow'
    },
    modal: true,
    bind: {
        height: '{windowHeight}',
    },
    width: 651,
    layout:'fit',
    iconCls: 'chart_pie',
    title: '仓库信息',
    listeners: {
    },
    items: [
        {
            xtype: 'form',
            reference: 'form',
            region: 'center',
            title: '',
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    layout: 'column',
                    margin: '10 10 10 10',
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            hidden: true,
                            fieldLabel: 'id',
                            name:'id',
                            bind: {
                                value: '{formData.id}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'code',
                            columnWidth: 0.5,
                            margin: '10 0 0 0',
                            fieldLabel: '仓库编码',
                            maxLengthText: '必填，长度限制为18个字符内',
                            enforceMaxLength: true,
                            maxLength : 18,
                            emptyText: '不填则系统自动生成',
                            bind: {
                                value: '{formData.code}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'name',
                            columnWidth: 0.5,
                            margin: '10 0 10 10',
                            fieldLabel: '仓库名称<span style="color:red">*</span>',
                            blankText:'必填',
                            maxLengthText: '必填，长度限制为20个字符内',
                            allowBlank: false,
                            emptyText: '必填',
                            enforceMaxLength: true,
                            maxLength : 20,
                            bind: {
                                value: '{formData.name}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'zipCode',
                            columnWidth: 0.5,
                            fieldLabel: '邮政编码',
                            maxLength: 8,
                            enforceMaxLength: true,
                            maxLengthText: '长度限制在8个字符内',
                            //regex: /[1-9][0-9]{5}/,
                            //regexText: '请输入正确的邮政编码',
                            bind: {
                                value: '{formData.zipCode}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'type',
                            columnWidth: 0.5,
                            margin: '0 0 10 10',
                            fieldLabel: '仓库类型<span style="color:red">*</span>',
                            emptyText: "请选择",
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            blankText: '请设置仓库类型',
                            allowBlank: false,
                            listeners: {
                                select: 'changeWhsType'
                            },
                            bind: {
                                store: '{whstypestore}',
                                value: '{formData.type}',
                                disabled: '{formData.id}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'contactName',
                            columnWidth: 0.5,
                            fieldLabel: '联系人',
                            maxLengthText: '长度限制在20个字符内',
                            enforceMaxLength: true,
                            maxLength : 20,
                            bind: {
                                value: '{formData.concatName}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'contactPhone',
                            columnWidth: 0.5,
                            margin: '0 0 10 10',
                            fieldLabel: '联系方式',
                            maxLengthText: '长度限制在20个字符内',
                            enforceMaxLength: true,
                            maxLength : 20,
                            //regex: /0?(13|15|17|18|14)[0-9]{9}/,
                            //regexText: '请输入正确的联系方式',
                            bind: {
                                value: '{formData.contactPhone}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'provinceId',
                            id: 'provinceId',
                            columnWidth: 0.5,
                            emptyText: "省",
                            queryMode: 'local',
                            fieldLabel: '城市',
                            editable: false,
                            //forceSelection: true,
                            displayField: 'name',
                            //forceSelection: true,
                            valueField: 'id',
                            listeners: {
                                select: 'changeProvince'
                            },
                            bind: {
                                store: '{provincestore}',
                                value: '{formData.provinceId}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'cityId',
                            id:'cityId',
                            emptyText: "市",
                            queryMode: 'local',
                            forceSelection: true,
                            columnWidth: 0.25,
                            margin: '0 0 0 5',
                            hideLabel: true,
                            editable: false,
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            listeners: {
                                select: 'changeCity'
                            },
                            bind: {
                                store: '{citystore}',
                                value: '{formData.cityId}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'districtId',
                            id:'districtId',
                            emptyText: "区（县）",
                            queryMode: 'local',
                            columnWidth: 0.25,
                            margin: '0 0 10 5',
                            fieldLabel: 'Label',
                            hideLabel: true,
                            editable: false,
                            displayField: 'name',
                            forceSelection: true,
                            valueField: 'id',
                            bind: {
                                store: '{countystore}',
                                value: '{formData.districtId}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'address',
                            columnWidth: 1,
                            margin: '0 0 10 0',
                            fieldLabel: '详细地址',
                            maxLength: 255,
                            maxLengthText: '长度限制为255个字符内',
                            enforceMaxLength: true,
                            bind: {
                                value: '{formData.address}'
                            }

                        },
                        {
                            xtype: 'combobox',
                            id: 'pickAreaId',
                            name: 'pickAreaId',
                            columnWidth: 0.5,
                            margin: '0 0 10 0',
                            queryMode: 'local',
                            emptyText: "拣货区",
                            fieldLabel: '默认拣货区',
                            editable: false,
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            bind: {
                                store: '{gaingoodsareasstore}',
                                value: '{formData.pickAreaId}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'returnAreaId',
                            name: 'returnAreaId',
                            columnWidth: 0.5,
                            margin: '0 0 10 10',
                            queryMode: 'local',
                            emptyText: "退货区",
                            fieldLabel: '默认退货区',
                            editable: false,
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            bind: {
                                store: '{gaingoodsareasstore}',
                                value: '{formData.returnAreaId}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'orderDeliverType',
                            name: 'orderDeliverType',
                            columnWidth: 0.5,
                            margin: '0 0 10 0',
                            queryMode: 'local',
                            emptyText: "请选择",
                            fieldLabel: '订单发货类型',
                            editable: false,
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            bind: {
                                hidden: '{!isDomestic}',
                                store: '{delivertypestore}',
                                value: '{formData.orderDeliverType}',
                                disabled: '{!isDomestic}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'virtualDistPlatform',
                            columnWidth: 0.5,
                            margin: '0 0 10 0',
                            queryMode: 'local',
                            emptyText: "请选择",
                            fieldLabel: '虚拟分销平台',
                            editable: false,
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            bind: {
                                hidden: '{!isVistualDist}',
                                store: '{extenalplatformstore}',
                                value: '{formData.virtualDistPlatform}',
                                disabled: '{!isVistualDist}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin: '10 10 10 10',
                    layout: 'column',
                    title: '',
                    bind:{
                        hidden: '{!isBondedArea}'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'customsModel',
                            id:'customsModel',
                            columnWidth: 0.5,
                            margin: '10 0 0 0',
                            emptyText: "请选择",
                            queryMode: 'local',
                            fieldLabel: '通关模式',
                            editable: false,
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            bind: {
                                store: '{customstypestore}',
                                value: '{formData.customsModel}',
                                disabled: '{!isBondedArea}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'customsId',
                            id: 'customs',
                            columnWidth: 0.5,
                            margin: '10 0 0 10',
                            emptyText: "请选择",
                            fieldLabel: '报关海关（默认）',
                            editable: false,
                            forceSelection: true,
                            displayField: 'name',
                            valueField: 'id',
                            bind: {
                                store: '{customsstore}',
                                value: '{formData.customsId}',
                                disabled: '{!isBondedArea}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'shipperName',
                            columnWidth: 0.5,
                            margin: '10 0 0 0',
                            width: 150,
                            fieldLabel: '发货人名称',
                            maxLength: 60,
                            maxLengthText: '长度限制为60个字符内',
                            enforceMaxLength: true,
                            bind: {
                                value: '{formData.shipperName}',
                                disabled: '{!isBondedArea}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'shipperPhone',
                            columnWidth: 0.5,
                            margin: '10 0 10 10',
                            fieldLabel: '发货人电话',
                            maxLengthText: '长度限制为20个字符内',
                            enforceMaxLength: true,
                            maxLength : 20,
                            //regex: /^(1[34578])\d{9}$/,
                            //regexText: '请输入正确的手机号码',
                            bind: {
                                value: '{formData.shipperPhone}',
                                disabled: '{!isBondedArea}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'shipperAddress',
                            columnWidth: 1,
                            margin: '0 0 10 0',
                            fieldLabel: '发货人地址',
                            maxLength: 255,
                            maxLengthText: '长度限制为255个字符内',
                            enforceMaxLength: true,
                            bind: {
                                value: '{formData.shipperAddress}',
                                disabled: '{!isBondedArea}'
                            }

                        },
                        {
                            xtype: 'textfield',
                            name: 'shipperCountryCiq',
                            columnWidth: 0.5,
                            fieldLabel: '发货国编码（检）',
                            maxLength: 10,
                            maxLengthText: '长度限制在10个字符内',
                            enforceMaxLength: true,
                            bind: {
                                value: '{formData.shipperCountryCip}',
                                disabled: '{!isBondedArea}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'shipperCountryCus',
                            columnWidth: 0.5,
                            margin: '0 0 10 10',
                            fieldLabel: '发货国编码（关）',
                            maxLength: 10,
                            maxLengthText: '长度限制在10个字符内',
                            enforceMaxLength: true,
                            bind: {
                                value: '{formData.shipperCountryCus}',
                                disabled: '{!isBondedArea}'
                            }
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
                    enableToggle: true,
                    text: '确认',
                    iconCls: 'btn-save',
                    listeners: {
                        click: 'save'
                    }
                },
                {
                    xtype: 'button',
                    text: '取消',
                    iconCls: 'btn-cancel',
                    listeners: {
                        click: 'onButtonCancelClick'
                    }
                }
            ]
        }
    ]
});