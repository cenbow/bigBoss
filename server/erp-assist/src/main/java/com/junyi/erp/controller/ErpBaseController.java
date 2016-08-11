package com.junyi.erp.controller;

import com.junyi.ecommerce.core.util.rest.BaseController;
import com.junyi.erp.auth.RequestedBy;
import com.junyi.erp.auth.UnauthorizedException;
import com.junyi.erp.domain.user.User;
import com.junyi.erp.service.user.UserService;
import com.junyi.erp.util.AuthConst;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class ErpBaseController extends BaseController {

	@Autowired
	private UserService userService;



	protected RequestedBy validateRequest(HttpServletRequest request) throws UnauthorizedException {
		String requestedBy = request.getHeader(AuthConst.X_REQUESTED_BY);
		if (StringUtils.isBlank(requestedBy)) {
			throw new UnauthorizedException("Header " + AuthConst.X_REQUESTED_BY + " is not set");
		}
		String[] tokens = requestedBy.split(":");
		if (tokens.length != 2) {
			throw new UnauthorizedException("Invalid " + AuthConst.X_REQUESTED_BY + ": " + requestedBy);
		}
		Integer userId, companyId;
		try {
			userId = Integer.valueOf(tokens[0]);
			companyId = Integer.valueOf(tokens[1]);
		} catch (NumberFormatException e) {
			throw new UnauthorizedException("Failed to parse " + AuthConst.X_REQUESTED_BY + ": " + requestedBy);
		}
		request.setAttribute(AuthConst.REQUEST_USER_ID, userId);
		request.setAttribute(AuthConst.REQUEST_COMPANY_ID, companyId);
		return new RequestedBy(userId, companyId);
	}

	protected Integer getRequestUserId(HttpServletRequest request) throws UnauthorizedException {
		Integer userId = (Integer) request.getAttribute(AuthConst.REQUEST_USER_ID);
		if (userId == null) {
			RequestedBy requestedBy = validateRequest(request);
			userId = requestedBy.getUserId();
		}
		return userId;
	}

	protected User getRequestUser(HttpServletRequest request) throws UnauthorizedException {
		Integer userId = getRequestUserId(request);
		User user = userService.selectByPk(userId);
		if (user == null) {
			throw new UnauthorizedException("Unknown user with id: " + userId);
		}
		return user;
	}

	protected Integer getRequestCompanyId(HttpServletRequest request) throws UnauthorizedException {
		Integer companyId = (Integer) request.getAttribute(AuthConst.REQUEST_COMPANY_ID);
		if (companyId == null) {
			RequestedBy requestedBy = validateRequest(request);
			companyId = requestedBy.getCompanyId();
		}
		return companyId;
	}

}
