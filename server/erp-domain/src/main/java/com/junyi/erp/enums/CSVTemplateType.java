package com.junyi.erp.enums;


public enum CSVTemplateType {
	/**
	 * 商品库存导出模板
	 */
	PRODUCT_EXPORT,
	/**
	 * 国内仓整库区盘点单模板
	 */
	DOMESTIC_CHECK,
	/**
	 * 库位信息导入模板
	 */
	WHS_PICK_LOC_IMPORT,
	/**
	 * 库位信息导出模板
	 */
	WHS_PICK_LOC_EXPORT,
	/**
	 * 库存调拨-商品导入模板
	 */
	STOCK_TRANSFER_IMPORT,
	/**
	 * 杂项入库-商品导入模板
	 */
	GOODS_RECEIPT_IMPORT,
	/**
	 * 杂项出库-商品导入模板
	 */
	GOODS_ISSUE_IMPORT
}
