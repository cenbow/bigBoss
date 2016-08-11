package com.junyi.erp.enums;

public enum StockJournalBaseType {

	STOCK_TRANSFER("库存调拨"),
	GOODS_RECEIPT("杂项入库"),
	GOODS_ISSUE("杂项出库"),
	STOCK_TAKING("库存盘点"),
	PURCHASE_RECEIPT("采购收货"),
	PURCHASE_RETURN("采购退货"),
	AFTERSALE_RETURN("售后入库"),
	AFTERSALE_ISSUE("售后出库"),
	ORDER("销售订单");

	private String description;

	StockJournalBaseType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
