package com.junyi.erp.enums;

public enum OrderPaymentMethod {

	ALIPAY("支付宝"),
	WXPAY("微信支付"),
	ALLINPAY("通联支付"),
	CASH("现金支付"),
	BANK_TRANSFER("银行转账"),
	OTHER("其他");

	private String description;

	OrderPaymentMethod(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

}
