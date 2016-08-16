package com.junyi.erp.controller;

import com.junyi.erp.domain.Role;
import com.junyi.erp.service.user.RoleService;
import com.junyi.erp.vo.AccountVO;
import com.junyi.erp.vo.RoleVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by xww on 2016/8/13.
 */
@Controller
@RequestMapping("/role")
public class RoleController extends ErpBaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(RoleController.class);

    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "/view/{roleId}", method = RequestMethod.GET)
    public void viewUser(
            @PathVariable int roleId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Role role = roleService.selectByPk(roleId);
        if (role  == null) {
            error(response,"该角色不存在");
            return;
        }

        RoleVO vo = new RoleVO();
        vo.convertPOToVO(role);
        success(response, vo);
    }

}
