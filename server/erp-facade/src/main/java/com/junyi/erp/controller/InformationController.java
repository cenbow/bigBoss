package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.Category;
import com.junyi.erp.domain.Company;
import com.junyi.erp.domain.Information;
import com.junyi.erp.param.AccountSearchParam;
import com.junyi.erp.param.CategorySearchParam;
import com.junyi.erp.service.user.CompanyService;
import com.junyi.erp.service.user.InformationService;
import com.junyi.erp.vo.CategoryVO;
import com.junyi.erp.vo.ComboboxVO;
import com.junyi.erp.vo.CompanyVO;
import com.junyi.erp.vo.InformationVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by xww on 2016/8/13.
 */
@Controller
@RequestMapping("/information")
public class InformationController extends ErpBaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(InformationController.class);

    @Autowired
    private InformationService informationService;

    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public void filter(
            AccountSearchParam param,
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        PageRequest pageRequest = param.toPageRequest();
        Page<Information> pages = informationService.selectInformationByFiltersPage(pageRequest);
        PageVO<InformationVO> resultPageVO = PageVO.create(pages, InformationVO.class);
        success(response, resultPageVO);

    }

}
