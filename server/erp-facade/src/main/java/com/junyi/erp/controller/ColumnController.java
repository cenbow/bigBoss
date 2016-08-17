package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.Category;
import com.junyi.erp.domain.Column;
import com.junyi.erp.param.CategorySearchParam;
import com.junyi.erp.service.user.CategoryService;
import com.junyi.erp.service.user.ColumnService;
import com.junyi.erp.vo.CategoryVO;
import com.junyi.erp.vo.ComboboxVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/column")
public class ColumnController extends ErpBaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ColumnController.class);


    @Autowired
    private ColumnService columnService;

    @RequestMapping(value = "/comboList", method = RequestMethod.GET)
    public void comboList(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        List<Column> list = columnService.listAll();

        List<ComboboxVO> comboboxVOList = new ArrayList<>();
        if(list != null && list.size()>0){
            for(Column column : list){
                ComboboxVO vo = new ComboboxVO();
                vo.setKey(column.getId());
                vo.setValue(column.getColumnName());
                comboboxVOList.add(vo);
            }
        }
        success(response, comboboxVOList);
    }


}
