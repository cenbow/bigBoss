Ext.define('ProductMgmt.view.MainViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.mainviewport',

  requires: [
    'ProductMgmt.view.MainViewportViewController',
    'ProductMgmt.view.MainViewportViewModel',
    'Ext.tree.Panel',
    'Ext.tree.View',
    'Ext.button.Button',
    'Ext.grid.Panel',
    'Ext.menu.Menu',
    'Ext.menu.Item',
    'Ext.form.field.ComboBox',
    'Ext.form.trigger.Trigger',
    'Ext.grid.column.RowNumberer',
    'Ext.selection.CheckboxModel',
    'Ext.toolbar.Paging',
    'Ext.grid.column.Check'
  ],

  controller: 'mainviewport',
  viewModel: {
    type: 'mainviewport'
  },
  layout: 'border',

  items: [
    {
      xtype: 'treepanel',
      collapseMode: 'mini',
      reference: 'catelogNav',
      region: 'west',
      split: true,
      width: 260,
      collapsible: true,
      header: false,
      title: '商品类目导航',
      rootVisible: true,
      animate: true,
      useArrows: true,
      bufferedRenderer: false,
      root: {
        text: '所有商品类目',
        expanded: true
      },
      bind: {
        store: '{leftcategorytreestore}'
      },
      listeners: {
        itemclick: 'onWestCatelogNavTreePanelItemClick'
      },
      dockedItems: [
        {
          xtype: 'toolbar',
          dock: 'top',
          items: [
            {
              xtype: 'button',
              iconCls: 'btn-add',
              text: '添加',
              bind: {
                disabled: '{westAddBtnStatus}'
              },
              listeners: {
                click: 'onAddWestCatalogButtonClick'
              }
            },
            {
              xtype: 'button',
              iconCls: 'btn-edit',
              text: '修改',
              bind: {
                disabled: '{westUpdateBtnStatus}'
              },
              listeners: {
                click: 'onUpdateWestCatalogButtonClick'
              }
            }
          ]
        }
      ]
    },
    {
      xtype: 'gridpanel',
      region: 'center',
      cls: 'productmgmt-center',
      title: '商品资料主页',
      header: false,
      features: [{
        ftype: 'grouping',
        groupHeaderTpl: '商品名称: {name}',
        hideGroupedHeader: true,
        startCollapsed: false,
        id: 'restaurantGrouping'
      }],
      reference: 'productMgmtGrid',
      bind: {
        store: '{centergridstore}'
      },
      listeners: {
        itemdblclick: '_onMainViewportItemDbClick'
      },

      dockedItems: [
        {
          xtype: 'toolbar',
          dock: 'top',
          items: [
            {
              xtype: 'button',
              iconCls: 'btn-add',
              text: '添加',
              action: 'add',
              bind: {
                disabled: '{toolbarAddBtnSatus}'
              },
              listeners: {
                click: 'onAddCenterProductInfoButtonClick'
              }
            },
            '-',
            {
              xtype: 'button',
              iconCls: 'btn-add',
              text: '批量修改',
              bind: {
                disabled: '{toolbarBatchBtnSatus}'
              },
              listeners: {
                click: 'onEditBatchProductButtonClick'
              }
            },
            '-',
            {
              xtype: 'combobox',
              width: 160,
              fieldLabel: '商品品牌',
              labelAlign: 'right',
              queryMode: 'local',
              editable: false,
              valueField: 'id',
              displayField: 'name',
              bind: {
                store: '{brandToolbarStore}',
                value: '{searchData.brandId}'
              },
              labelWidth: 60,
              listeners : {
                select : 'onFastQueryButtonClick'
              }
            },
            '-',
            {
              xtype: 'combobox',
              width: 160,
              fieldLabel: '商品产地',
              labelAlign: 'right',
              queryMode: 'local',
              editable: false,
              valueField: 'id',
              displayField: 'name',
              bind: {
                store: '{originToolbarStore}',
                value: '{searchData.originId}'
              },
              labelWidth: 60,
              listeners : {
                select : 'onFastQueryButtonClick'
              }
            },
            '->',
            {
              xtype: 'textfield',
              fieldLabel: '快速搜索',
              labelAlign: 'right',
              labelWidth: 80,
              width: 310,
              emptyText: '商品编码/规格编码/规格名称/条形码',
              enableKeyEvents: true,
              listeners: {
                specialKey: 'onFastSearchTextFieldSpecialKey'
              },
              triggers: {
                mytrigger: {
                  handler: 'onFastQueryButtonClick',
                  cls: 'x-form-search-trigger'
                }
              },
              bind: {
                value: "{searchData.query}"
              }
            }
          ]
        },
        {
          xtype: 'pagingcustomtoolbar',
          dock: 'bottom',
          displayInfo: true,
          bind: {
            store: "{centergridstore}"
          }
        }
      ],
      columns: {
        defaults: {
          //align: "center",
          cls: 'titleAlign',
          //menuDisabled: true,
          tdCls: 'with-btngroup'
        },
        items: [
          {
            xtype: 'rownumberer',
            text: '序号',
            width: 37
          },
          {
            xtype: 'widgetcolumn',
            width: 260,
            align: 'center',
            tdCls: 'btngroup',
            text: '操作',
            dataIndex: 'productCode',
            widget: {
              xtype: 'buttongroup',
              baseCls: "",
              layout: {
                type: "column"
              },
              defaultBindProperty: 'permission',
              setPermission: function(){
                var buttonGroup = this,
                  btnArray = buttonGroup.items.items,
                  record = btnArray[0].ownerCt.getWidgetRecord();

                if (Ext.Array.contains(_USER.permissions, "productMgmt:edit")) {
                  Ext.Array.each(btnArray, function(item, index) {
                      item.setDisabled(false);
                  });
                } else {
                  Ext.Array.each(btnArray, function(item, index) {
                    item.setDisabled(true);
                  });
                }
              },
              defaults: {
                handler: "onCommandColumnClick"
              },
              items: [
                {
                  xtype: 'button',
                  iconCls: "btn-edit",
                  text: '编辑',
                  action: 'update',
                  command: "Update"
                },
                {
                  xtype: 'button',
                  iconCls: "btn-delete",
                  text: '停用',
                  command: "Enable"
                },
                {
                  xtype: 'button',
                  iconCls: "btn-edit",
                  text: '海关设置',
                  command: "CustomsSettings"
                },
                {
                  xtype: 'button',
                  iconCls: "btn-virtual-dist",
                  text: '分销',
                  command: "Sales"
                }
              ]
            }
          },
          //{
          //  xtype: 'gridcolumn',
          //  dataIndex: 'productCode',
          //  text: '商品编码'
          //},
          {
            xtype: 'gridcolumn',
            dataIndex: 'skuCode',
            text: '规格编码'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'skuName',
            text: '规格名称'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'barCode',
            text: '条形码'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'productCatName',
            text: '商品类目'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'productOriginName',
            text: '产地'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'productBrandName',
            text: '品牌'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'salePrice',
            align: 'right',
            formatter: 'currency("￥", 2)',
            text: '售价'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'marketPrice',
            align: 'right',
            formatter: 'currency("￥", 2)',
            text: '市场价'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'weight',
            align: 'right',
            text: '计费重量（kg）'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'size',
            align: 'right',
            text: '体积（m3）'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'unit',
            text: '计量单位'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'purchaseUnit',
            text: '采购单位'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'proportion',
            align: 'right',
            text: '采购比例'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'createDate',
            formatter: 'date("Y/m/d H:i:s")',
            align: 'center',
            text: '创建日期'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'updateDate',
            formatter: 'date("Y/m/d H:i:s")',
            align: 'center',
            text: '更新时间'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'updateByName',
            text: '更新人'
          }
        ]
      },
      selModel: {
        selType: 'checkboxmodel',
        checkOnly:true,
        mode:"MULTI",
        injectCheckbox: 1,
        listeners: {
          select: '_onRowSelect',
          deselect: '_onRowDeselect'
        }
      }
    }
  ]

});