Ext.define('PurchaseReturn.view.AddDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.adddialog',
    modal: true,

    requires: [
        'PurchaseReturn.view.AddDialogViewController',
        'PurchaseReturn.view.AddDialogViewModel',
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
    title: '采购退货',

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
            fieldLabel: '出库日期',
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
            id: 'whsId',
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
            fieldLabel: '库区名称',
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
          store: '{returnDetailGridStore}'
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
            cls: 'titleAlign',
            tdCls: 'with-btngroup'
          },
          items: [{
              text: '序号',
              align: 'center',
              xtype: 'rownumberer',
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
              dataIndex: 'purchaseOrderNo'
            },{
              text: '商品编码',
              xtype: 'gridcolumn',
              align: 'center',
              dataIndex: 'productCode'
            },{
              xtype: 'gridcolumn',
              dataIndex: 'skuCode',
              align: 'center',
              text: '规格编码'
            },{
              text: '规则名称',
              xtype: 'gridcolumn',
              align: 'left',
              dataIndex: 'skuName'
            },{
              xtype: 'numbercolumn',
              dataIndex: 'totalStockQty',
              align: 'right',
              format: 0,
              text: '实际入库'
            },{
              xtype: 'numbercolumn',
              dataIndex: 'totalOverReceiptQty',
              format: 0,
              align: 'right',
              text: '超收数量'
            },{
              xtype: 'numbercolumn',
              dataIndex: 'quantity',
              align: 'right',
              editor: {
                xtype: 'numberfield',
                minValue:1
              },
              format: 0,
              text: '本次退货数量<span class="pencil"/>'
            },{
              text: '退货类型<span class="pencil"/>',
              xtype: 'gridcolumn',
              dataIndex: 'type',
              align: 'left',
              editor: {
                xtype: 'combobox',
                editable: false,
                displayField: 'name',
                valueField: 'code',
                emptyText: "请选择",
                queryMode: 'local',
                forceSelection: true,
                bind: {
                  value: '{name}',
                  store: '{purchaseReturnTypeStore}'
                }
              },
              renderer: 'renderType'
            },{
              text: '出库库区<span class="pencil"/>',
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
              text: '出库库位',
              align: 'left',
              xtype: 'gridcolumn',
              dataIndex: 'whsPickLoc'
            },{
              text: '出库成本',
              align: 'right',
              xtype: 'numbercolumn',
              dataIndex: 'price'
            },{
              text: '成本合计',
              align: 'right',
              xtype: 'numbercolumn',
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
            text: '保存并出库'
          },
          {
            itemId: 'cancelBtn',
            xtype: 'button',
            iconCls: 'btn-cancel',
            handler: 'onButtonCancelClick',
            text: '取消出库'
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