/*
 * File: app/view/ShopInfoWindow.js
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

Ext.define('ShopMgmt.view.ShopInfoWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.shopInfoWindow',

    requires: [
        'Common.util.TipsUtil',
        'ShopMgmt.view.ShopInfoWindowViewModel',
        'ShopMgmt.view.ShopInfoWindowViewController',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    controller: 'shopInfoWindow',
    viewModel: {
        type: 'shopinfowindow'
    },
    modal: true,
    height: 320,
    width: 684,
    layout: 'fit',
    bodyPadding: '',
    title: '店铺信息',

    items: [
        {
            xtype: 'form',
            reference: 'form',
            layout: 'column',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'textfield',
                    columnWidth: 1,
                    editable: false,
                    name: 'id',
                    hidden: true,
                    submitValue:false
                },
                {
                    xtype: 'combobox',
                    columnWidth: 0.5,
                    margin: '10 0 0 0',
                    fieldLabel: '渠道类型<span style="color:red">*</span>',
                    name: 'channel',
                    allowBlank: false,
                    editable: false,
                    displayField: 'index',
                    queryMode: 'local',
                    store: 'channelsStore',
                    valueField: 'value'
                },
                {
                    xtype: 'combobox',
                    columnWidth: 0.5,
                    margin: '10 0 0 10',
                    fieldLabel: '发货打印模板',
                    name: 'shippingPrintTplId',
                    editable: false,
                    displayField: 'value',
                    queryMode: 'local',
                    store: 'ShopPrintStore',
                    valueField: 'key'
                },
                {
                    xtype: 'textfield',
                    columnWidth: 1,
                    margin: '10 0 0 0',
                    width: '100%',
                    fieldLabel: '店铺名称<span style="color:red">*</span>',
                    name: 'name',
                    maxLength: 50,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    columnWidth: 1,
                    margin: '10 0 0 0',
                    width: '100%',
                    fieldLabel: '网店网址',
                    maxLength: 100,
                    name: 'webUrl'
                },
                {
                    xtype: 'combobox',
                    columnWidth: 0.5,
                    margin: '10 0 0 0',
                    fieldLabel: '默认发货仓',
                    name: 'shippingWhsId',
                    editable: false,
                    displayField: 'value',
                    queryMode: 'local',
                    store: 'warehousesStore',
                    valueField: 'key'
                },
                {
                    xtype: 'combobox',
                    columnWidth: 0.5,
                    margin: '10 0 0 10',
                    fieldLabel: '默认退货仓',
                    name: 'returnWhsId',
                    editable: false,
                    displayField: 'value',
                    queryMode: 'local',
                    store: 'warehousesStore',
                    valueField: 'key'
                },
                {
                    xtype: 'textareafield',
                    columnWidth: 1,
                    margin: '10 0 0 0',
                    fieldLabel: '备注',
                    name: 'memo'
                },
                {
                    xtype: 'textfield',
                    margin: '10 0 0 0',
                    fieldLabel: '推送地址',
                    columnWidth: 1,
                    name: 'pushUrl'
                }
            ],
           /* buttonsAlign: 'right',
            buttons: [{
                xtype: 'button',
                text: '保存',
                listeners: {
                    click:'save'
                }
            },{
                xtype: 'button',
                text: '取消',
                listeners: {
                    click: 'cancel'
                }
            }],*/
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
                    text: '保存',
                    iconCls:'btn-save',
                    listeners: {
                        click: 'save'
                    }
                },
                {
                    xtype: 'button',
                    text: '取消',
                    iconCls:'btn-cancel',
                    listeners: {
                        click: 'cancel'
                    }
                }
            ]
        }
    ]
});