package com.junyi.erp.param;

import java.util.List;

import com.junyi.ecommerce.core.mybatis.page.PageRequest;

public class PageParam {

	public static final int DEFAULT_PAGE_NUMBER = 1;
	public static final int DEFAULT_PAGE_SIZE = 20;

	// --------------------------------------------------------------------
	// 分页与排序
	// --------------------------------------------------------------------

	/**
	 * 页号码,页码从1开始
	 */
	private int page = DEFAULT_PAGE_NUMBER;

	/**
	 * 分页大小
	 */
	private int limit = DEFAULT_PAGE_SIZE;

	/**
	 * 排序
	 */
	private List<String> sort;

	public int calcStart() {
		int start = (getPage() - 1) * getLimit();
		return start > 0 ? start : 0;
	}

	public PageRequest toPageRequest() {
		return new PageRequest(page, limit);
	}

	protected void appendPageParam(StringBuilder buff) {
		buff.append("page=").append(page);
		buff.append(", limit=").append(limit);
		if (sort != null) buff.append(", sort=").append(sort);
	}

	// --------------------------------------------------------------------
	// Getters & Setters
	// --------------------------------------------------------------------

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
		this.page = page < 1 ? DEFAULT_PAGE_NUMBER : page;
    }

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit <= 0 ? DEFAULT_PAGE_SIZE : limit;
	}

	public List<String> getSort() {
		return sort;
	}

	public void setSort(List<String> sort) {
		this.sort = sort;
	}
}
