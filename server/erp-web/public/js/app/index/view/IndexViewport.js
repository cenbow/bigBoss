Ext.define('Index.view.IndexViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.indexviewport',

  requires: [
    'Index.view.IndexViewportViewController',
    'Index.view.IndexViewportViewModel',
    'Index.view.NorthPanel',
    'Index.view.CenterTabPanel',
    'Index.view.WestTreePanel',
    'Ext.tab.Panel',
    'Ext.tree.Panel'
  ],

  controller: 'indexviewport',
  viewModel: {
    type: 'indexviewport'
  },
  layout: 'border',

  items: [
    {
      xtype: 'northpanel',
      region: 'north',
      itemId: 'indexNorth',
      collapseMode: 'mini',
      split: true
    },
    {
      xtype: 'centertabpanel',
      itemId: 'indexCenter',
      region: 'center'
    },
    {
      xtype: 'westtreepanel',
      region: 'west',
      itemId: 'indexWest',
      collapseMode: 'mini',
      split: {
        size: 6
      }
    }
  ]

});