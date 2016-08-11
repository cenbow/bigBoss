/*
 * File: app/view/ShopInfoViewPortViewController.js
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

Ext.define('ShopMgmt.view.ShopInfoViewPortViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.shopinfoviewport',

	addShopInfo: function (button, e, eOpts) {
		this.operateShopInfo('add');
	},
	updateShopInfo: function (recordId,record) {
		this.operateShopInfo('update', recordId,record);
	},
	openGrantWarehouse: function (record) {
		var _this = this;
		Ext.Ajax.request({
			url: '/api/general/shop/obtainGrantWhs/'+record.getData().id,
			success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				Ext.create("ShopMgmt.view.GrantWarehouseWindow", {
					whs:obj,
					record:record
				}).show();
			}
		});
	},
	operateShopInfo: function (operate, shopId,record) {
		var _this = this;
		if (operate == 'add') {
			_this.getShopInfoComponent(false).show();
		} else if (operate == 'update') {
			var component = _this.getShopInfoComponent(true,shopId);
			var form = component.lookupReference('form').getForm();
			form.load({
				url: '/api/general/shop/view/' + shopId,
				method: 'GET',
				success: function () {
					component.setConfig({record:record});
					component.show();
				}
			});
		}
	},
	getShopInfoComponent:function(disabled,shopId){
		var component = Ext.create("ShopMgmt.view.ShopInfoWindow");
		var form = component.lookupReference('form').getForm();
		var channel = form.findField('channel');
		var shopName = form.findField('name');
		channel.setDisabled(disabled);
		shopName.setDisabled(disabled);
		Ext.StoreMgr.get("warehousesStore").load({params:{
			id:shopId
		}});
		Ext.StoreMgr.get("ShopPrintStore").load();
		return component;
	},
	onCommandColumnClick: function (btn, event) {
		var viewCtr = this,
			command = btn.command,
			grid = viewCtr.lookupReference('shopMgmtGrid'),
			record = btn.ownerCt.getWidgetRecord();

		event.stopEvent();
		grid.getSelectionModel().select(record);

		var viewCtr = this;
		if (command == 'update') {
			viewCtr.updateShopInfo(record.getData().id,record);
		} else if (command == 'grant') {
			viewCtr.openGrantWarehouse(record);
		}
	},
	cellclick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		if (tableview.getGridColumns()[cellIndex].dataIndex == "activeFlag") {
			record.set('activeFlag', record.get("activeFlag") === 'A' ? 'I' : 'A');
		}
	},
	itemdblclick: function(dataview, record, item, index, e, eOpts) {
		this.operateShopInfo('update',record.id,record);
	}
});
