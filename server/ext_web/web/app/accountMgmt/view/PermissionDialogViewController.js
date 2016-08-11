/*
 * File: app/view/PermissionDialogViewController.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('AccountMgmt.view.PermissionDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.permissiondialog',

  requires: [
    'AccountMgmt.view.PermissionSelectManDialog'
  ],

  init: function() {
    var viewCtr = this,
        viewModel = viewCtr.getViewModel(),
        store = viewModel.getStore('treegridstore');

    // 功能权限回显
    store.load({
      callback: function(recs) {
        if (!Ext.isEmpty(recs)) {
          DoActionUtil.request(
            'POST',
            '/api/general/permission/list',
            {
              userIds: viewModel.get('pkId')
            },
            function(result) {
              if (result.success) {
                var datas = result.data;
                Ext.Array.each(datas, function(item) {
                  var currNode = store.getNodeById(item.permissionId);
                  if (currNode) {
                    currNode.set('isChecked', true);
                    currNode.commit();
                    viewCtr._onCellClick( null, null, 1, currNode, null);
                  }
                });

              } else {
                TipsUtil.showTips('提示', result.error.message, TipsUtil.WARING);
              }
            }
          );
        }
      }
    });
  },

  /**
   * 从其他帐号拷贝
   */
  onCopyFromOtherAccountButtonClick: function(button, e, eOpts) {
    var viewCtr = this,
        dialog = Ext.create('AccountMgmt.view.PermissionSelectManDialog'),
        treePanel = viewCtr.getView().down('treepanel'),
        selectIds = [];

    treePanel.getRootNode().cascadeBy(function (node) {
      if (node.get('isChecked') && node.get('code')) {
        selectIds.push(node.get('id'));
      }
    });

    dialog.getViewModel().set('treegridstore', viewCtr.getViewModel().getStore('treegridstore'));
    dialog.getViewModel().set('oldSelectPermissionIds', selectIds);
    dialog.getViewModel().set('permissionDialogViewController', viewCtr);
    dialog.show();

  },

  /**
   * 保存
   */
  onSaveButtonClick: function(button, e, eOpts) {
    var viewCtr = this,
        dialog = viewCtr.getView(),
        viewModel = viewCtr.getViewModel(),
        treePanel = dialog.down('treepanel'),
        shopPermission = viewCtr.lookupReference('shopPermission'),
        wareHousePermission = viewCtr.lookupReference('wareHousePermission'),
        selectIds = [];

    treePanel.getRootNode().cascadeBy(function (node) {
      if (node.get('isChecked') && node.get('code')) {
        selectIds.push(node.get('id'));
      }
    });

    if (Ext.isEmpty(selectIds)) {
      TipsUtil.showTips('提示', '选择记录为空, 无法保存...', TipsUtil.WARING);
      return ;
    }

    viewCtr.oldSelectPermissionId = selectIds;

    var shopPermissionChecked = shopPermission.getChecked();
    var shopPermissionIdArray = [];
    var wareHousePermissionChecked = wareHousePermission.getChecked();
    var wareHousePermissionIdArray = [];

    Ext.Array.each(shopPermissionChecked, function(item) {
      shopPermissionIdArray.push(item.inputValue);
    });
    Ext.Array.each(wareHousePermissionChecked, function(item) {
      wareHousePermissionIdArray.push(item.inputValue);
    });

    console.info("用户功能权限:" + selectIds);
    console.info("用户店铺权限:" + shopPermissionIdArray);
    console.info("用户仓库权限:" + wareHousePermissionIdArray);

    DoActionUtil.request(
      'POST',
      '/api/general/user/grant/update/' + viewModel.get('pkId'),
      {
        permissionIds: JSON.stringify(selectIds), // 功能权限
        shopIds: JSON.stringify(shopPermissionIdArray), // 店铺权限
        whsIds: JSON.stringify(wareHousePermissionIdArray) // 仓库权限
      },
      function(result) {
        if (result.success) {
          dialog.close();
          TipsUtil.showTips('提示', result.data, TipsUtil.INFO);
        } else {
          TipsUtil.showTips('提示', result.error.message, TipsUtil.WARING);
        }
      }
    );
  },

  /**
   * 取消
   */
  onCancelButtonClick: function(button, e, eOpts) {

    var viewCtr = this;

    viewCtr.getView().close();
  },

  //**private**********

  /**
   * checkcolumn选中子节点级联
   * @private
   */
  _onCellClick: function( curr, el, colIndex, node, eOpts) {
    if (colIndex != 1) {
      return ;
    }
    var viewCtr = this;
    var isChecked = node.get('isChecked');
    node.cascadeBy(function (child) {
      child.set('isChecked', isChecked);
      child.commit();
    });

    viewCtr._parentCheck(node, isChecked);
  },

  /**
   * checkcolumn选中父节点级联
   * @private
   */
  _parentCheck:function (node, isChecked) {
    node.commit();
    var viewCtr = this;
    var parentNode = node.parentNode;
    if (Ext.isEmpty(parentNode))
      return;

    //如果有一个子节点为未选中,则父节点为未选中状态
    if (isChecked == true) {
      parentNode.eachChild(function (child) {
        if (!child.get('isChecked')) {
          isChecked = false;
        }
      });
    }

    if (parentNode.get('id') == 'ROOT') {
      parentNode.set('isChecked', false);
    } else {
      parentNode.set('isChecked', isChecked);
    }

    //循环处理父节点
    viewCtr._parentCheck(parentNode, isChecked);
  },

  //_aaa: function(currNode) {
  //  var parentNode = currNode.parentNode;
  //  var childNodes = parentNode.childNodes;
  //  var counts = 0;
  //  if (Ext.isEmpty(parentNode)) {
  //    console.info('=')
  //    return;
  //  }
  //
  //  Ext.Array.each(childNodes, function(every) {
  //    if (every.get('isChecked')) {
  //      counts++;
  //    }
  //  });
  //  if (counts == childNodes.length) {
  //    parentNode.set('isChecked', true);
  //    parentNode.commit();
  //  }
  //}

  /**
   * 数据权限面板渲染前操作
   * @private
   */
  _onDataPermissionPanelBeforeRender: function(panel) {
    var viewCtr = this,
        shopPermission = viewCtr.lookupReference('shopPermission'),
        wareHousePermission = viewCtr.lookupReference('wareHousePermission');

    viewCtr._refreshPermissionPanel();
  },

  _refreshPermissionPanel: function(selectManDialogUserIds) {
    var viewCtr = this,
        viewModel = viewCtr.getViewModel(),
        userIds = [],
        shopPermission = viewCtr.lookupReference('shopPermission'),
        wareHousePermission = viewCtr.lookupReference('wareHousePermission');

    userIds.push(viewModel.get("pkId"));

    if (selectManDialogUserIds) {
      userIds = userIds.concat(selectManDialogUserIds);
    }
    console.info(userIds);

    DoActionUtil.request(
      'POST',
      '/api/general/user/grant/data/list',
      {
        userIds: JSON.stringify(userIds)
      },
      function(result) {
        if (result.success) {
          var datas = result.data;
          viewCtr._pupulateCheckGroupItems(datas.ugsList, datas.ugwList);
        } else {
          TipsUtil.showTips("提示", result.error.message, TipsUtil.WARING);
        }
      }
    );
  },

  _pupulateCheckGroupItems: function(shopPermissionDatas, wareHousePermissionDatas) {
    var viewCtr = this,
      shopPermission = viewCtr.lookupReference('shopPermission'),
      wareHousePermission = viewCtr.lookupReference('wareHousePermission');

    Ext.batchLayouts(function () {

      if (shopPermission.rendered || wareHousePermission.rendered) {
        shopPermission.removeAll();
        wareHousePermission.removeAll();
      }

      Ext.Array.each(shopPermissionDatas, function(item) {
        shopPermission.add({
          xtype: 'checkboxfield',
          boxLabel: item.shopName,
          name: item.shopId,
          inputValue: item.shopId,
          checked: item.isChecked
        });
      });
      Ext.Array.each(wareHousePermissionDatas, function(item) {
        wareHousePermission.add({
          xtype: 'checkboxfield',
          boxLabel: item.whsName,
          name: item.whsId,
          inputValue: item.whsId,
          checked: item.isChecked
        });
      });
    });
  }
});
