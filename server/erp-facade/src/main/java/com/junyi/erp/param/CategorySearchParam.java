package com.junyi.erp.param;

import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.erp.domain.Column;
import org.apache.commons.lang3.StringUtils;

public class CategorySearchParam extends PageParam {

	/**
	 * 用户名
	 */
	private String text;

	/**
	 *
	 * @return
	 */
	private Integer columnId;

	public Integer getColumnId() {
		return columnId;
	}

	public void setColumnId(Integer columnId) {
		this.columnId = columnId;
	}

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
		pageRequest.putFilterIfNotNull("columnId", this.columnId);
		if (StringUtils.isNotBlank(this.text)) {
			pageRequest.putFilterIfNotNull("lowerText", this.text.toLowerCase());
		}
		return pageRequest;
	}
}
