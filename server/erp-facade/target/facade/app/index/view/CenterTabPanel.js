Ext.define('Index.view.CenterTabPanel', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.centertabpanel',

  requires: [
    'Index.view.CenterTabPanelViewModel',
    'Ext.panel.Panel',
    'Ext.tab.Tab'
  ],

  viewModel: {
    type: 'centertabpanel'
  },
  title: 'center',
  header: false,
  resizable:true,
  resizeHandles: 'w',
  activeTab: 0,

  items: []

});