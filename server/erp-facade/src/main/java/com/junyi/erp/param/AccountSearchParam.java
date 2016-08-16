package com.junyi.erp.param;

import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import org.apache.commons.lang3.StringUtils;

public class AccountSearchParam extends PageParam {

	/**
	 * 用户名/登录名/邮箱/手机号
	 */
	private String text;
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Override
	public PageRequest toPageRequest() {
		PageRequest pageRequest = super.toPageRequest();
		pageRequest.putFilterIfNotNull("text", this.text);
		if (StringUtils.isNotBlank(this.text)) {
			pageRequest.putFilterIfNotNull("lowerText", this.text.toLowerCase());
		}
		return pageRequest;
	}
}
