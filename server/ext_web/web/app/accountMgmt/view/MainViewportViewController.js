/*
 * File: app/view/MainViewportViewController.js
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

Ext.define('AccountMgmt.view.MainViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',

  requires: [

  ],

  init: function() {

  },

  /**
   * 添加用户
   */
  onAddUserButtonClick: function (btn) {

  },

  /**
   * 快速搜索
   */
  onFastQueryButtonClick: function (field, trigger, e) {

  },

  /**
   * 快速搜索回车
   */
  onFastSearchTextFieldSpecialKey: function(field, e, options){

  },

  /**
   * grid记录双击
   */
  onGridpanelItemDblClick: function (dataview, record, item, index, e, eOpts) {
    Ext.Msg.alert('事件触发', 'grid记录双击');
  },

  /**
   * 主页命令行操作
   */
  onCommandColumnClick: function (btn, event) {

  },

  /**private***********************/

  /**
   * 信息窗口：修改
   * @param record
   * @private
   */
  _openInfoDialog: function (record) {

  },

  /**
   * 权限
   * @param record  当前选中记录
   * @private
   */
  _openPermissionDialog: function (record) {

  },

  /**
   * 密码重置
   * @param record 当前选中记录
   * @private
   */
  _loadPasswordReset: function (record) {



  },

  /**
   * 删除一条记录
   * @param record 当前选中记录
   * @private
   */
  _deleteRecord: function (record) {

  },

  /**
   * 快速查询
   * @private
   */
  _onFastSearchFn: function() {

  }
});
