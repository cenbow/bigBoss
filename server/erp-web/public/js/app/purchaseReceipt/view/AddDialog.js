Ext.define('PurchaseReceipt.view.AddDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.adddialog',
    modal: true,

    requires: [
        'PurchaseReceipt.view.AddDialogViewController',
        'PurchaseReceipt.view.AddDialogViewModel',
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
    title: '采购收货',

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
              xtype: 'combobox',
              id: 'supplierId',
              fieldLabel: '供应商<span style="color:red">*</span>',
              blankText: '供应商不能为空',
              emptyText: "请选择",
              editable: false,
              allowBlank: false,
              queryMode: 'local',
              displayField: 'name',
              valueField: 'id',
              name: 'supplierId',
              itemId: 'supplier',
              bind: {
                store: '{supplierStore}',
                value: '{supplierId}'
              },
              listeners: {
                change: 'onSupplierChange'
              }
          },{
            xtype: 'datefield',
            fieldLabel: '入库日期',
            name: 'postDate',
            //editable: false,
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
            id: 'whsId',
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
          store: '{purchaseReceiptLineGridStore}'
        },
        padding: 2,
        anchor: '100% 60%',
        region: 'center',
        dockedItems: [{
          xtype: 'toolbar',
          items: [{
            xtype: 'button',
            iconCls: 'btn-add',
            text: '选择采购订单明细',
            listeners: {
              click: 'onButtonChooseClick'
            }
          }]
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
            //align: 'center',
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
              text: '采购订单号',
              xtype: 'gridcolumn',
              align: 'center',
              dataIndex: 'purchaseOrderNo',
              width: 160
            },{
              text: '商品编码',
              xtype: 'gridcolumn',
              align: 'center',
              dataIndex: 'productCode'
            },{
              xtype: 'gridcolumn',
              dataIndex: 'skuCode',             
              text: '规格编码'
            },{
              text: '规则名称',
              xtype: 'gridcolumn',
              dataIndex: 'skuName'
            },{
              xtype: 'numbercolumn',
              format: 0,
              dataIndex: 'remainingQty',
              align: 'right',
              text: '剩余到货'
            },{
              xtype: 'numbercolumn',
              dataIndex: 'purchaseQty',
              align: 'right',
              editor: {
                xtype: 'numberfield',
                minValue:0
              },
              format: 0,
              text: '本次收货数量<span class="pencil"/>'
            },{
            xtype: 'gridcolumn',
            dataIndex: 'purchaseUnit',
            editor: {
              xtype: 'textfield',
              id:'purchaseUnit'
            },
            format: 0,
            text: '采购单位<span class="pencil"/>'
          },{
            xtype: 'gridcolumn',
            dataIndex: 'proportion',
            align: 'right',
            editor: {
              xtype: 'numberfield',
              minValue:1
            },
            format: 0,
            text: '比例<span class="pencil"/>'
          },{
            text: '本次入库数量',
            dataIndex: 'quantity',
            align: 'right',
            xtype: 'gridcolumn'
          },{
              text: '入库库区<span class="pencil"/>',
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
                  store: '{whsAreaStore}'
                }
              },
              renderer: 'renderAreaStore'
            },{
              text: '入库库位',
              xtype: 'gridcolumn',
              dataIndex: 'whsPickLoc'
            },{
              text: '入库成本',
              xtype: 'numbercolumn',
              align: 'right',
              dataIndex: 'price'
            },{
              text: '成本合计',
              xtype: 'numbercolumn',
              align: 'right',
              dataIndex: 'lineTotal'
            },{
              xtype: 'gridcolumn',
              dataIndex: 'memo',
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