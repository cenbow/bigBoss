/*
 * File: app/view/MyWindow.js
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

Ext.define('editAccount.view.MainWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.mainwindow',

  requires: [
    'editAccount.view.MainWindowViewController',
    'editAccount.view.MainWindowViewModel',
    'Common.ux.NumberFieldCustom',
    'Ext.form.Panel',
    'Ext.form.field.Display',
    'Ext.form.field.ComboBox',
    'Ext.form.CheckboxGroup',
    'Ext.form.field.Number',
    'Ext.form.field.Checkbox'
  ],

  controller: 'mainwindow',
  viewModel: {
    type: 'mainwindow'
  },
  autoShow: true,
  height: 550,
  width: 810,
  layout: 'fit',
  title: '修改密码',
  closable:false,

  items: [
    {
      xtype: 'form',
      flex: 1,
      defaults: {
        flex: 0.5
      },
      bodyPadding: 10,
      header: false,
      title: 'My Form',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'fieldcontainer',
          flex: 1,
          height: 120,
          width: 400,
          defaults: {
            columnWidth: 1,
            margin: '2 20 20 20'
          },
          layout: 'column',
          fieldLabel: '',
          items: [
           /* {
              xtype: 'textfield',
              name: "userName",
              fieldLabel: '用&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;名&nbsp;',
              readOnly:true,
              regex: /^[a-zA-Z\d_]{4,20}$/i,
              regexText:'登录名长度应在4~20个字符之间，且由英文、数字及“_”自由组合',
              bind:{
                value:'{formData.userName}'
              }
            },*/
            {
              xtype: 'textfield',
              fieldLabel: '原&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码<span style="color:red">*</span>',
              reference: "newPassword",
              //inputType: 'password',
              allowBlank: false,
              blankText: "请输入密码",
              name:'password',
              //regex: /^[a-zA-Z\d\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\|\\\[\]\{\}\;\:\"\'\,\<\.\>\/\?]{6,20}$/i,
              regex: /^[\s\S]{6,20}$/i,
              regexText:'登录密码长度应在6~20个字符之间，且由英文、数字及标点符号组成',
              bind:{
                value:'{formData.password}'
              }
            },
            {
              xtype: 'textfield',
              fieldLabel: '新&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码<span style="color:red">*</span>',
              reference: "newPassword",
              //inputType: 'password',
              allowBlank: false,
              blankText: "请输入新密码",
              name:'newPassword',
              //regex: /^[a-zA-Z\d\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\|\\\[\]\{\}\;\:\"\'\,\<\.\>\/\?]{6,20}$/i,
              regex: /^[\s\S]{6,20}$/i,
              regexText:'登录密码长度应在6~20个字符之间，且由英文、数字及标点符号组成',
              bind:{
                value:'{formData.newPassword}'
              }
            },
            {
              xtype: 'textfield',
              fieldLabel: '确&nbsp;认&nbsp;密&nbsp;码<span style="color:red">*</span>',
              reference: "newPassword",
              //inputType: 'password',
              allowBlank: false,
              blankText: "请输入确认密码",
              name:'confirmPassword',
              //regex: /^[a-zA-Z\d\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\|\\\[\]\{\}\;\:\"\'\,\<\.\>\/\?]{6,20}$/i,
              regex: /^[\s\S]{6,20}$/i,
              regexText:'登录密码长度应在6~20个字符之间，且由英文、数字及标点符号组成',
              bind:{
                value:'{formData.confirmPassword}'
              }
            },

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
          iconCls: 'btn-save',
          text: '保存',
          listeners: {
            click: 'onSaveButtonClick'
          }
        },
        {
          xtype: 'button',
          iconCls: 'btn-cancel',
          text: '重置',
          listeners: {
            click: 'onResetClick'
          },
          handler: function() {
            //this.ownerCt.ownerCt.down('form').getForm().reset();
          }
        }
      ]
    }
  ]
});