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
            text: '信息管理',
            qtip: '信息管理',
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
            text: '公司管理',
            qtip: '公司管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '公司信息',
                qtip: '公司信息',
                url: 'html/app/companyMgmt.html',
                id: 'companyMgmt',
                leaf: true
              },
              {
                text: '新增公司',
                qtip: '新增公司',
                url: 'html/app/addCompany.html',
                id: 'addCompany',
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
                text: '分类信息',
                qtip: '分类信息',
                url: 'html/app/categoryMgmt.html',
                id: 'categoryInfo',
                leaf: true
              },
              {
                text: '新增分类',
                qtip: '新增分类',
                url: 'html/app/addCategory.html',
                id: 'addCategory',
                leaf: true
              }
            ]
          },
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
                id: 'accountInfo',
                leaf: true
              },
              {
                text: '新增账号',
                qtip: '新增账号',
                url: 'html/app/addAccount.html',
                id: 'addAccount',
                leaf: true
              }
            ]
          },
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