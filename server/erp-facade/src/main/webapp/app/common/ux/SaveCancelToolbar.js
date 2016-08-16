Ext.define('Common.ux.SaveCancelToolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.savecanceltoolbar',

  dock: 'bottom',
  ui: 'footer',
  buttonText1: "保存",
  buttonText1HandlerName: "onSaveButtonClick",
  buttonIconCls1: 'btn-save',
  buttonText2: "取消",
  buttonText2HandlerName: "onCancelButtonClick",
  buttonIconCls2: 'btn-cancel',
  layout: {
    pack: 'end',
    type: 'hbox'
  },

  initComponent: function () {
    var me = this;

    Ext.apply(me, {
      items: [
        {
          xtype: 'button',
          text: me.buttonText1,
          iconCls: me.buttonIconCls1,
          listeners: {
            click: me.buttonText1HandlerName
          }
        },
        {
          xtype: 'button',
          text: me.buttonText2,
          iconCls: me.buttonIconCls2,
          listeners: {
            click: me.buttonText2HandlerName
          }
        }
      ]
    });
    me.callParent();
  }

});