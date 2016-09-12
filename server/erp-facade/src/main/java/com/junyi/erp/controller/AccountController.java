package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Role;
import com.junyi.erp.domain.user.User;
import com.junyi.erp.param.AccountSearchParam;
import com.junyi.erp.service.user.AccountService;
import com.junyi.erp.service.user.RoleService;
import com.junyi.erp.service.user.UserService;
import com.junyi.erp.vo.AccountVO;
import com.junyi.erp.vo.UserVO;
import com.sun.org.apache.bcel.internal.generic.NEW;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by xww on 2016/8/13.
 */
@Controller
@RequestMapping("/account")
public class AccountController extends ErpBaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private AccountService accountService;

    @Autowired
    private RoleService roleService;


    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public void filter(
            AccountSearchParam param,
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        PageRequest pageRequest = param.toPageRequest();
        Page<Account> pages = accountService.selectAccountByFiltersPage(pageRequest);
        PageVO<AccountVO> resultPageVO = PageVO.create(pages, AccountVO.class);
        success(response, resultPageVO);

    }

    @RequestMapping(value = "/view/{accountId}", method = RequestMethod.GET)
    public void viewAccount(
            @PathVariable int accountId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Account account = accountService.selectByPk(accountId);
        if (account  == null) {
            error(response,"该账号不存在");
            return;
        }

        AccountVO vo = new AccountVO();
        vo.convertPOToVO(account);
        success(response, vo);
    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public void updateAccount(AccountVO vo,HttpServletRequest request,HttpServletResponse response){
        Account account = new Account();
        if(vo != null){
            account = vo.convertVOToPO();
        }
        Integer roleId = account.getRoleId();
        Role role = roleService.selectByPk(roleId);
        account.setRoleName(role.getRoleName());
        accountService.update(account);
        success(response, "更新成功");
    }

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public void addAccount(AccountVO vo,HttpServletRequest request,HttpServletResponse response){
        Account account = new Account();
        if(vo != null){
            account = vo.convertVOToPO();
        }

        Boolean exist = accountService.isExistUserName(vo.getUserName());
        if(exist){
            error(response,"用户名重复，请重新输入");
            return;
        }
        account.setStatus(1);
//        account.setCreateBy(1);
        HttpSession session = request.getSession();
        Integer userId = (Integer) session.getAttribute("userId");
        account.setCreateBy(userId);
        account.setCreateDate(new Date());
        accountService.insert(account);
        success(response, "新增成功");
    }

    @RequestMapping(value = "/delete/{accountId}", method = RequestMethod.GET)
    public void deleteAccount(
            @PathVariable int accountId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        if(accountId != 0){
            accountService.deleteByPk(accountId);
            success(response,"删除成功");
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(
            String username,
            String password,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        Map map = new HashMap();
        map.put("username",username);
        map.put("password",password);
        Account account = accountService.selectByUNAndPs(map);
        if(account == null){
            error(response,"账号或密码错误，请重试");
        } else if(account.getStatus()!= 1){
            error(response,"账号已被禁用，请联系管理员");
        }else {
            HttpSession session = request.getSession();
            session.setAttribute("userId", account.getId());
            session.setAttribute("companyId", account.getCompanyId());
            session.setAttribute("roleId", account.getRoleId());
            Map result = new HashMap();
            result.put("accountId",account.getId());
            result.put("roleId",account.getRoleId());
            result.put("companyId",account.getCompanyId());
            success(response, result);
        }
    }

    @RequestMapping(value = "/changeStatus", method = RequestMethod.POST)
    public void changeStatus(
            @RequestParam(value = "id") Integer id,
            @RequestParam(value = "status") Integer status,
            HttpServletRequest request,
            HttpServletResponse response) {
        Account account = null;
        if (id != 0) {
            account = accountService.selectByPk(id);
        } else {
            return;
        }
        account.setStatus(status);
        Integer roleId = account.getRoleId();
        Role role = roleService.selectByPk(roleId);
        account.setRoleName(role.getRoleName());
        accountService.update(account);
        success(response, "更新成功");
    }

}
