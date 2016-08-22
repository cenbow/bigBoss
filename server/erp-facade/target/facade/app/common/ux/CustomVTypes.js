Ext.define('Common.ux.CustomVTypes', {
  override: 'Ext.form.field.VTypes',

  repetitionCustom: function(value, field) {
    var isOk = false,
      length = value.length;

    if (length > 0 && field.repetition) {
      var targetField = field.ownerCt.down('[name=' + field.repetition.targetName+ ']');
      if (targetField && targetField.getValue() == value) {
        isOk = true;
      }
    }
    return isOk;
  },
  repetitionCustomText: '两次输入密码不一致'

});