Ext.define('Common.ux.ComboboxIconCustom', {
  extend: 'Ext.form.field.ComboBox',
  alias: 'widget.comboboxicon',

  defaultExtension: '_flag.png',

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.defaultExtension = cfg.extension || me.defaultExtension;
    me.callParent([Ext.apply({}, cfg)]);
  },

  initComponent: function(config) {
    var me = this;

    me.listConfig = {
      itemTpl: [
        '<img src="/images/{field1}' + me.defaultExtension + '" />{field2}'
      ],
    };

    me.callParent(arguments);

    me.on('render', function(combo) {
      var id = Ext.id(combo);
      Ext.get(id + "-inputEl").applyStyles('display:table-cell;margin-left:13px;margin-top:-1px;');
      Ext.DomHelper.insertBefore(Ext.get(id + "-inputEl"), {
        tag: 'div',
        style:'display:table-cell;position:relative;padding:0px;border:0px;float:left',
        children: [{
          tag: 'div',
          id: 'flagImage',
          html: '',
          style:'position:absolute'
        }]
      });
    });
  },

  initEvents: function() {
    var me = this;
    me.on('select', function(combo) {
      Ext.get('flagImage').setHtml('<img src="/images/' + combo.getValue() + me.defaultExtension + '" />');
    });
  }
});