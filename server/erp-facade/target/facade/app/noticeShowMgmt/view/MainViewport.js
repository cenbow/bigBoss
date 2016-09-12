Ext.define('NoticeShowMgmt.view.MainViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.mainviewport',

  requires: [
    'NoticeShowMgmt.view.MainViewportViewController',
    'NoticeShowMgmt.view.MainViewportViewModel',
    'Common.ux.CommandColumn'
  ],

  controller: 'mainviewport',
  viewModel: {
    type: 'mainviewport'
  },
  layout: 'fit',

  items: [{
    xtype: 'gridpanel',
    title: '信息披露主页',
    reference: "infoDisclosureMgmtGrid",
    header: false,
    bind: {
      store: "{gridstore}"
    },
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'top',
      height:35,
      items: [{
        xtype: 'button',
        text: '发布',
        bind: {},
        iconCls: "btn-add",
        listeners: {
          click: 'addClick'
        }
      },
        {
          xtype: 'tbfill'
        }, {
          xtype: 'textfield',
          width: 400,
          fieldLabel: '快速搜索',
          labelAlign: 'right',
          labelWidth: 60,
          emptyText: '输入分类名称',
          enableKeyEvents: true,
          listeners: {
            specialKey: 'onFastSearchTextFieldSpecialKey'
          },
          triggers: {
            fastQueryTrigger: {
              handler: 'onFastQueryButtonClick',
              cls: 'x-form-search-trigger'
            }
          },
          bind: {
            value: "{searchData.text}"
          }
        }]
    }, {
      xtype: 'pagingcustomtoolbar',
      dock: 'bottom',
      displayInfo: true,
      bind: {
        store: "{gridstore}"
      }
    }],
    columns: {
      defaults: {
        align: "center",
        tdCls: 'with-btngroup'
      },
      items: [

        {
          text: '序号',
          xtype: 'rownumberer',
          align: 'center',
          width: 37
        },
        {
          text: '操作',
          xtype: 'widgetcolumn',
          width: 360,
          tdCls: 'btngroup',
          dataIndex: 'progress',
          widget: {
            xtype: 'buttongroup',
            baseCls: "",
            layout: {
              type: "column"
            },
            defaults: {
              handler: "onCommandColumnClick"
            },
            items: [{
              xtype: "button",
              command: "View",
              iconCls: "btn-search",
              text: "查看记录"
            }, {
              xtype: "button",
              command: "Update",
              iconCls: "btn-edit",
              text: "修改记录"
            }, {
              xtype: "button",
              command: "AddPDF",
              iconCls: "btn-add",
              text: "添加附件"
            }, {
                xtype: "button",
                command: "DeletePDF",
                iconCls: "btn-delete",
                text: "删除附件"
              }]
          }
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          text: '信息标题',
          width: 200
        }, {
          xtype: 'gridcolumn',
          dataIndex: 'levelOneName',
          text: '一级分类',
          width: 200
        }, {
          xtype: 'gridcolumn',
          dataIndex: 'levelTwoName',
          text: '二级分类',
          width: 200
        }, {
          xtype: 'gridcolumn',
          dataIndex: 'publishDate',
          text: '发布日期',
          width: 200,
          formatter: 'date("Y/m/d")'
        }, {
          xtype: 'gridcolumn',
          tdCls: 'grid-switch',
          align: 'center',
          dataIndex: 'status',
          text: '是否启用',
          width: 200,
          renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
            if (value === 1) {
              return '<img src="../../images/SwitchOn.png" />';
            } else {
              return '<img src="../../images/SwitchOff.png" />';
            }
          }
        }, {
          xtype: 'gridcolumn',
          tdCls: 'grid-switch',
          align: 'center',
          dataIndex: 'topStatus',
          text: '是否置顶',
          width: 200,
          renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
            if (value === 1) {
              return '<img src="../../images/SwitchOn.png" />';
            } else {
              return '<img src="../../images/SwitchOff.png" />';
            }
          }
        },{
          xtype: 'gridcolumn',
          dataIndex: 'createName',
          text: '录入人',
          width: 200
        }, {
          xtype: 'gridcolumn',
          dataIndex: 'companyName',
          text: '公司名称',
          width: 200
        }, {
          xtype: 'gridcolumn',
          dataIndex: 'companyCode',
          text: '公司代码',
          width: 200
        }, {
          xtype: 'gridcolumn',
          dataIndex: 'url',
          hidden: true
        }]
    },
    listeners: {
      cellclick: 'cellclick'
    }
  }]
});