Ext.define('Index.view.WestTreePanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mytreepanel',
  requires: [
    'Ext.util.Filter'
  ],
  init: function () {
    var user = _USER;
    var userPermissions = user.permissions || [];
    var treeStore = this.getViewModel().getStore("westTreePanelStore");
    var permissionFilter = new Ext.util.Filter({
      filterFn: function(record) {
        if(record.get("id") && record.get("leaf") == true) {
          var pagePermission = record.get("id") + ":view";
          if (user.isAdmin === 'N' && userPermissions.indexOf(pagePermission) === -1) {
            return false;
          }
          return true;

        } else {
          var currChildNodes = record.childNodes,
              isViewPermissionExistNum = 0;

          Ext.Array.each(currChildNodes, function(node) {
            var currNodeViewPermission = node.get("id")  + ":view";
            if (Ext.Array.contains(userPermissions, currNodeViewPermission)) {
              isViewPermissionExistNum++;
            }
          });

          return isViewPermissionExistNum > 0 ? true : false;
        }
      }
    });

    treeStore.filter(permissionFilter);
  },

  routes: {
    ':id': {
      action: 'handleRoute',
      before: 'beforeHandleRoute'
    }
  },

  /**
   * 路由跳转前操作
   */
  beforeHandleRoute: function (id, action) {
    var me = this,
        westTree = me.getView(),
        store = this.getViewModel().getStore("westTreePanelStore"),
        record = store.getNodeById(id);

    if (record) {
        action.resume();
    } else {
      if ('all' != id) {
        Ext.Msg.alert('路由跳转失败', '找不到id为' + id + ' 的组件');
        me.redirectTo('all');
      }
    }

  },

  /**
   * 执行跳转
   */
  handleRoute: function (id) {
    var me = this,
      westTree = me.getView(),
      record = this.getViewModel().getStore("westTreePanelStore").getNodeById(id),
      indexCenter = westTree.up("viewport").down("#indexCenter"),
      tab, url;

      tab = Ext.getCmp(record.get('id') + '_panel');
      url = record.get("url");

      westTree.getSelectionModel().select(record);
      westTree.getView().focusNode(record);

      if (!tab) {
        tab = Ext.create('Ext.container.Container', {
          id: record.get('id') + '_panel',
          layout: 'fit',
          closable: true,
          tabConfig: {
            xtype: 'tab',
            minWidth: 118
          },
          title: record.get('text'),
          //contentEl: Ext.DomHelper.append(document.body, {
          //  tag: 'iframe',
          //  style: "border:0px none;scrollbar:true",
          //  src: url,
          //  height: "100%",
          //  width: "100%"
          //}),
          //autoEl: {
          //  tag : "iframe",
          //  src: url,
          //  frameborder: 0
          //}
          html: '<iframe src= ' + url + ' width="100%" height="100%" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" ></iframe>'
        });
        indexCenter.add(tab);
      }
      indexCenter.setActiveTab(tab);
  },

  /**
   * 值改变操作
   */
  onTextfieldChange: function (field, newValue, oldValue, eOpts) {
    if (Ext.isEmpty(field.getValue())) {
      field.getTriggers().clear.hide();
      this.getView().up("viewport").down("#indexWest").clearFilter();
    } else {
      field.getTriggers().clear.show();
    }
  },


  /**
   * 响应搜索按钮click事件
   */
  onSearchEnter: function(field, e) {
    var viewCtr = this;
    if (e.getKey() == Ext.EventObject.ENTER) {
      viewCtr.onSearchClick();
    }
  },

  /**
   * 左侧treepanel-node单击事件
   */
  onTreepanelItemClick: function (dataview, record, item, index, e, eOpts) {
    if (record.isLeaf()) {
      this.redirectTo(record.getId(), true);
    }
    //else {
    //  record[record.isExpanded() ? 'collapse' : 'expand']();
    //}
  },

  /**
   * 搜索按钮click事件
   */
  onSearchClick: function () {
    var me = this,
      indexWest = me.getView().up("viewport").down("#indexWest"),
      search = indexWest.down("textfield[action=search]"),
      value = search.getValue();

    (Ext.isEmpty(value) ? Ext.emptyFn : filter)(value);

    return true;

    function filter(value) {
      indexWest.filterByText(value);
    }

  },

  /**
   * 清空
   */
  onClearClick: function (field, trigger, e) {
    field.reset();
    field.getTriggers().clear.hide();
    this.getView().up("viewport").down("#indexWest").clearFilter();
  }

});
