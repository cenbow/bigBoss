Ext.define('Common.view.PrintWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.printwindow',

  requires: [
    'Common.view.PrintWindowViewController',
  ],
  controller: 'printwindow',
  /*
  viewModel: {
    type: 'printwindow'
  },*/

  iconCls: "btn-printer",
  width: 800,
  height: 400,
  title: '打印预览',
  modal: true,
  html: "<iframe id='PrintFrame' name='PrintFrame' frameborder='0' width='100%' height='100%'></iframe>",
  listeners: {
    render: function() {
      var printFrame = document.getElementById('PrintFrame')
      var fun = function () {
        if (window.frames['PrintFrame']) {
          try {
            window.frames['PrintFrame'].focus();
            window.frames['PrintFrame'].print();
          } catch (e) {
          }
        }
      };
      printFrame.onload =  fun;
    }
  },
  items: [
    {
      id: 'printForm',
      xtype: 'form',
      hidden: true,
      standardSubmit: true
    }
  ],


});


