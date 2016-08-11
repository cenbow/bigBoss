/*
 * File: app/view/WhsWindowViewController.js
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

Ext.define('WhsMgmt.view.WhsWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.whsWindow',

    changeProvince: function(combo, record, eOpts) {
        var view = this.getView();
        var vm = this.getViewModel();
        view.queryById('cityId').clearValue();
        view.queryById('districtId').clearValue();
        var cityStore = vm.getStore('citystore');
        cityStore.load({params: {parentId: record.data.id}})
        vm.getStore("countystore").removeAll();
    },
    changeCity:function(combo, record, eOpts) {
        var view = this.getView();
        var vm = this.getViewModel();
        view.queryById('districtId').clearValue();
        var countyStore = vm.getStore('countystore');
        countyStore.load({params: {parentId: record.data.id}})
    },

    changeWhsType:function(combo, record, eOpts) {
        var vm = this.getViewModel();
        vm.set('whsType',record.get('id'));
        vm.notify();
    },

    onButtonCancelClick: function(button, e, eOpts) {
        this.getView().close();
    },
    save: function(button, e, eOpts) {
        var viewCtr = this;
        var view = this.getView();
        var formPanel = this.getView().down("form");
        var form = formPanel.getForm();
        var values = form.getValues();
        var url = '/api/inventory/warehouse';
        if(values.id) {
            url += '/update/'+values.id;
        } else {
            url += '/add';
        }
        if (!form.isValid()) {
            return false;
        }
        if(values.provinceId){
            values.provinceName = view.queryById('provinceId').rawValue;
        }
        if(values.cityId){
            values.cityName =  view.queryById('cityId').rawValue;
        }
        if(values.districtId){
            values.districtName =  view.queryById('districtId').rawValue;
        }
        form.submit({
            waitTitle : '提示',//标题
            waitMsg : '正在提交数据请稍后...',//提示信息
            url : url,
            params: values,
            submitEmptyText: false,
            method : 'post',
            success : function(form, action) {
                var flag=action.result.success;
                if(flag) {
                	 Ext.getStore('treeStore').reload();
                    viewCtr.getView().close();
                } else {
                    TipsUtil.showTips('错误', json.result.error.message);
                }

            },
            failure : function(form,action) {
                var flag=action.result.error.message;
                TipsUtil.showTips('错误', '提交失败');
            }
        });
    }
});
