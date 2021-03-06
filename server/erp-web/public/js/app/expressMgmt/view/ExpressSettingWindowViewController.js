/*
 * File: app/view/ExpressSettingWindowViewController.js
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

Ext.define('ExpressMgmt.view.ExpressSettingWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.expresssettingwindow',
  init: function (view) {

  },
  me: this,
  initPage: function () {
    var model = this.getViewModel();
    var params = {};
    params.whsId = model.get('whsId');
    params.logisticsId = model.get('logisticsId');
    Ext.Ajax.request({
      url: '/api/general/logistics/delivery',
      params: params,
      method: 'GET',
      success: function (response, options) {
        if (response.status == '200') {
          var result = Ext.decode(response.responseText);
          var fee = result.fee;
          if (!fee) {
            fee = {
              valuationType: 'BY_WEIGHT',
              startStd: 0,
              startFee: 0.0,
              addStd: 0,
              addFee:0.0
            }
          }

          model.set('fee', fee);
          if (fee.isTemplate == 'Y') {
            model.set('setTemplateBtnText', '取消模版');
          } else {
            model.set('setTemplateBtnText', '设置模版');
          }
        }
      }
    });

    var store = model.getStore('lineStore');
    store.load({params: params});
  },
  onButtonSetTemplateClick: function (button, e, eOpts) {
    var viewModel = this.getViewModel();
    var lineStore = viewModel.getStore('lineStore');
    var fee = viewModel.get('fee');
    if (!fee || !fee.logisticsId) {
      Ext.MessageBox.alert('提示', '该记录还未保存');
      return;
    }
    fee.logisticsId = viewModel.get('logisticsId');
    fee.whsId = viewModel.get('whsId');
    fee.isTemplate = fee.isTemplate === 'Y' ? 'N' : 'Y';
    this.saveFee(fee, function () {
      var message = fee.isTemplate === 'Y' ? '设置模版成功' : '取消模版成功';
      Ext.MessageBox.alert('提示', message);
      if (fee.isTemplate == 'Y') {
        viewModel.set('setTemplateBtnText', '取消模版');
      } else {
        viewModel.set('setTemplateBtnText', '设置模版');
      }
    });
  },

  onButtonCopyClick: function (button, e, eOpts) {
    var viewCtr = this;
    var templateWindow = Ext.create('ExpressMgmt.view.DeliveryTemplateChooseWindow', {
      listeners: {
        close: function (win) {
          var viewModel = win.getViewModel();
          var logisticsId = viewModel.get('logisticsId');
          var whsId = viewModel.get('whsId');
          viewCtr.copyTemplate(logisticsId, whsId);
        }
      }
    });
    var store = templateWindow.down('grid').store;
    var templateViewModel = templateWindow.getViewModel();
    templateViewModel.set('parentCtrl', viewCtr);
    store.load();
    templateWindow.show();
  },
  copyTemplate: function (logisticsId, whsId) {
    if (logisticsId == null && whsId == null) {
      return;
    }
    var viewModel = this.getViewModel();
    this.copyDeliveryFee(viewModel, logisticsId, whsId);
  },
  copyDeliveryFee: function (viewModel, logisticsId, whsId) {
    var params = {};
    params.logisticsId = logisticsId;
    params.whsId = whsId;

    Ext.Ajax.request({
      url: '/api/general/logistics/delivery',
      params: params,
      method: 'GET',
      success: function (response, options) {
        if (response.status == '200') {
          var result = Ext.decode(response.responseText);
          if (result) {
            var fee = result.fee;
            fee.id = viewModel.get('fee').id;
            fee.isTemplate = viewModel.get('fee').isTemplate;
            fee.logisticsId = viewModel.get('logisticsId');
            fee.whsId = viewModel.get('whsId');
            viewModel.set('fee', fee);

            var line = result.lines;
            Ext.each(line, function (item) {
              delete item.lineId;
              item.deliveryFeeId = fee.id;
            });
            var lineStore = viewModel.getStore('lineStore');
            lineStore.removeAll(false);

            line.forEach(function (item) {
              lineStore.add(new lineStore.model(item))
            })
          }

        }
      }
    });
  },
  onButtonSaveClick: function (button, e, eOpts) {
    var view = this.getView();
    var viewModel = this.getViewModel();
    var lineStore = viewModel.getStore('lineStore');
    var fee = viewModel.get('fee') || {};
    fee.logisticsId = viewModel.get('logisticsId');
    fee.whsId = viewModel.get('whsId');
    var number = lineStore.findBy(function(item) {
      return item.get("areaDesc") === '';
    });

    if(number >= 0 ) {
      Ext.Msg.alert("提示", "地区信息验证失败!");
      return;
    }

    this.saveFee(fee, function (json) {
      if(json.success) {
        lineStore.queryBy(function (record, id) {
          record.set('logisticsId', json.data.logisticsId);
          record.set('deliveryFeeId', json.data.id);
        });

        //lineStore.getCount是现在grid里的条数，lineStore.getTotalCount总数
        //
        if (lineStore.getCount() > 0 || lineStore.getTotalCount()> 0) {
          lineStore.sync({
            callback: function (batch) {
              if(!batch.exceptions || !batch.exceptions.length)  {
                view.close();
              }
            },
            failure : function(batch) {
              lineStore.rejectChanges();
              Ext.Msg.alert('提示信息', '出错啦，请重试！');
            },
            scope: lineStore
          });
        } else {
          view.close();
        }
      } else {
        Ext.Msg.alert('错误', json.error.message)
      }

    });

  },
  saveFee: function (fee, cb) {

    var form = this.getView().down('form');
    if (!form.isValid()) {
      /*Ext.MessageBox.alert('错误', '表单中存在错误!');*/
      return false;
    }
    Ext.Ajax.request({
      url: '/api/general/logistics/delivery/fee/update',
      params: fee,
      method: 'POST',
      success: function (response, options) {
        if (response.status == '200') {
          var json = Ext.decode(response.responseText);
          if (cb && typeof cb === 'function') {
            cb(json);
          }
        }
      },
      failure: function () {
        Ext.MessageBox.alert('提示', '服务器错误');
      }
    });
  },

  onButtonCancelClick: function (button, e, eOpts) {
    this.getView().close();
  },
  onButtonAreaChooseClick: function (button, e, eOpts) {
    var viewCtr = this;
    var grid = viewCtr.getView().down('grid');
    var selection = grid.getSelectionModel().getSelection();
    if (!selection || !selection.length) {
      Ext.MessageBox.alert('提示', '请选择一行');
      return;
    }
    var selectedData = selection[0].data;

    var areaChooseWindow = Ext.create('ExpressMgmt.view.AreaChooseWindow', {callback: this.returnFun});
    var areaChooseViewModel = areaChooseWindow.getViewModel();
    areaChooseViewModel.set('lineId', selectedData.lineId);
    areaChooseViewModel.set('deliveryFeeId', selectedData.deliveryFeeId);
    areaChooseViewModel.set('parentCtrl', viewCtr);

    //获取已被其他line选择的areaId list
    var _othSelAreas = [];
    grid.store.findBy(function(item) {
      //排除当前选择行,lineId未添加的时候非数字,但唯一
      if (item.get("lineId") != selectedData.lineId) {
        var _areaIds = item.get("areaIds");
        if (Array.isArray(_areaIds)) {
          _othSelAreas = _othSelAreas.concat(_areaIds)
        }
      }
    });

    areaChooseWindow.getController().initPage(selectedData.areaIds, _othSelAreas);


    areaChooseWindow.show();
  },

  returnFun: function (selectedItem, ctrl) {
    var areaDesc = '';
    var areaIds = [];
    if (selectedItem && selectedItem.length) {
      if (selectedItem.length == 1) {
        areaDesc = selectedItem[0].get('name');
      } else {
        areaDesc = selectedItem[0].get('name') + '等' + selectedItem.length + '个地区';
      }
      Ext.each(selectedItem, function (item) {
        areaIds.push(item.get('id'));
      })
    }
    var grid = ctrl.getView().down('grid');
    var record = grid.getSelectionModel().getSelection()[0];
    record.set('areaDesc', areaDesc);
    record.set('areaIds', areaIds)
  },

  onComboboxChange: function (combo, record, eOpts) {

    /*
     BY_QUANTITY('按件'),
     BY_WEIGHT('按重量'),
     BY_SIZE('按体积')
     */
    var type = combo.getValue();

    var model = this.getViewModel();
    var data = model.get(type);
    for (var name in data) {
      model.set(name, data[name]);
    }
  },
  onButtonLineAddClick: function (button, e, eOpts) {
    var model = this.getViewModel();
    var store = model.getStore('lineStore');
    var deliveryFeeId = model.get('fee').id;
    store.add({deliveryFeeId: deliveryFeeId});
  },

  onCommandColumnClick: function (btn, event) {
    var viewCtr = this,
      command = btn.command,
      grid = viewCtr.getView().down('grid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'Delete') {
      viewCtr._deleteRecord(record);
    }
  },
  _deleteRecord: function (record) {
    var store = this.getView().down('grid').store;
    Ext.MessageBox.confirm('提示', '确认删除？', function (option) {
      if (option === 'yes') {
        store.remove(record);
        //保存后才生效
        /*store.sync({
          callback: function () {
            console.log('delete', arguments);
            this.reload()
          },
          scope: store
        });*/

      }
    })
  },
});
