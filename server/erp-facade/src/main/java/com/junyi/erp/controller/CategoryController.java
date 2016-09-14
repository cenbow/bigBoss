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
import javax.servlet.http.HttpSession;
import java.util.*;

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

    @RequestMapping(value = "/listAll", method = RequestMethod.GET)
    public void listCategoryAll(
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        List<Category> list = new ArrayList<>();
        list = categoryService.listAll();

        List<ComboboxVO> comboboxVOList = new ArrayList<>();
        if (list != null && list.size() > 0) {
            for (Category category : list) {
                ComboboxVO vo = new ComboboxVO();
                vo.setKey(category.getId());
                vo.setValue(category.getName());
                comboboxVOList.add(vo);
            }
        }
        ComboboxVO vo = new ComboboxVO();
        vo.setKey(0);
        vo.setValue("无");
        comboboxVOList.add(vo);
        success(response, comboboxVOList);
    }


    @RequestMapping(value = "/listByColumnCode", method = RequestMethod.GET)
    public void listCategoryByColumnCode(
            String code,
            String currentId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        int columnCode = 0;
        Map params = new HashMap();
        if (code == null || currentId == null) {
            return;
        }
        if (code != null && code != "") {
            columnCode = Integer.valueOf(code);
        }
        if (currentId != null && currentId != "") {
            params.put("currentId", Integer.valueOf(currentId));
        }
        Column column = columnService.selectByCode(code);
        List<Category> list = new ArrayList<>();

        if (column != null) {
            params.put("columnId", column.getId());
            params.put("status", 1);
            list = categoryService.listCategoryByColumnCode(params);
        }

        List<ComboboxVO> comboboxVOList = new ArrayList<>();
        if (list != null && list.size() > 0) {
            for (Category category : list) {
                //二级分类不显示
                if (category.getLeaf() != 2 && category.getId() != params.get("currentId")) {
                    ComboboxVO vo = new ComboboxVO();
                    vo.setKey(category.getId());
                    vo.setValue(category.getName());
                    comboboxVOList.add(vo);
                }
            }
        }
        ComboboxVO vo = new ComboboxVO();
        vo.setKey(0);
        vo.setValue("无");
        comboboxVOList.add(vo);
        success(response, comboboxVOList);
    }

    /**
     * 不需要currentId的，如新增分类，不想改了，复制下
     * @param code
     * @param request
     * @param response
     */
    @RequestMapping(value = "/listByColumnCode1", method = RequestMethod.GET)
    public void listCategoryByColumnCode1(
            String code,
            Integer status,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        int columnCode = 0;
        Map params = new HashMap();

        if (code != null && code != "") {
            columnCode = Integer.valueOf(code);
        }

        Column column = columnService.selectByCode(code);
        List<Category> list = new ArrayList<>();

        if (column != null) {
            params.put("columnId", column.getId());
            if(status == null || status == 1){
                params.put("status", 1);
            }
            list = categoryService.listCategoryByColumnCode(params);
        }

        List<ComboboxVO> comboboxVOList = new ArrayList<>();
        if (list != null && list.size() > 0) {
            for (Category category : list) {
                //二级分类不显示
                if (category.getLeaf() != 2) {
                    ComboboxVO vo = new ComboboxVO();
                    vo.setKey(category.getId());
                    vo.setValue(category.getName());
                    comboboxVOList.add(vo);
                }
            }
        }
        ComboboxVO vo = new ComboboxVO();
        vo.setKey(0);
        vo.setValue("无");
        comboboxVOList.add(vo);
        success(response, comboboxVOList);
    }

    @RequestMapping(value = "/listByUpClassId", method = RequestMethod.GET)
    public void listByUpClassId(
            Integer id,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        if (id == null) {
            return;
        }
        List<Category> categories = categoryService.listCategoryByUpClassId(id);
        List<ComboboxVO> comboboxVOList = new ArrayList<>();
        if (categories != null && categories.size() > 0) {
            for (Category category : categories) {
                ComboboxVO vo = new ComboboxVO();
                vo.setKey(category.getId());
                vo.setValue(category.getName());
                comboboxVOList.add(vo);
            }
        }

        ComboboxVO vo = new ComboboxVO();
        vo.setKey(null);
        vo.setValue("无");
        comboboxVOList.add(vo);
        success(response, comboboxVOList);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addCategory(CategoryVO vo, HttpServletRequest request, HttpServletResponse response) {
        String voName = vo.getName();
        String nameList[] = voName.split(";");
        vo.setName("");
        for(String name : nameList){
            if(name.trim().equals("")){
                error(response,"分类名不能为空格");
                return;
            }
        }

        StringBuffer existStr = new StringBuffer();
        Boolean flag = true;
        for (String name : nameList) {
            Category category = new Category();
            if (vo != null) {
                category = vo.convertVOToPO();
                category.setName(name);
                HttpSession session = request.getSession();
                Integer userId = (Integer) session.getAttribute("userId");
                category.setCreateBy(userId);
                category.setCreateDate(new Date());
                if (vo.getColumnCode() != null) {
                    Column column = columnService.selectByCode(vo.getColumnCode());
                    category.setColumnId(column.getId());
                }
                //查重
                Category exist = categoryService.selectIsExistName(name, category.getColumnId(), vo.getUpClassId());
                if (exist !=null) {
                    flag = false;
                    if(nameList.length == 1){
                        error(response, "分类名"+ exist.getName() +"重复");
                        return;
                    }else{
                        existStr.append(exist.getName()+"、");
//                        error(response, "分类名" + exist.getName() + "重复," + exist.getName() +"之前的分类已为您添加成功");
                    }
//                    return;
                } else{
                    if (category.getUpClassId() != null && category.getUpClassId() != 0) {
                        category.setLeaf(2);
                    } else {
                        category.setLeaf(1);
                    }
                    category.setStatus(1);

                    categoryService.insert(category);
                }
            }
        }
        if(flag){
            success(response, "新增成功");
        }else {
            String str = existStr.substring(0, existStr.length() - 1);
            error(response, "分类名" + str + "重复,请重新添加，其他分类已添加成功" );
        }

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


    @RequestMapping(value = "/view/{categoryId}", method = RequestMethod.GET)
    public void viewCategory(
            @PathVariable int categoryId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Category category = categoryService.selectByPk(categoryId);
        CategoryVO vo = new CategoryVO();
        vo.convertPOToVO(category);
        success(response, vo);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void updateCategory(CategoryVO vo, HttpServletRequest request, HttpServletResponse response) {
        Category category = new Category();
        if (vo != null) {
            category = vo.convertVOToPO();
        }

        if (category.getUpClassId() != 0) {
            List<Category> list = categoryService.listCategoryByUpClassId(category.getId());
            if (list != null && list.size() > 0) {
                error(response, "该分类下有二级分类，无法降级");
                return;
            }
        }

        if (category.getStatus() == 0) {
            List<Category> list = categoryService.listCategoryByUpClassId(category.getId());
            if (list != null && list.size() > 0) {
                error(response, "该分类下有二级分类，无法停用");
                return;
            }
        }

        if(category.getStatus() == 1 && category.getUpClassId()!=0){
            Category ca = categoryService.selectByPk(category.getUpClassId());
            if(ca == null || ca.getStatus() == 0){
                error(response, "该一级分类已停用，请启用后再启用该二级分类");
                return;
            }
        }

        HttpSession session = request.getSession();
        Integer userId = (Integer) session.getAttribute("userId");
        category.setUpdateBy(userId);
        category.setUpdateDate(new Date());
        categoryService.update(category);
        success(response, "更新成功");

    }
}
