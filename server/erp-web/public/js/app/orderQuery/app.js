
Ext.require([
	'Common.util.TipsUtil',
	'Common.util.DoActionUtil',
	'Ext.ux.ProgressBarPager',
	'Common.ux.PagingToolbarCustom',
	'Common.overrides.Button',
	'Common.overrides.Splitter',
	'Common.overrides.PagingToolbarCustom'
]);

Ext.application({
	views: [
		'MyViewport'
	],
	name: 'OrderQuery',
	appFolder: "js/app/orderQuery",

	launch: function () {
		Ext.create('OrderQuery.view.MyViewport');
	}

});