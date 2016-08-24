/*
 * File: app/view/InfoDialog.js
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
Ext.define('InformationMgmt.view.InfoDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.infodialog',

    requires: [
        'InformationMgmt.view.InfoDialogViewController',
        'InformationMgmt.view.InfoDialogViewModel',
        'Common.ux.CustomVTypes',
        'InformationMgmt.store.CategoryByUpClassIdComboboxStore'
    ],

    controller: 'infodialog',
    viewModel: {
        type: 'infodialog'
    },
    height: 410,
    width: 450,
    layout: 'fit',
    iconCls: 'permission',
    constrainHeader: true,
    modal: true,
    title: '信息披露',

    items: [
        {
            xtype: 'form',
            reference: 'form',
            border: false,
            scrollable: 'y',
            defaults: {
                anchor: '100%',
                labelWidth: 125
            },
            bodyPadding: '10 10 10 15',
            title: '',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: '信息标题<span style="color:red">*</span>',
                    allowBlank: false,
                    name: 'name',
                    bind: {
                        value: "{formData.name}"
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: '一级分类<span style="color:red">*</span>',
                    editable: false,
                    allowBlank: false,
                    name: 'levelOne',
                    queryMode: 'local',
                    displayField: 'value',
                    valueField: 'key',
                    store:'CategoryComboboxStore',
                    listeners:{
                        change:'changeLevelOne'
                    },
                    bind: {
                        value: '{formData.levelOne}'
                    }
                },
                {
                    xtype: 'combobox',
                    editable: false,
                    fieldLabel: '二级分类',
                    id:'levelTwo',
                    queryMode: 'local',
                    displayField: 'value',
                    valueField: 'key',
                    name: 'levelTwo',
                    bind: {
                        store: '{categorybyupclassidcomboboxstore}',
                        value: '{formData.levelTwo}'
                    }
                },
                {
                    xtype: 'filefield',
                    fieldLabel: '上传文件',
                    name: 'file'
                },
                {
                    xtype: 'htmleditor',
                    fieldLabel: '正文',
                    height: 200,
                    name: 'text',
                    bind: {
                        value: '{formData.text}'
                    }
                },{
                    xtype:'textfield',
                    name:'columnCode',
                    value:"0001",
                    hidden:true
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
                    iconCls: 'btn-save',
                    text: '保存',
                    listeners: {
                        click: 'onSaveButtonClick'
                    },
                    bind: {
                        hidden: "{isView}"
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'btn-cancel',
                    text: '取消',
                    listeners: {
                        click: 'onCancelButtonClick'
                    }
                }
            ]
        }
    ]

});