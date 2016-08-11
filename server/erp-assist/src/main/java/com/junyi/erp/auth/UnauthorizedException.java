package com.junyi.erp.auth;

public class UnauthorizedException extends RuntimeException {

	private static final long serialVersionUID = 5339364141631716094L;

	public UnauthorizedException() {
		super();
	}

	public UnauthorizedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public UnauthorizedException(String message, Throwable cause) {
		super(message, cause);
	}

	public UnauthorizedException(String message) {
		super(message);
	}

	public UnauthorizedException(Throwable cause) {
		super(cause);
	}

}
