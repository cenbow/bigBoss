package com.junyi.erp.auth;

/**
 * Send through HTTP header X-Requested-By: <userId>:<companyId>
 * 
 * @author LxC
 */
public class RequestedBy {

	private Integer userId;
	
	private Integer companyId;

	public RequestedBy(Integer userId, Integer companyId) {
		this.userId = userId;
		this.companyId = companyId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

}
