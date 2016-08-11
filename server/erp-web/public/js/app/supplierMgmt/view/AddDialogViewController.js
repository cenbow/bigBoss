/*
 * File: app/view/MyWindowViewController.js
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

Ext.define('SupplierMgmt.view.AddDialogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adddialog',
    init:function() {
        var addFlag = this.view.addFlag;
        var idEL = Ext.getCmp("codingId");
        if(addFlag == "true"){
            idEL.hidden = true;
            idEL.submitValue = false;
            var startTimeDatefield = this.getView().down('#startTimeDatefield');
            startTimeDatefield.setValue(new Date());
        }else {
            idEL.hidden = false;
            idEL.submitValue = true;
            idEL.disable(false);
        }

    },
    onButtonSaveClick: function (button, e, eOpts) {
        var form = this.lookupReference("form");
        var _this = this;
        if (!form.isValid()) {
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

        var selectId = this.view.supplierId;
        var url = '/api/general';
        if(selectId) {
            url += '/supplier/update/' + selectId;
        } else {
            url += '/supplier/add';
        }

        Ext.Ajax.request({
            clientValidation: false,
            url: url,
            params: values,
            success:function(response, opts){
                Ext.data.StoreManager.getByKey('gridStore').reload();
                view.close();
            },
            failure : function(response, options) {
                Ext.MessageBox.alert('错误',action);
            }
        });
    },
    onCancelButtonClick: function (button, e, eOpts) {
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
