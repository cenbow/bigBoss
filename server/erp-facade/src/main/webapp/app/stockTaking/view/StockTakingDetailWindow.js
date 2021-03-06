/*
 * File: app/view/StockTakingDetailWindow.js
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

Ext.define('StockTaking.view.StockTakingDetailWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.stocktakingdetailwindow',

  requires: [
    'StockTaking.view.StockTakingDetailWindowViewModel',
    'StockTaking.view.StockTakingDetailWindowViewController',
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.form.field.TextArea',
    'Ext.grid.Panel',
    'Ext.view.Table',
    'Ext.toolbar.Toolbar',
    'Ext.grid.column.RowNumberer',
    'Ext.grid.column.Widget',
    'Ext.button.Button'
  ],

  viewModel: {
    type: 'stocktakingdetailwindow'
  },

  controller:'stocktakingdetailwindow',

  height: 493,
  width: 650,
  layout: 'fit',
  title: '盘点单信息',
  modal: true,
  items: [
    {
      xtype: 'form',
      height: 150,
      layout: 'border',
      bodyPadding: 10,
      header: false,
      bodyStyle: {
        background: '#fff'
      },
      items: [
        {
          xtype: 'fieldset',
          region: 'north',
          height: 150,
          defaults: {
            columnWidth: 0.5,
            margin: 4,
            labelAlign: 'left',
            labelWidth: 100
          },
          style:{

          },
          layout: 'column',
          items: [
            {
              xtype:'textfield',
              name:'id',
              hidden:true
            },
            {
              xtype:'combobox',
              fieldLabel: '盘点类型<span style="color:red">*</span>',
              emptyText: "请选择",
              editable: false,
              allowBlank: false,
              name:'type',
              displayField:'value',
              valueField:'type',
              store:'StockTakingTypeStore',
              queryMode:'local',
              itemId: 'takingType',
              bind:{
                readOnly: '{isReadOnly}'
              }
            },
            {
              xtype: 'datefield',
              fieldLabel: '盘点日期<span style="color:red">*</span>',
              name: 'postDate',
              editable: false,
              format: "Y/n/j",
              maxValue: new Date(),
              valueToRaw: function(value) {
                var me = this;
                if(!Ext.isDate(value)) {
                  value = new Date(Number(value))
                }
                return me.formatDate(me.parseDate(value));
              },
              bind: {
                readOnly: '{isReadOnly}'
              }
            },
            {
              xtype: 'combobox',
              fieldLabel: '仓库名称<span style="color:red">*</span>',
              blankText: '仓库名称不能为空',
              emptyText: "请选择",
              editable: false,
              allowBlank: false,
              queryMode: 'local',
              displayField: 'name',
              valueField: 'id',
              name: 'whsId',
              itemId: 'whs',
              bind:{
                value:'{whsId}',
                store:'{commonwhsstore}',
                readOnly: '{isReadOnly}'
              },
              listeners:{
                change:'onWhsChange'
              }
            },
            {
              xtype: 'textareafield',
              columnWidth: 1,
              fieldLabel: '备注',
              maxLength:250,
              name:'memo',
              bind:{
                readOnly: '{isNotUpdate}'
              }
            }
          ]
        },
        {
          xtype: 'gridpanel',
          region: 'center',
          header: false,
          bind:{
            store:'{detailGridStore}'
          },
          dockedItems: [
            {
              xtype: 'toolbar',
              dock: 'top',
              id:'girdTool',
              items: [
                {
                  xtype: 'button',
                  itemId:'add',
                  text: '添加',
                  iconCls: 'btn-add',
                  listeners: {
                    click: 'onButtonLineAddClick'
                  },
                  hidden:true
                },
                {
                  xtype: 'textfield',
                  itemId:'fastSearchField',
                  fieldLabel: '扫描条形码',
                  listeners:{
                    specialKey:'onFastSearch'
                  },
                  hidden:true
                },
                {
                  xtype: 'tbfill'
                },
                {
                  xtype: 'textfield',
                  itemId:'viewSearchField',
                  fieldLabel: '快速搜索',
                  labelAlign: 'right',
                  emptyText: '商品编码/规格编码/规格名称/条形码',
                  triggers: {
                    mytrigger: {
                      handler: 'onButtonSearchClick',
                      cls: 'x-form-search-trigger'
                    }
                  },
                  listeners: {
                    specialkey: 'onSearchEnter'
                  },
                  hidden:true
                }
              ]
            }
          ],
          selModel: 'cellmodel',
          plugins: {
            ptype: 'cellediting',
            clicksToEdit: 1,
            listeners: {
              edit: 'editRow'
            }
          },
          columns: {
            defaults: {
              align: 'center',
              tdCls: 'with-btngroup'
            },
            items:[
              {
                xtype: 'rownumberer',
                width: 50,
                text: '序号'
              },
              {
                xtype: 'widgetcolumn',
                id: 'wcDel',
                width: 35,
                tdCls: 'btngroup',
                hidden:true,
                widget: {
                  xtype: 'buttongroup',
                  baseCls: '',
                  layout: {
                    type: 'column'
                  },
                  defaults: {
                    handler: 'onCommandColumnClick'
                  },
                  items: [{
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
                editor: {
                  xtype: 'textfield',
                  triggers: {
                    mytrigger: {
                      handler: 'onButtonChooseClick',
                      cls: 'x-form-ellipsis-trigger'
                    }
                  },
                  bind:{
                    readOnly: '{isReadOnly}'
                  }
                },
                text: '规格编码<span class="pencil"/>'
              },
              {
                xtype: 'gridcolumn',
                dataIndex: 'skuName',
                text: '规格名称'
              },
              {
                text: '库区<span class="pencil"/>',
                xtype: 'gridcolumn',
                dataIndex: 'whsAreaId',
                editor: {
                  xtype: 'combobox',
                  editable: false,
                  displayField: 'name',
                  valueField: 'id',
                  emptyText: "请选择",
                  queryMode: 'local',
                  forceSelection: true,
                  bind: {
                    value: '{name}',
                    store: '{commonwhsareastore}',
                    readOnly: '{isReadOnly}'
                  },
                  listeners:{
                    select:'selectedArea'
                  }
                },
                renderer: 'renderAreaStore'
              },
              {
                xtype: 'gridcolumn',
                dataIndex: 'whsPickLoc',
                text: '库位'
              },
              {
                xtype: 'gridcolumn',
                text: '盘点前',
                defaults: {
                  align: 'center',
                  tdCls: 'with-btngroup'
                },
                columns: [
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'beforeQty',
                    text: '实际库存数'
                  },
                  {
                    xtype: 'numbercolumn',
                    dataIndex: 'beforePrice',
                    text: '单件采购成本'
                  }
                ]
              },
              {
                xtype: 'gridcolumn',
                text: '本次盘点',
                defaults: {
                  align: 'center',
                  tdCls: 'with-btngroup'
                },
                columns: [
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'afterQty',
                    text: '盘点数量',
                    editor: {
                      xtype: 'textfield',
                      listeners : {
                        blur : 'qtyChange'
                      },
                      bind:{
                        readOnly: '{isNotUpdate}'
                      }
                    }

                  }
                ]
              },
              {
                xtype: 'gridcolumn',
                text: '盘点差异',
                defaults: {
                  align: 'center',
                  tdCls: 'with-btngroup'
                },
                columns: [
                  {
                    xtype: 'numbercolumn',
                    dataIndex: 'differencePrice',
                    text: '差异数单价',
                    editor: {
                      xtype: 'textfield',
                      listeners : {
                        blur : 'priceChange'
                      },
                      bind:{
                        readOnly: '{isView}'
                      }
                    }
                  },
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'differenceQty',
                    text: '差异数量'
                  },
                  {
                    xtype: 'numbercolumn',
                    dataIndex: 'differenceLineTotal',
                    text: '盘点差异总额'
                  }
                ]
              }
            ]
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
        '->',
        {
          xtype: 'button',
          id:'btnSaveApprove',
          text: '保存并提审',
          iconCls: 'btn-save',
          listeners:{
            click:'submitApprove'
          },
          hidden:true
        },
        {
          xtype: 'button',
          id:'btnSaveDraft',
          text: '保存至草稿',
          iconCls: 'btn-save',
          listeners:{
            click:'submitDraft'
          },
          hidden:true
        },
        {
          xtype: 'button',
          id:'btnPass',
          text: '通过并更新库存',
          iconCls: 'btn-save',
          listeners:{
            click:'passAndUpdate'
          },
          hidden:true
        },
        {
          xtype: 'button',
          id:'btnReturn',
          text: '打回待审',
          iconCls: 'btn-cancel',
          listeners:{
            click:'returnWait'
          },
          hidden:true
        },
        {
          xtype: 'button',
          id:'btnCancel',
          text: '取消',
          iconCls: 'btn-cancel',
          listeners:{
            click:'cancelWindow'
          }
        }
      ]
    }
  ]

});