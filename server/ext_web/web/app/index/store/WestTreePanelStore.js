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
                url: 'app-accountMgmt.html',
                id: 'accountMgmt',
                leaf: true
              },
              /*{
                text: '店铺授权',
                qtip: '店铺授权',
                url: 'app-shopMgmt.html',
                id: 'shopMgmt',
                leaf: true
              },
              {
                text: '物流管理',
                qtip: '物流管理',
                url: 'app-expressMgmt.html',
                id: 'expressMgmt',
                leaf: true
              },{
                text:'会员管理',
                qtip:'会员管理',
                url:'app-customerMgmt.html',
                id:'customerMgmt',
                leaf:'true'
              },
              {
                text: '供应商',
                qtip: '供应商',
                url: 'app-supplierMgmt.html',
                id: 'supplierMgmt',
                leaf: true
              },
              {
                text: '打印模板',
                qtip: '打印模板',
                url: 'app-printTemplate.html',
                id: 'printTemplate',
                leaf: true
              },
              {
                text: '基础设置',
                qtip: '基础设置',
                url: 'app-companySetting.html',
                id: 'companySetting',
                leaf: true
              }*/
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