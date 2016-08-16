Ext.define('Index.view.NorthPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.northpanel',

  requires: [
    'Index.view.NorthPanelViewModel',
    'Ext.container.Container',
    'Ext.Img',
    'Ext.button.Button'
  ],

  viewModel: {
    type: 'northpanel'
  },
  id: 'js_mainNorthPanel',
  height: 70,
  border: false,
  collapsible: true,
  header: false,
  //title:'顶部面板',
  contentEl: 'js_mainNorthPanel_content'
});