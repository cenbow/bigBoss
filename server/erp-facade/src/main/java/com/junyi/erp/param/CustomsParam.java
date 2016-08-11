package com.junyi.erp.param;

import com.junyi.erp.enums.YesNoFlag;
/**
 * 海关信息
 * @author Junyi
 *
 */
public class CustomsParam extends PageParam {

	/**
	 * 主键
	 */
	private Integer id;
	
	/**
	 * 海关name
	 */
	private String name;
	/**
	 * 关区代码
	 */
	private String code;
	/**
	 * 接口版本
	 */
	private String apiVer;
	/**
	 * 订单报关推送地址
	 */
	private String apiUrl;
	/**
	 * 备注
	 */
	private String memo;
	
	/**
	 * 运单独立报关
	 */
	private YesNoFlag needWaybillDecl;
	
	/**
	 * 支付独立报关
	 */
	private YesNoFlag needPaymentDecl;
	
	public String getName() {	
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getApiVer() {
		return apiVer;
	}

	public void setApiVer(String apiVer) {
		this.apiVer = apiVer;
	}

	public String getApiUrl() {
		return apiUrl;
	}

	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public YesNoFlag getNeedWaybillDecl() {
		return needWaybillDecl;
	}

	public void setNeedWaybillDecl(YesNoFlag needWaybillDecl) {
		this.needWaybillDecl = needWaybillDecl;
	}

	public YesNoFlag getNeedPaymentDecl() {
		return needPaymentDecl;
	}

	public void setNeedPaymentDecl(YesNoFlag needPaymentDecl) {
		this.needPaymentDecl = needPaymentDecl;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
}
