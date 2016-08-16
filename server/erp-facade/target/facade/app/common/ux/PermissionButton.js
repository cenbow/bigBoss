Ext.define('Common.ux.PermissionButton', {

  extend: 'Ext.button.Button',
  alias: 'widget.permissionbutton',

  initComponent: function() {
    var me = this;
    me.setBind({
      disabled: '{!hasPermission}'
    });
    me.callParent();
  }
});