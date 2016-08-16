Ext.define('Common.view.PrintWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.printwindow',

  init: function () {
    var me = this;
    var view = me.getView();

    var option = view.printOption || {};
    var form = Ext.getCmp('printForm');
    /*document.frames("refreshAlarm").*/
    form.submit({
      method: option.method || "GET",
      url: option.url,
      params: option.params || {},
      target: 'PrintFrame',
      success: function() {
        console.log('success')
      },
      failure: function() {
        console.log('success')
      }
    })

  },

  load: function () {
    console.log('load')
  },
  render: function() {
    console.log('render')
  }
});