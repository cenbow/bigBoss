
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
  name: 'ExpressMgmt',

  appFolder: 'js/app/expressMgmt',

  launch: function () {
    Ext.create('ExpressMgmt.view.MyViewport');
  }
});
