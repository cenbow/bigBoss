package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.*;
import com.junyi.erp.param.AccountSearchParam;
import com.junyi.erp.param.InformationSearchParam;
import com.junyi.erp.service.user.*;
import com.junyi.erp.vo.InformationVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.jsf.FacesContextUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by xww on 2016/8/13.
 */
@Controller
@RequestMapping("/information")
public class InformationController extends ErpBaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(InformationController.class);

    @Autowired
    private InformationService informationService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ColumnService columnService;

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public void filter(
            AccountSearchParam param,
            String code,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        PageRequest pageRequest = param.toPageRequest();
        Column column = columnService.selectByCode(code);
        pageRequest.putFilterIfNotNull("columnId", column.getId());

        HttpSession session = request.getSession();
        Integer roleId = (Integer) session.getAttribute("roleId");
        if (roleId == null) {
            error(response, "session过期，请重新登录!");
            return;
        }
        if (roleId != 1) {
            pageRequest.putFilterIfNotNull("status", 1);
            pageRequest.setPageSize(Integer.MAX_VALUE);
        }
        Page<Information> pages = informationService.selectInformationByFiltersPage(pageRequest);
        PageVO<InformationVO> resultPageVO = PageVO.create(pages, InformationVO.class);
        success(response, resultPageVO);
    }


    /**
     * 信息披露搜索
     * @param param
     * @param request
     * @param response
     */
    @RequestMapping(value = "/filterInfo", method = RequestMethod.POST)
    public void filterInfo(
            InformationSearchParam param,
            String code,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        PageRequest pageRequest = param.toPageRequest();
        Column column = columnService.selectByCode(code);
        pageRequest.putFilterIfNotNull("columnId", column.getId());

        HttpSession session = request.getSession();
        Integer roleId = (Integer) session.getAttribute("roleId");
        if (roleId == null) {
            error(response, "session过期，请重新登录!");
            return;
        }
        if (roleId != 1) {
            pageRequest.putFilterIfNotNull("status", 1);
            pageRequest.setPageSize(Integer.MAX_VALUE);
        }
        Page<Information> pages = informationService.selectInformationByFiltersPage(pageRequest);
        PageVO<InformationVO> resultPageVO = PageVO.create(pages, InformationVO.class);
        success(response, resultPageVO);
    }

    @RequestMapping(value = "/selectByLevelOne", method = RequestMethod.POST)
    public void selectByLevelOne(
            String code,
            Integer levelOne,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Map param = new HashMap();
        param.put("levelOne", levelOne);
        Column column = columnService.selectByCode(code);
        param.put("columnId", column.getId());
        param.put("status", 1);
        List<Information> informations = informationService.selectByParam(param);
        List<InformationVO> voList = new ArrayList<>();
        if (informations != null && informations.size() > 0) {
            for (Information info : informations) {
                InformationVO vo = new InformationVO();
                vo.convertPOToVO(info);
                voList.add(vo);
            }
        }
        success(response, voList);
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public void selectById(
            Integer id,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Information information = informationService.selectInformationByPK(id);
        success(response, information);
    }

    @RequestMapping(value = "/searchInfo", method = RequestMethod.POST)
    public void searchInfo(
            String code,
            Integer levelOne,
            Integer levelTwo,
            String name,
            Integer accountId,
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            Integer companyIdByInfo,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Map param = new HashMap();

        param.put("status", 1);
        HttpSession session = request.getSession();
//        Integer companyId = (Integer) session.getAttribute("companyId");
        if(companyIdByInfo != null && companyIdByInfo != 0){
            param.put("companyId", companyIdByInfo);
        }
        if (levelOne != 0) {
            param.put("levelOne", levelOne);
        }
        if (code != null && code != "") {
            Column column = columnService.selectByCode(code);
            param.put("columnId", column.getId());
        }
        if (levelTwo != 0) {
            param.put("levelTwo", levelTwo);
        }
        if (name != null && !name.isEmpty()) {
            param.put("name", name);
        }
        if (startDate != null) {
            param.put("startDate", startDate);
        }
        if (endDate != null) {
            param.put("endDate", endDate);
        }
        if (accountId != null) {
            param.put("createBy", accountId);
        }

        List<Information> informations = informationService.selectByParam(param);
        List<InformationVO> voList = new ArrayList<>();
        if (informations != null && informations.size() > 0) {
            for (Information info : informations) {
                Company company = companyService.selectByPk(info.getCompanyId());
                if(company!=null){
                    info.setCompanyName(company.getName());
                    info.setCompanyCode(company.getCode());
                }
                if(info.getLevelOne()!= null && info.getLevelOne()>0){
                    Category category = categoryService.selectByPk(info.getLevelOne());
                    info.setLevelOneName(category.getName());
                }
                if(info.getLevelTwo()!=null && info.getLevelTwo()>0){
                    Category category = categoryService.selectByPk(info.getLevelTwo());
                    info.setLevelTwoName(category.getName());
                }

                InformationVO vo = new InformationVO();
                vo.convertPOToVO(info);
                voList.add(vo);
            }

        }
        success(response, voList);

    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public void upload(
            @RequestParam(value = "file") MultipartFile file,
            Integer id,
            Integer overWrite,
            HttpServletRequest request,
            HttpServletResponse response) {
        Information information = informationService.selectInformationByPK(id);
        /**
         * 处理文件上传
         */
        if (file == null || file.getSize() == 0) {
            error(response, "请上传正确的文件");
            return;
        }
        String fileName = file.getOriginalFilename();
        String suffix = fileName.substring(fileName.lastIndexOf("."));
        if (!(suffix.toLowerCase().equals(".pdf"))) {
            error(response, "只能上传pdf类型的文件");
            return;
        }
        //todo 生成唯一随机数作为文件别名保存到数据库，下载和查看都使用这个

        //时间戳，加到文件名前
        long time = System.currentTimeMillis();
        fileName = String.valueOf(time) + "-" + fileName;
        String path = "C:/savePDF/";
        System.out.print(path);
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdir();
        }
        if (file.getSize() > 0) {
            try {
                SaveFileFromInputStream(file.getInputStream(), path, fileName);
            } catch (IOException e) {
                System.out.println(e.getMessage());
                error(response, "保存文件异常");
                return;
            }
        }
        information.setUrl(fileName.substring(0, fileName.lastIndexOf(".")));
        informationService.insertUrl(information);
        success(response, "上传成功");
    }

    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST)
    public void deleteFile(
            Integer id,
            HttpServletRequest request,
            HttpServletResponse response) {
        Information information = informationService.selectInformationByPK(id);
        String fileName = information.getUrl();
        String path = "C:/savePDF/";
        File existFile = new File(path + fileName + ".pdf");
        if (existFile.exists()) {
            existFile.delete();
        }
        informationService.deleteUrl(id);
        success(response, "删除成功");
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "levelOne") Integer levelOne,
            @RequestParam(value = "levelTwo") Integer levelTwo,
            Integer companyId,
            @RequestParam(value = "text") String text,
            @RequestParam(value = "columnCode") String columnCode,
            Integer id,
            HttpServletRequest request,
            HttpServletResponse response) {
        Information information = new Information();
        information.setName(name);
        information.setLevelOne(levelOne);
        if (levelTwo == null) {
            levelTwo = 0;
        }
        information.setLevelTwo(levelTwo);
        HttpSession session = request.getSession();
        if (companyId != null) {
            information.setCompanyId(companyId);
        } else {
            companyId = (Integer) session.getAttribute("companyId");
            information.setCompanyId(companyId);
        }
        //todo text不能存html代码
        information.setText(text);
        if (id == null || id == 0) {
            Integer userId = (Integer) session.getAttribute("userId");
            information.setCreateBy(userId);
            Date date = new Date();
            information.setCreateDate(date);
            information.setPublishDate(date);
            information.setStatus(1);
            information.setTopStatus(0);
            Column column = columnService.selectByCode(columnCode);
            if (column != null) {
                information.setColumnId(column.getId());
            } else {
                error(response, "栏目编码不存在");
                return;
            }
            int recordId = informationService.insert(information);
            success(response,information.getId());
            return;
        } else {
            information.setId(id);
            Integer userId = (Integer) session.getAttribute("userId");
            information.setUpdateBy(userId);
            information.setUpdateDate(new Date());
            informationService.update(information);
            success(response, "更新成功");
            return;
        }


    }


    @RequestMapping(value = "/changeStatus", method = RequestMethod.POST)
    public void changeStatus(
            @RequestParam(value = "id") Integer id,
            @RequestParam(value = "status") Integer status,
            HttpServletRequest request,
            HttpServletResponse response) {
        Information info = null;
        if (id != 0) {
            info = informationService.selectInformationByPK(id);
        } else {
            return;
        }
        info.setStatus(status);
        info.setUpdateDate(new Date());
        HttpSession session = request.getSession();
        Integer userId = (Integer) session.getAttribute("userId");
        info.setUpdateBy(userId);
        informationService.update(info);
        success(response, "更新成功");
    }

    @RequestMapping(value = "/changeTopStatus", method = RequestMethod.POST)
    public void changeTopStatus(
            @RequestParam(value = "id") Integer id,
            @RequestParam(value = "topStatus") Integer topStatus,
            HttpServletRequest request,
            HttpServletResponse response) {
        Information info = null;
        if (id != 0) {
            info = informationService.selectInformationByPK(id);
        } else {
            return;
        }
        info.setTopStatus(topStatus);
        info.setUpdateDate(new Date());
        HttpSession session = request.getSession();
        Integer userId = (Integer) session.getAttribute("userId");
        info.setUpdateBy(userId);
        informationService.update(info);
        success(response, "更新成功");
    }


    public boolean uploadFile(MultipartFile file, Integer id) {
        return true;
    }

    /** */
    /**
     * 保存文件
     *
     * @param stream
     * @param path
     * @param filename
     * @throws IOException
     */
    public void SaveFileFromInputStream(InputStream stream, String path, String filename) throws IOException {
        FileOutputStream fs = new FileOutputStream(path + "/" + filename);
        byte[] buffer = new byte[1024 * 1024];
        int bytesum = 0;
        int byteread = 0;
        while ((byteread = stream.read(buffer)) != -1) {
            bytesum += byteread;
            fs.write(buffer, 0, byteread);
            fs.flush();
        }
        fs.close();
        stream.close();
    }

    @RequestMapping(value = "/download/{fileName}", method = RequestMethod.GET)
    public void downloadFile(
            @PathVariable String fileName,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        if (fileName == "" || fileName == null) {
            error(response, "没有文件名");
            return;
        }
        String path = "C:/savePDF/" + fileName + ".pdf";
        File file = new File(path);// path是根据日志路径和文件名拼接出来的
        String filename = file.getName();// 获取日志文件名称
        InputStream fis = new BufferedInputStream(new FileInputStream(path));
        byte[] buffer = new byte[fis.available()];
        fis.read(buffer);
        fis.close();
        response.reset();
        // 先去掉文件名称中的空格,然后转换编码格式为utf-8,保证不出现乱码,这个文件名称用于浏览器的下载框中自动显示的文件名
        response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.replaceAll(" ", "").getBytes("utf-8"), "iso8859-1"));
        response.addHeader("Content-Length", "" + file.length());
        OutputStream os = new BufferedOutputStream(response.getOutputStream());
        response.setContentType("application/octet-stream");
        os.write(buffer);// 输出文件
        os.flush();
        os.close();
    }


}

