package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Company;
import com.junyi.erp.param.AccountSearchParam;
import com.junyi.erp.service.user.AccountService;
import com.junyi.erp.service.user.CompanyService;
import com.junyi.erp.vo.AccountVO;
import com.junyi.erp.vo.ComboboxVO;
import com.junyi.erp.vo.CompanyVO;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by xww on 2016/8/13.
 */
@Controller
@RequestMapping("/company")
public class CompanyController extends ErpBaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    private CompanyService companyService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public void listCompany(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        List<Company> list = companyService.listAll();
        List<ComboboxVO> comboboxVOList = new ArrayList<>();
        if(list != null && list.size()>0){
            for(Company company : list){
                ComboboxVO vo = new ComboboxVO();
                vo.setKey(company.getId());
                vo.setValue(company.getName());
                comboboxVOList.add(vo);
            }
        }
        success(response, comboboxVOList);
    }

    @RequestMapping(value = "/view/{companyId}", method = RequestMethod.GET)
    public void viewCompany(
            @PathVariable int companyId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Company company = companyService.selectByPk(companyId);
        CompanyVO vo = new CompanyVO();
        vo.convertPOToVO(company);
        success(response, vo);
    }

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public void addCompany(CompanyVO vo,HttpServletRequest request,HttpServletResponse response){
        Company company = new Company();
        if(vo != null){
            company = vo.convertVOToPO();
        }
        HttpSession session = request.getSession();
        Integer userId = (Integer) session.getAttribute("userId");
        company.setCreateBy(userId);
        company.setCreateDate(new Date());
        companyService.insert(company);
        success(response, "新增成功");
    }

    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public void filter(
            AccountSearchParam param,
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        PageRequest pageRequest = param.toPageRequest();
        Page<Company> pages = companyService.selectCompanyByFiltersPage(pageRequest);
        PageVO<CompanyVO> resultPageVO = PageVO.create(pages, CompanyVO.class);
        success(response, resultPageVO);

    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public void updateCompany(CompanyVO vo,HttpServletRequest request,HttpServletResponse response){
        Company company = new Company();
        if(vo != null){
            company = vo.convertVOToPO();
        }
        HttpSession session = request.getSession();
        Integer userId = (Integer) session.getAttribute("userId");
        company.setUpdateBy(userId);
        company.setUpdateDate(new Date());
        companyService.update(company);
        success(response, "更新成功");
    }

}
