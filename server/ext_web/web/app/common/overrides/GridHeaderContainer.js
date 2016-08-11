Ext.define("Common.overrides.GridHeaderContainer", {
  override: "Ext.grid.header.Container",

  getMenuItems: function() {
    var me = this,
      menuItems = [],
      hideableColumns = me.enableColumnHide ? me.getColumnMenu(me) : null;

    if (me.sortable) {
      menuItems = [];
    }
    if (hideableColumns && hideableColumns.length) {
      //if (me.sortable) {
      //  menuItems.push({
      //    itemId: 'columnItemSeparator',
      //    xtype: 'menuseparator'
      //  });
      //}
      menuItems.push({
        itemId: 'columnItem',
        text: me.columnsText,
        iconCls: me.menuColsIcon,
        menu: hideableColumns,
        hideOnClick: false
      });
    }
    return menuItems;
  }
});