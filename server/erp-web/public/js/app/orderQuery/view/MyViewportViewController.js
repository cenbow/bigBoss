Ext.define('OrderQuery.view.MyViewportViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.myviewport',

	interceptDialogShow: function() {
		Ext.create("OrderQuery.view.InterceptDialog").show();
	},

	flagChangeDialogShow: function() {
		Ext.create("OrderQuery.view.FlagChangeDialog").show();
	}
})