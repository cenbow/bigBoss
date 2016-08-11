package com.junyi.erp.enums;

/**
 * 这个枚举只在{@link com.junyi.erp.domain.es.inventory.StockJournalSummary}里用
 * 到。它跟{@link com.junyi.erp.enums.StockJournalBaseType}的区别在于，这个里面的
 * 类型是区分出入库的。
 * 
 * @author LxC
 */
public enum StockJournalBaseAggType {

	STOCK_TRANSFER_IN("调拨入库"),
	STOCK_TRANSFER_OUT("调拨出库"),
	GOODS_RECEIPT("杂项入库"),
	GOODS_ISSUE("杂项出库"),
	STOCK_TAKING_IN("库存盘点"),
	STOCK_TAKING_OUT("库存盘点"),
	PURCHASE_RECEIPT("采购收货"),
	PURCHASE_RETURN("采购退货"),
	AFTERSALE_RETURN("售后入库"),
	AFTERSALE_ISSUE("售后出库"),
	ORDER("销售订单");

	private String description;

	StockJournalBaseAggType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
