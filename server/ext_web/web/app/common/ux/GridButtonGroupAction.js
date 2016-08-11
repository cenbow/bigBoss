Ext.define('Common.ux.GridButtonGroupAction', {
  extend: 'Ext.container.ButtonGroup',
  alias: 'widget.gridbuttongroupaction',

  baseCls: "",

  layout: {
    type: "column"
  },

  defaultBindProperty: 'permission',

  constructor: function(cfg) {
    var me = this,
        defaultBindPropertySet = 'setPermission',
        userSeftBindProperty,
        userSeftBindPropertySet;

    //var modules = [
    //  "accountMgmt", "shopMgmt",
    //  "expressMgmt", "printTemplate",
    //  "supplierMgmt", "productMgmt",
    //  "productRecycled", "shopOrderList",
    //  "orderMgmt", "orderManually",
    //  "afterSaleMgmt", "whsMgmt",
    //  "stockTransfer", "goodsRecept",
    //  "goodsIssue", "purchaseOrder",
    //  "purchasePayment", "productSummary",
    //  "salesSummary", "stockSummary",
    //  "stockJournalSummary", "customsSetting"
    //];

    var moduleName = Ext.String.capitalize(cfg.moduleName);
    var moduleNameSpace = Ext.ClassManager.get(moduleName);
    var appPermissions = moduleNameSpace.getApplication().getPermissions().get(Ext.String.uncapitalize(cfg.moduleName));
    console.info(appPermissions);
    if (moduleNameSpace && appPermissions) {
      me.userPermssions = appPermissions;
    }

    if (cfg.defaultBindProperty && cfg.defaultBindProperty != 'permission') {
      userSeftBindProperty = cfg.defaultBindProperty;
      cfg.defaultBindProperty = 'permission';
      userSeftBindPropertySet = 'set'+ Ext.String.capitalize(userSeftBindProperty);
      delete cfg[userSeftBindPropertySet];
    }

    if (!cfg[defaultBindPropertySet]) {
      cfg[defaultBindPropertySet] = me._myDefaultBindPropertySet;
    }
    console.info(cfg);
    me.callParent(arguments);

  },

  _myDefaultBindPropertySet: function() {
    var me = this,
        assignFn = me.assignFn,
        btnArray = me.items.items || [];

    Ext.Array.each(btnArray, function(item) {
      var itemPermission = item.permission || 'edit';
      if (Ext.Array.contains(me.userPermssions, itemPermission)) {
        if (assignFn) {
          assignFn(item);
        } else {
          item.setDisabled(false);
        }
      } else {
        item.setDisabled(true);
      }
    });
  }
});