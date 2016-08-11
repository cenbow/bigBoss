Ext.define('GoodsIssue.model.GoodsIssueModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String'
    ],
    idProperty: 'baseId',
    fields: [
    {
      type: 'int',
      name: 'baseId'
    },
    {
        type: 'string',
        name: 'baseNo'
    },{
        type: 'string',
        name: 'typeName'
    },{
        type: 'string',
        name: 'type'
    },{
        type: 'string',
        name: 'status',
        convert:function(value) {
            var statusName = "";
            if(value == "DRAFT"){ statusName = "草稿"; }
            if(value == "TRANSFERRED_OUT"){ statusName = "已出库"; }
            if(value == "CANCELLED"){ statusName = "已取消"; }
            return statusName;
        }
    },{
        type: 'string',
        name: 'whsName'
    },{
        type: 'string',
        name: 'whsAreaName'
    },{
        type: 'date',
        name: 'createDate',
        convert: function (value) {
            return value ? new Date(Number(value)) : "";
        }
    },{
        type: 'date',
        name: 'postDate',
        convert: function (value) {
            return value ? new Date(Number(value)) : "";
        }
    },{
        type: 'date',
        name: 'updateDate',
        convert: function (value) {
            return value ? new Date(Number(value)) : "";
        }
    },{
        type: 'string',
        name: 'createByName'
    },{
        type: 'string',
        name: 'memo'
    }]
});