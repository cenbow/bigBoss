Ext.define('CompanySetting.store.FinancialJudgeListStore', {
  extend: 'Ext.data.Store',
  alias: 'store.companysetting.financialjudgeliststore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      fields: ["id","text"],
      proxy: {
        type: 'ajax',
        url: '/api/general/company/setting/review/financial/list',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }, cfg)]);
  }
});