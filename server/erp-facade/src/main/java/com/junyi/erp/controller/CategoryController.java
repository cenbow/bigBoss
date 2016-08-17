package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.Account;
import com.junyi.erp.domain.Category;
import com.junyi.erp.domain.Column;
import com.junyi.erp.domain.Company;
import com.junyi.erp.param.AccountSearchParam;
import com.junyi.erp.param.CategorySearchParam;
import com.junyi.erp.service.user.AccountService;
import com.junyi.erp.service.user.CategoryService;
import com.junyi.erp.service.user.ColumnService;
import com.junyi.erp.vo.AccountVO;
import com.junyi.erp.vo.CategoryVO;
import com.junyi.erp.vo.ComboboxVO;
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
@RequestMapping("/category")
public class CategoryController extends ErpBaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ColumnService columnService;

    @RequestMapping(value = "/listByColumnCode", method = RequestMethod.GET)
    public void listCategoryByColumnCode(
            String code,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        int columnCode = 0;
        if(code != null && code != ""){
            columnCode = Integer.valueOf(code);
        }
        Column column = columnService.selectByCode(code);
        List<Category> list = new ArrayList<>();
        if(column != null ){
           list = categoryService.listCategoryByColumnCode(column.getId());
        }
        List<ComboboxVO> comboboxVOList = new ArrayList<>();
        if(list != null && list.size()>0){
            for(Category category : list){
                //二级分类不显示
                if(category.getLeaf()!=2){
                    ComboboxVO vo = new ComboboxVO();
                    vo.setKey(category.getId());
                    vo.setValue(category.getName());
                    comboboxVOList.add(vo);
                }
            }
        }
        success(response, comboboxVOList);
    }

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public void addCategory(CategoryVO vo,HttpServletRequest request,HttpServletResponse response){
        String voName = vo.getName();
        String nameList[] = voName.split(";");
        vo.setName("");
        for(String name : nameList){
            Category category = new Category();
            if(vo != null){
                category = vo.convertVOToPO();
                category.setName(name);

                //todo createBy 从前台获取
                category.setCreateBy(1);
                category.setCreateDate(new Date());
                if(vo.getColumnCode()!=null){
                    Column column = columnService.selectByCode(vo.getColumnCode());
                    category.setColumnId(column.getId());
                }
                //查重
                int exist =  categoryService.selectIsExistName(name,category.getColumnId());
                if(exist > 0){
                    error(response,"分类名重复");
                    return;
                }
                if(category.getUpClassId()!=null && category.getUpClassId()!=0){
                    category.setLeaf(2);
                }else {
                    category.setLeaf(1);
                }
                category.setStatus(1);

                categoryService.insert(category);
            }
        }


        success(response, "新增成功");
    }


    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public void filter(
            CategorySearchParam param,
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        PageRequest pageRequest = param.toPageRequest();
        Page<Category> pages = categoryService.selectCategoryByFiltersPage(pageRequest);
        PageVO<CategoryVO> resultPageVO = PageVO.create(pages, CategoryVO.class);
        success(response, resultPageVO);

    }
}
