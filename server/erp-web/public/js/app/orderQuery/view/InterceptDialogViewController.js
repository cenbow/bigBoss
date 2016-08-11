Ext.define('OrderQuery.view.InterceptDialogViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.interceptdialog',

	onSaveButtonClick: function() {
		alert("baocun");
	},

	onCancelButtonClick: function() {
		alert("quxiao");
	},

	onPositionInterceptTriggerClick: function() {
		Ext.create("OrderQuery.view.InterceptTypeEditDialog",{store: Ext.getStore("qrderquery.intercepttype")}).show();
	}
})
