/*
 * File: app/view/MyViewportViewController.js
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

Ext.define('OrderHold.view.MyViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.myviewport',

  requires: [
    'OrderHold.view.UpdateFlagWindow',
    //'OrderHold.view.UpdateWarehouse'
  ],

  /**
   * 搜索
   */
  onButtonSearchClick: function (button, e, eOpts) {
    //Ext.Msg.alert("我是提示！", "搜索!");
    var container = button.up('container').up('container');
    var fieldContainers = container.items.items;
    var params = {};

    Ext.Array.each(fieldContainers, function(item) {
      var items = item.query('field');
      for (var i = 0, lenth = items.length; i < lenth; i++) {
        if (items[i].editable && items[i].getRawValue() != null) {
          params[items[i].name] = items[i].getRawValue();
        } else if (items[i].getValue() != null ) {
          params[items[i].name] = items[i].getValue();
        }
      }
    });

    var viewCtr = this;
    var store = viewCtr.getViewModel().get('centergridstore');
    //console.info(store);

    console.info(params);
    if (store) {
      store.on('beforeload', function(store) {
        store.proxy.extraParams = reqOpts;
      });

      store.load();
    }
  },

  /**
   * 清空
   * @param record
   */
  onButtonClearClick:function(button,e, eOpts){
    //Ext.Msg.alert("清空","清空");
    var container = button.up('container').up('container');
    var fieldContainers = container.items.items;

    Ext.Array.each(fieldContainers, function(item) {
      var items = item.query('field');
      Ext.Array.each(items, function (item) {
        item.reset();
      });
    });
  },

  /**
   * 刷新异常
   * @param record
   */
  onButtonFreshenAbnormalClick:function(record){
    Ext.Msg.alert("提示","刷新异常");
  },

  /**
   * 取消拦截
   * @param record
   */
  onButtonCancelInterceptClick:function(record){
    Ext.Msg.alert("提示","取消拦截");
  },

  /**
   * 加急订单
   * @param record
   */
  onButtonOrderFasterClick:function(record){
    Ext.Msg.alert("提示","加急订单");
  },

  /**
   * 取消加急
   * @param record
   */
  onButtonCancelFasterClick:function(record){
    Ext.Msg.alert("提示","取消加急");
  },

  /**
   * 批量修改快递
   * @param record
   */
  onButtonUpdateExpressClick:function(record){
    //Ext.Msg.alert("提示","批量修改快递");
    Ext.create('OrderHold.view.UpdateExpressWindow').show();
  },

  /**
   * 批量修改仓库
   * @param record
   */
  onButtonUpdateWarehouseClick:function(record){
    //Ext.Msg.alert("提示","批量修改仓库");
    Ext.create('OrderHold.view.UpdateWarehouseWindow').show();
  },

  /**
   * 批量修改旗帜
   * @param record
   */
  onButtonUpdateFlagClick:function(record){
    //Ext.Msg.alert("提示","批量修改旗帜");
    Ext.create('OrderHold.view.UpdateFlagWindow').show();
  },

  /**
   * 主页面-grid鼠标单击操作
   */
  onTableItemClickMainViewportGrid: function (dataview, record, item, index, e, eOpts) {
    var viewCtr = this;
    var commtab = viewCtr.getView().down("#commtab");
    commtab.getController().fireViewEvent('loadTabDatas', record);
  },
});
