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
                url: 'html/app/infoDisclosureMgmt.html',
                id: 'infoDisclosure',
                leaf: true
              },
              {
                text: '学习园地',
                qtip: '学习园地',
                url: 'html/app/studyGardenMgmt.html',
                id: 'studyGarden',
                leaf: true
              },
              {
                text: '市场资讯',
                qtip: '市场资讯',
                url: 'html/app/marketInfoMgmt.html',
                id: 'marketInfo',
                leaf: true
              },
              {
                text: '通知公告',
                qtip: '通知公告',
                url: 'html/app/noticeShowMgmt.html',
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
                text: '账号信息',
                qtip: '账号信息',
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
              },{
                text: '修改账号',
                qtip: '修改账号',
                url: 'html/app/editAccount.html',
                id: 'editAccount',
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