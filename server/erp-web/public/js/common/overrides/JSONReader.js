Ext.define("Common.overrides.JSONReader", {
  override: 'Ext.data.reader.Json',

  rootProperty: 'data.pageData',
  totalProperty: 'data.totalCount'
});