Ext.define('GoodsReceipt.view.AddDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.adddialog',
    modal: true,

    requires: [
        'GoodsReceipt.view.AddDialogViewController',
        'GoodsReceipt.view.AddDialogViewModel',
        'GoodsReceipt.view.CommonComboxWithDialog',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Number'
    ],

    controller: 'adddialog',
    viewModel: {
        type: 'adddialog'
    },
    height: 450,
    width: 900,
    bodyStyle: {
        background: '#fff'
    },
    layout: 'anchor',
    frame: true,
    labelSelector: '：',
    title: '杂项入库',

    items: [{
        xtype: 'form',
        reference: 'form',
        layout: 'column',
        bodyPadding: 10,
        anchor: '100% 40%',
        defaults: {
          columnWidth: .5,
          margin: 7,
          labelAlign: 'left',
          labelWidth: 60
        },
        items: [{
            xtype: 'textfield',
            name: 'id',
            hidden: true,
            bind: {
              value: '{id}'
            }
          },{
            xtype: 'commoncomboxwithdialog',
            fieldLabel: '入库类型<span style="color:red">*</span>',
            blankText: '入库类型不能为空',
            name: 'typeId',
            itemId: 'comboType',
            editable: false,
            allowBlank: false,
            emptyText: "请选择",
            displayField: 'name',
            valueField: 'id',
            bind: {
              store: '{receiptTypeStore}',
              value: '{typeId}'
            },
            innerDialogConfig: {
              columnTitle: '类型名称',
              dialogTitle: '入库类型',
              dataIndex: 'name',
              refreshToolbarStore: 'receiptTypeStore,receiptType'
            }
          },{
            xtype: 'datefield',
            fieldLabel: '入库日期',
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
              value: '{postDate}'
            }
          },{
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
            bind: {
              store: '{whsStore}',
              value: '{whsId}'
            },
            listeners: {
              change: 'onWhsChange'
            }
          },{
            itemId: 'whsArea',
            name: 'whsAreaId',
            xtype: 'combobox',
            fieldLabel: '库区名称<span style="color:red">*</span>',
            blankText: '库区名称不能为空',
            emptyText: "请选择",
            editable: false,
            allowBlank: false,
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            bind: {
              store: '{whsAreaStore}',
              value: '{whsAreaId}'
            },
            listeners: {
              change: 'onWhsAreaChange'
            }
          },{
            xtype: 'textareafield',
            fieldLabel: '备注',
            name: 'memo',
            columnWidth: 1,
            maxLength: 255,
            maxLengthText: '备注不能超过255个字符',
            bind: {
              value: '{memo}'
            }
          }
        ]
      },
      {
        xtype: 'gridpanel',
        title: '',
        header: false,
        bind: {
          store: '{receiptDetailGridStore}'
        },
        padding: 2,
        anchor: '100% 60%',
        region: 'center',
        dockedItems: [{
          xtype: 'toolbar',
          items: [{
              xtype: 'button',
              text: '添加',
              iconCls: 'btn-add',
              listeners: {
                click: 'onButtonLineAddClick'
              }
            },{
              xtype: 'button',
              iconCls: 'btn-batch-import',
              text: '商品批量导入',
              listeners: {
                click: 'onButtonBatchInputClick'
              }
            },
            {
              xtype: 'textfield',
              fieldLabel: '扫描条码',
              itemId: 'fastSearchField',
              labelWidth: 60,
              listeners: {
                specialKey: 'onFastSearch'
              }
            }
          ]
        }],
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
        	cls: 'titleAlign',
            tdCls: 'with-btngroup'
          },
          items: [{
              text: '序号',
              xtype: 'rownumberer',
              align: 'center',
              width: 37
            },{
              xtype: 'widgetcolumn',
              width: 50,
              text: '操作',
              align: 'center',
              tdCls: 'btngroup',
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
            },{
              text: '商品编码',
              xtype: 'gridcolumn',
              align: 'center',
              dataIndex: 'productCode'
            },{
              xtype: 'gridcolumn',
              align: 'center',
              dataIndex: 'skuCode',
              editor: {
                xtype: 'textfield',
                triggers: {
                  mytrigger: {
                    handler: 'onButtonChooseClick',
                    cls: 'x-form-ellipsis-trigger'
                  }
                }
              },
              text: '规格编码<span class="pencil"/>'
            },{
              text: '规则名称',
              align: 'left',
              xtype: 'gridcolumn',
              dataIndex: 'skuName'
            },{
              text: '入库库区<span class="pencil"/>',
              xtype: 'gridcolumn',
              align: 'left',
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
                  store: '{whsAreaStore}'
                }
              },
              renderer: 'renderAreaStore'
            },{
              text: '入库库位',
              xtype: 'gridcolumn',
              align: 'left',
              dataIndex: 'whsPickLoc'
            },{
              text: '成本单价',
              xtype: 'numbercolumn',
              align: 'right',
              dataIndex: 'stockPrice'
            },{
              xtype: 'numbercolumn',
              dataIndex: 'purchaseQty',
              align: 'right',
              editor: {
                xtype: 'numberfield',
                minValue:0
              },
              format: 0,
              text: '收货数量<span class="pencil"/>'
            },{
              text: '收货单位<span class="pencil"/>',
              xtype: 'gridcolumn',
              align: 'center',
              dataIndex: 'purchaseUnit',
              editor: {
                xtype: 'textfield'
              }
            },{
              text: '比例<span class="pencil"/>',
              xtype: 'numbercolumn',
              align: 'right',
              editor: {
                xtype: 'numberfield',
                minValue:0
              },
              format: 0,
              dataIndex: 'proportion'
            },{
              text: '入库数量',
              xtype: 'numbercolumn',
              align: 'right',
              format: 0,
              dataIndex: 'quantity'
            },{
              text: '入库成本<span class="pencil"/>',
              xtype: 'numbercolumn',
              align: 'right',
              editor: {
                xtype: 'numberfield',
                minValue:0
              },
              dataIndex: 'price'
            },{
              text: '成本合计',
              xtype: 'numbercolumn',
              align: 'right',
              dataIndex: 'lineTotal'
            },{
              xtype: 'gridcolumn',
              dataIndex: 'memo',
              align: 'left',
              editor: {
                xtype: 'textfield'
              },
              text: '备注<span class="pencil"/>'
            }
          ]
        }
      }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        items: [{
            xtype: 'tbfill'
          },
          {
            itemId: 'saveDraftBtn',
            xtype: 'button',
            iconCls: 'btn-save',
            handler: 'onButtonSaveDraftClick',
            text: '保存至草稿'
          },
          {
            itemId: 'savePostBtn',
            xtype: 'button',
            iconCls: 'btn-save',
            handler: 'onButtonSavePostClick',
            text: '保存并入库'
          },
          {
            itemId: 'cancelBtn',
            xtype: 'button',
            iconCls: 'btn-cancel',
            handler: 'onButtonCancelClick',
            text: '取消入库'
          },
          {
            itemId: 'closeBtn',
            xtype: 'button',
            iconCls: 'btn-cancel',
            handler: 'onButtonCloseClick',
            text: '关闭'
          }
        ]
      }
    ]
});