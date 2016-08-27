package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.user.User;
import com.junyi.erp.param.AccountSearchParam;
import com.junyi.erp.service.user.AccountService;
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
        accountService.update(account);
        success(response, "更新成功");
    }

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public void addAccount(AccountVO vo,HttpServletRequest request,HttpServletResponse response){
        Account account = new Account();
        if(vo != null){
            account = vo.convertVOToPO();
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
        }else {
            HttpSession session = request.getSession();
            session.setAttribute("userId", account.getId());
            success(response,account.getId());
        }
    }

}
