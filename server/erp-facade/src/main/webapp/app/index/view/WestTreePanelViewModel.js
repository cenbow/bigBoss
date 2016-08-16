Ext.define('Index.view.WestTreePanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.mytreepanel',

  requires: [
    'Index.store.WestTreePanelStore'
  ],

  stores: {
    westTreePanelStore: {
      type: 'westtreepanelstore'
    }
  }

});