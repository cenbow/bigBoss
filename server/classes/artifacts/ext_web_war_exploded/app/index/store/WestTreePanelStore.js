Ext.define('Index.store.WestTreePanelStore', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.westtreepanelstore',
  requires: [
    'Ext.data.field.Field'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'WestTreePanelStore',
      root: {
        text: 'nav',
        expanded: true,
        children: [
          {
            text: '账号管理',
            qtip: '账号管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '账号管理',
                qtip: '账号管理',
                url: 'html/app/accountMgmt.html',
                id: 'accountMgmt',
                leaf: true
              }
            ]
          },
          {
            text: '公司管理',
            qtip: '公司管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '公司管理',
                qtip: '公司管理',
                url: 'app-productMgmt.html',
                id: 'companyMgmt',
                leaf: true
              }
            ]
          },
          {
            text: '分类管理',
            qtip: '分类管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '信息披露',
                qtip: '信息披露',
                url: 'app-productMgmt.html',
                id: 'infoDisclosure',
                leaf: true
              },
              {
                text: '学习园地',
                qtip: '学习园地',
                url: 'app-productRecycled.html',
                id: 'studyGarden',
                leaf: true
              },
              {
                text: '市场资讯',
                qtip: '市场资讯',
                url: 'app-productRecycled.html',
                id: 'marketInfo',
                leaf: true
              },
              {
                text: '通知公告',
                qtip: '通知公告',
                url: 'app-productRecycled.html',
                id: 'noticeShow',
                leaf: true
              }
            ]
          },
          {
            text: '信息管理',
            qtip: '信息管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '信息管理',
                qtip: '信息管理',
                url: 'app-productMgmt.html',
                id: 'infoMgmt',
                leaf: true
              }
            ]
          }

        ]
      },
      fields: [
        {
          name: 'text'
        }
      ]
    }, cfg)]);
  }
});