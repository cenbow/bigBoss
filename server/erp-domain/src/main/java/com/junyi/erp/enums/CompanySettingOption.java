package com.junyi.erp.enums;

public enum CompanySettingOption {

	// 订单设置
	ORDER_REVIEW_TYPE("订单客审类型"),
	ORDER_REVIEW_MANUAL_ORDER("按需客审>手工订单"),
	ORDER_REVIEW_WITH_BUYER_MEMO("按需客审>有买家备注"),
	ORDER_FINANCIAL_REVIEW_TYPE("订单财审类型"),
	ORDER_FINANCIAL_REVIEW_VALUE("订单财审系数"),
	ORDER_FINANCIAL_REVIEW_MANUAL_ORDER("手工订单财审"),
	ORDER_ERROR_IF_OVERSELL("超卖自动异常"),
	ORDER_ERROR_IF_REQUEST_AFTERSALE("售后自动异常"),
	ORDER_REFUND_MAX_PCT("退款金额百分比"),
	// 发货设置
	DELIVER_TYPE("订单发货类型"),
	DELIVER_EXAMINE_OMNI_BARCODE("万能条码"),
	DELIVER_WEIGH_WARN("称重差异提醒"),
	DELIVER_WEIGH_WARN_LIMIT("称重差异提醒下限"),
	DELIVER_EXAMINE_ALLOW_MODIFY_AMOUNT("允许修改验货数量"),
	// 库存设置
	STOCK_AREA_ALLOW_NEGATIVE_QTY("库区允许负库存"),
	// 采购设置
	PURCHASE_ALLOW_OVER_RECEIPT("允许超收");

	private String description;

	CompanySettingOption(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
