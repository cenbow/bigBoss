Ext.define("Common.overrides.GridFeatureGrouping", {
  override: "Ext.grid.feature.Grouping",

  showMenuBy: function(clickEvent, t, header) {
    var me = this;
    //  menu = me.getMenu(),
    //  groupMenuItem = menu.down('#groupMenuItem'),
    ////groupMenuMeth = header.groupable === false || !header.dataIndex || me.view.headerCt.getVisibleGridColumns().length < 2 ? 'disable' : 'enable',
    //  groupToggleMenuItem = menu.down('#groupToggleMenuItem'),
    //  isGrouped = me.grid.getStore().isGrouped();
    //if (groupToggleMenuItem) {
    //  groupToggleMenuItem.setChecked(isGrouped, true);
    //  groupToggleMenuItem[isGrouped ? 'enable' : 'disable']();
    //}
    Ext.grid.header.Container.prototype.showMenuBy.apply(me, arguments);
  },

  getMenuItems: function() {
    var me = this,
      groupByText = me.groupByText,
      disabled = me.disabled || !me.getGroupField(),
      showGroupsText = me.showGroupsText,
      enableNoGroups = me.enableNoGroups,
      getMenuItems = me.view.headerCt.getMenuItems;
    // runs in the scope of headerCt
    return function() {
      // We cannot use the method from HeaderContainer's prototype here
      // because other plugins or features may already have injected an implementation
      var o = getMenuItems.call(this);
      return o;
    };
  }
});