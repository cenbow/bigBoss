Ext.define('Common.util.TipsUtil', {

  alternateClassName:"TipsUtil",
  requires: ['Common.ux.Notification'],
  singleton: true,

  INFO: "info",
  WARING: "waring",
  ERROR: "error",

  /**
   * 提示框
   * @param title 标题栏
   * @param msg 消息
   * @param msgType 消息类型 AppUtil.INFO/AppUtil.WARING/AppUtil.ERROR
   * @param callback 回调函数
   */
  showTips: function(title, msg, msgType, callback) {
    Ext.MessageBox.show({
      title : title,
      msg : msg,
      buttons : Ext.MessageBox.OK,
      icon : msgType ===  TipsUtil.INFO ? Ext.MessageBox.INFO :
             msgType ===  TipsUtil.WARING ? Ext.MessageBox.WARNING :
               Ext.MessageBox.ERROR,
      fn: Ext.typeOf(callback) == "undefined" ? Ext.emptyFn() : callback
    });
  },

  /**
   * 提示框
   * @param title 标题栏
   * @param msg 消息
   * @param msgType 消息类型 AppUtil.INFO/AppUtil.WARING/AppUtil.ERROR
   */
  showNotify: function(title, msg, msgType) {
    var tip = Ext.create('Common.ux.Notification', {
      title: title,
      position: 'br',
      width: 200,
      iconCls: msgType ===  TipsUtil.INFO ? "win-tips-ok" :
               msgType ===  TipsUtil.WARING ? "win-tips-error" :
               msgType ===  TipsUtil.ERROR ? "win-tips-error" : '',
      autoCloseDelay: msgType ===  TipsUtil.INFO ? 2000 :
                      msgType ===  TipsUtil.WARING ? 3000 :
                      msgType ===  TipsUtil.ERROR ? 3000 : 3000,
      spacing: 20,
      html: '<div style="margin:10px auto;text-align: center;">' + msg + '</div>'
    });
    tip.show();
  }

});