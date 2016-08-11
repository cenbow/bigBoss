/**
 * Created by Junyi on 2016/8/4.
 */
Ext.define('CustomerMgmt.view.AddressWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.addresswindow',

  requires: [],


  /**
   * 确认
   */
  onButtonSaveClick: function (button, e, eOpts) {

    var form = this.lookupReference("form");
    var _this = this;
    if (!form.isValid()) {
      TipsUtil.showTips("提示", "信息填写不正确，请检查后重新操作", TipsUtil.WARING);
      return;
    }
    var view = this.getView();
    var form = this.lookupReference("form");
    var values = form.getForm().getValues();
    if(view.down('#comboProvince').getRawValue()){
      values.provinceName = view.down('#comboProvince').getRawValue();
    }else{
      values.provinceName = "";
    }
    if(view.down('#comboCity').getRawValue()) {
      values.cityName = view.down('#comboCity').getRawValue();
    }else {
      values.cityName = "";
    }
    if(view.down('#comboDistrict').getRawValue()) {
      values.districtName = view.down('#comboDistrict').getRawValue();
    }else{
      values.districtName = "";
    }
    //var selectId = this.view.supplierId;
    var url = '/api/general';
    //if(selectId) {
    //  url += '/customer/update/' + selectId;
    //} else {
      url += '/customer/address/add';
    //}

    Ext.Ajax.request({
      clientValidation: false,
      url: url,
      params: values,
      success:function(response, opts){
        Ext.data.StoreManager.getByKey('MainViewportStore').reload();
        view.close();
      },
      failure : function(response, options) {
        Ext.MessageBox.alert('错误',action);
      }
    });

  },

  /**
   *取消按钮
   */
  onCancelButtonClick: function () {
    this.getView().close();
  },


  provinceList: function(combo, record, index) {
    var cityId = this.view.cityId;
    var comboCity = combo.up("form").down("#comboCity");
    comboCity.clearValue();
    var comboDistrict = combo.up('form').down('#comboDistrict');
    comboDistrict.clearValue();
    comboCity.store.load({
      params: {parentId: combo.getValue()},
      callback: function(records, options, success){
        if(!cityId){
          return;
        }
        comboCity.setValue(records);
        for(var i=0; i<records.length; i++) {
          if(cityId === records[i].data.id){
            comboCity.select(records[i]);
            return;
          }
        }
      }
    })
  },
  cityList: function(combo, record, index) {
    var districtId = this.view.districtId;
    var comboDistrict = combo.up('form').down('#comboDistrict');
    comboDistrict.clearValue();
    comboDistrict.store.load({
      params: {parentId: combo.getValue()},
      callback: function(records, options, success){
        if(!districtId){
          return;
        }
        comboDistrict.setValue(records);
        for(var i=0; i<records.length; i++) {
          if(districtId === records[i].data.id){
            comboDistrict.select(records[i]);
            return;
          }
        }
      }
    })
  }
});