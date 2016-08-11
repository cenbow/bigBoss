Ext.require([
  'Common.util.TipsUtil',
  'Common.util.DoActionUtil',
  'Ext.ux.ProgressBarPager',
  'Common.ux.PagingToolbarCustom',
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom',
  'Common.overrides.GridHeaderContainer',
  'Common.overrides.JsonWrite',
  'Common.ux.SaveCancelToolbar'
]);

Ext.application({
	
  views: [
    'MainWindow'
  ],
  name: 'CompanySetting',
  appFolder: "js/app/companySetting",

  launch: function () {
    Ext.create('CompanySetting.view.MainWindow');
  }

});
