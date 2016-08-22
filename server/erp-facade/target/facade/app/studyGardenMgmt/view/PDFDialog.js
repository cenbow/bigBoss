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
Ext.define('StudyGardenMgmt.view.PDFDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.pdfdialog',

    requires: [
        'StudyGardenMgmt.view.PDFDialogViewController',
        'StudyGardenMgmt.view.PDFDialogViewModel',
        'Common.ux.CustomVTypes',
        'StudyGardenMgmt.store.CategoryByUpClassIdComboboxStore'
    ],

    controller: 'pdfdialog',
    viewModel: {
        type: 'pdfdialog'
    },
    height: 410,
    width: 450,
    layout: 'fit',
    iconCls: 'permission',
    constrainHeader: true,
    modal: true,
    title: '添加附件',

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
                    xtype: 'filefield',
                    fieldLabel: '上传文件',
                    name: 'file'
                },
                {
                    xtype:'textfield',
                    name:'id',
                    hidden:true,
                    bind: {
                        value: "{formData.id}"
                    }
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