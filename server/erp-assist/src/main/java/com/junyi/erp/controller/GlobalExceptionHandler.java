package com.junyi.erp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.junyi.ecommerce.core.exception.BusinessException;
import com.junyi.ecommerce.core.exception.BusinessRollbackException;
import com.junyi.ecommerce.core.mybatis.dao.DatabaseException;
import com.junyi.ecommerce.core.util.rest.BaseController;
import com.junyi.ecommerce.core.util.rest.ResultMessageBuilder;
import com.junyi.erp.auth.UnauthorizedException;

@ControllerAdvice
class GlobalExceptionHandler extends BaseController {

	private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(value = Exception.class)
	public void defaultErrorHandler(Exception e, 
			HttpServletRequest request, HttpServletResponse response) throws Exception {

		// If the exception is annotated with @ResponseStatus rethrow it and let
		// the framework handle it
		if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null) {
			throw e;
		}

		String errMsg;  // error message
		String resMsg;  // response message

		if (e instanceof BusinessException || e instanceof BusinessRollbackException) {
			errMsg = e.getMessage();
			resMsg = e.getMessage();
		} else if (e instanceof UnauthorizedException) {
			errMsg = "Unauthorized access: " + e.getMessage();
			resMsg = "没有授权，禁止访问";
			// 返回403状态吗
			response.setStatus(403);
		} else if (e instanceof DatabaseException /* || e instanceof DataAccessException || e instanceof PersistenceException */) {
			errMsg = "Uncaught database exception: " + e.getMessage();
			resMsg = "数据库操作错误, 请联系管理员！";
		} else {
			errMsg = "Uncaught exception: " + e.getMessage();
			resMsg = "服务器错误, 请联系管理员！";
		}

		LOGGER.error(errMsg + " (URI: " + request.getRequestURI() + ")", e);
		writeAjaxJSONResponse(ResultMessageBuilder.error(resMsg), response);
	}

}