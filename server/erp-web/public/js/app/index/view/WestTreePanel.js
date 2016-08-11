Ext.define('Index.view.WestTreePanel', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.westtreepanel',

  requires: [
    'Index.view.WestTreePanelViewModel',
    'Index.view.WestTreePanelViewController'
  ],

  mixins: [
    'Common.ux.TreeFilter'
  ],

  controller: 'mytreepanel',
  viewModel: {
    type: 'mytreepanel'
  },
  id: 'js_mainWestPanel',
  width: 200,
  collapsible: true,
  header: false,
  useArrows : true,
  animate : true,
  bufferedRenderer: false,
  bind: {
    store : '{westTreePanelStore}'
  },
  rootVisible: false,
  title:'左侧面板',
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'textfield',
          action: 'search',
          flex: 1,
          fieldLabel: '',
          emptyText: '请输入名称查找功能',
          triggers: {
            clear: {
              handler: 'onClearClick',
              cls: 'x-form-clear-trigger',
              hidden: true
            },
            query: {
              handler: 'onSearchClick',
              cls: 'x-form-search-trigger'
            }
          },
          listeners: {
            change: 'onTextfieldChange',
            specialkey: 'onSearchEnter'
          }
        }
      ]
    }
  ],
  listeners: {
    itemclick: 'onTreepanelItemClick'
  }

});