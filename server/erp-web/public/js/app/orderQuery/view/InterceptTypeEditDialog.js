Ext.define('OrderQuery.view.InterceptTypeEditDialog', {
	extend: 'Ext.window.Window',
	alias: 'widget.intercepttypeedit',

	requires: [
		'Ext.grid.Panel',
		'Ext.grid.column.RowNumberer',
		'Ext.view.Table',
		'Ext.grid.column.Action',
		'Ext.toolbar.Toolbar',
		'Ext.toolbar.Fill',
		'Ext.button.Button'
	],

	modal: true,
	height: 211,
	width: 342,
	defaultListenerScope: true,
	layout: 'fit',
	title: '出库类型',

	items: [
		{
			xtype: 'gridpanel',
			border: false,
			title: '',
			columns: [],
			plugins: [
				new Ext.grid.plugin.CellEditing({
					pluginId: "selectIdCellEdit",
					clicksToEdit: 1
				})
			]
		}
	],
	listeners: {
		beforerender: "onBeforeRenderOperate"
	},
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			xtype: "button",
			text: "添加",
			iconCls: "btn-add",
			handler: "onAddButtonClick"
		}]
	}, {
		xtype: 'toolbar',
		dock: 'bottom',
		ui: 'footer',
		items: [
			{
				xtype: 'tbfill'
			},
			{
				xtype: 'button',
				iconCls: 'btn-save',
				text: '保存',
				handler: "onSaveButtonClick"
			},
			{
				xtype: 'button',
				iconCls: 'btn-cancel',
				text: '取消',
				handler: "onCancelButtonClick"
			}
		]
	}
	],

	onAddButtonClick: function () {
		var view = this;

		var model = view.store.getModel();
		var rec = new model({
			name: "",
			type: view.down("grid").getStore().comboxType
		});

		view.down("grid").getStore().insert(0, rec);
		view.down("grid").getPlugin("selectIdCellEdit").startEditByPosition({
			row: 0,
			column: 2
		});
	},

	onSaveButtonClick: function () {
		var view = this,
			grid = view.down("grid");

		//console.info(grid.getStore().load());
		var toUpdate = grid.getStore().getUpdatedRecords();
		var toDestroy = grid.getStore().getRemovedRecords();
		console.info(toUpdate);
		console.info(toDestroy)
		grid.getStore().sync({
			success: function (result) {
				grid.getStore().load();
				view.close();
				TipsUtil.showTips("提示", "保存成功!!!", TipsUtil.INFO);
			}
		});
	},

	onCancelButtonClick: function () {
		var view = this;
		view.close();
	},

	onBeforeRenderOperate: function () {
		var view = this;
		columns = [{
			xtype: 'rownumberer'
		}, {
			xtype: 'actioncolumn',
			width: 30,
			sortable: false,
			menuDisabled: false,
			align: "center",
			items: [{
				iconCls: 'btn-delete',
				tooltip: '删除',
				scope: view,
				handler: view.onRemoveClick
			}]
		}];

		columns.push({
			xtype: 'gridcolumn',
			flex: 1,
			dataIndex: "name",
			align: 'center',
			text: view.columnText,
			editor: {
				allowBlank: false
			}
		});

		view.down("grid").setColumns(columns);
		view.down("grid").setStore(view.store);
		if (!view.store.isLoaded()) {
			view.store.load();
		}
	},

	onRemoveClick: function (grid, rowIndex) {
		var view = this;
		var rec = grid.getStore().getAt(rowIndex);
		view.store.remove(rec);
	}

});