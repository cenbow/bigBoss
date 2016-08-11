package com.junyi.erp.controller;

import com.junyi.erp.domain.user.User;
import com.junyi.erp.service.user.UserService;
import com.junyi.erp.vo.UserVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/user")
public class UserController extends ErpBaseController{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	//详情
	@RequestMapping(value = "/view/{userId}", method = RequestMethod.GET)
	public void viewUser(
			@PathVariable int userId,
			HttpServletRequest request,
			HttpServletResponse response
	) {
		User user = userService.selectByPk(userId);
		if (user  == null) {
			error(response,"该人员不存在");
			return;
		}

		UserVO vo = new UserVO();
		vo.convertPOToVO(user);
		success(response, vo);
	}


}
