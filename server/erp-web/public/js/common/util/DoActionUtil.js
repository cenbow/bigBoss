Ext.define('Common.util.DoActionUtil', {

  alternateClassName: "DoActionUtil",
  singleton: true,
  requires: [
    "Common.util.TipsUtil"
  ],

  /**
   * 删除一条记录
   * @param url url地址
   * @param method 请求类型
   * @param successCallback 成功回调函数
   */
  deleteOneRecord: function(method, url, successCallback) {
    var me = this;
    Ext.MessageBox.confirm("警告", "你确定要删除所选内容吗？", function(btnId) {
      if (btnId == 'yes') {
        me.request(method, url, {}, successCallback);
      }
    });
  },

  /**
   * ajax请求
   * @param url 请求地址
   * @param params 请求参数
   * @param method 请求类型
   * @param successCallback 成功回调函数
   * @param sync true: 同步, false: 异步
   */
  request: function(method, url, params, successCallback, sync) {
    if (!successCallback || Ext.typeOf(successCallback) != "function") {
      callback = Ext.emptyFn;
    }

    Ext.Ajax.request({
      url: url,
      params : params,
      method : method,
      timeout :60000,
      async: sync ? false : true,
      success : function(response, options) {
        var result = Ext.JSON.decode(response.responseText);
        successCallback(result);
      }
      //,
      //failure : function(response, options) {
      //  TipsUtil.showTips('提示', "[" + response.status + "]: " + options.url + ":" + response.statusText, TipsUtil.ERROR);
      //}
    });
  }
});