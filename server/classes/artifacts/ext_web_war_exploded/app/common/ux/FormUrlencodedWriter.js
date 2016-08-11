Ext.define('Common.ux.FormUrlencodedWriter', {
  extend: 'Ext.data.writer.Writer',
  alternateClassName: 'Common.ux.FormUrlencodedWriter',
  alias: 'writer.formurlencoded',

  config: {
    allowSingle: true
  },

  writeRecords: function(request, data) {
    var me = this, transform;

    if (me.getAllowSingle() && data.length === 1) {
      data = data[0];
    }

    transform = this.getTransform();
    if (transform) {
      data = transform(data, request);
    }

    request.setParams(data);
    return request;
  }
});