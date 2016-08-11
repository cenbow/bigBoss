package com.junyi.erp.enums;

public enum PrintTemplateType {

	EXPRESS_WAYBILL(true, "快递单"),
	EXPRESS_COD_WAYBILL(true, "快递单（货到付款）"),
	EXPRESS_E_WAYBILL(true, "快递单（电子面单）"),
	SHIPPING(true, "发货单"),

	PICKING(false, "拣货单"),
	PURCHASE_ORDER(false, "采购订单"),
	PURCHASE_RECEIPT(false, "采购收货单"),
	PURCHASE_RETURN(false, "采购退货单"),
	STOCK_TRANSFER(false, "调拨单"),
	GOODS_RECEIPT(false, "杂项收货单"),
	GOODS_ISSUE(false, "杂项发货单");

	/**
	 * 是否允许用户自己添加新的模板，主要用户添加模板->选择类型的时候，
	 * allowAdd为true的才会出现在下拉菜单
	 */
	private boolean allowAdd;
	private String description;

	PrintTemplateType(boolean allowAdd, String description) {
		this.allowAdd = allowAdd;
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public boolean isAllowAdd() {
		return allowAdd;
	}

	public static PrintTemplateType[] getTypesAllowAdd() {
		return typesAllowAdd;
	}

	private static PrintTemplateType[] typesAllowAdd = new PrintTemplateType[] {
		EXPRESS_WAYBILL,
		EXPRESS_COD_WAYBILL,
		EXPRESS_E_WAYBILL,
		SHIPPING
	};

}
