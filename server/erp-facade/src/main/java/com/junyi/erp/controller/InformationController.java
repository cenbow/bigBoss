package com.junyi.erp.controller;

import com.junyi.ecommerce.core.mybatis.page.Page;
import com.junyi.ecommerce.core.mybatis.page.PageRequest;
import com.junyi.ecommerce.core.util.vo.PageVO;
import com.junyi.erp.domain.Information;
import com.junyi.erp.param.AccountSearchParam;
import com.junyi.erp.service.user.InformationService;
import com.junyi.erp.vo.InformationVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.jsf.FacesContextUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

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

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public void upload(
            @RequestParam( value = "file") MultipartFile file,
            HttpServletRequest request,
            HttpServletResponse response){
        if(file == null){
            error(response, "请上传正确的文件");
            return;
        }
        String fileName = file.getOriginalFilename();
        String suffix = fileName.substring(fileName.lastIndexOf("."));
        if(!suffix.equals(".pdf")){
            error(response, "只能上传pdf类型的文件");
            return;
        }
        String path =  "D:/savePDF/";
        System.out.print(path);
        File dir = new File(path);
        if(!dir.exists()){
            dir.mkdir();
        }
        if(file.getSize()>0){
            try {
                SaveFileFromInputStream(file.getInputStream(),path,fileName);
            } catch (IOException e) {
                System.out.println(e.getMessage());
                error(response, "保存文件异常");
                return ;
            }
        }

        success(response, "上传成功");
    }

    /** *//**保存文件
     * @param stream
     * @param path
     * @param filename
     * @throws IOException
     */
    public void SaveFileFromInputStream(InputStream stream,String path,String filename) throws IOException
    {
        FileOutputStream fs=new FileOutputStream( path + "/"+ filename);
        byte[] buffer =new byte[1024*1024];
        int bytesum = 0;
        int byteread = 0;
        while ((byteread=stream.read(buffer))!=-1)
        {
            bytesum+=byteread;
            fs.write(buffer,0,byteread);
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
        if(fileName == "" || fileName == null){
            error(response,"没有文件名");
            return;
        }
        String path =  "D:/savePDF/"+fileName+".pdf";
        File file = new File(path);// path是根据日志路径和文件名拼接出来的
        String filename = file.getName();// 获取日志文件名称
        InputStream fis = new BufferedInputStream(new FileInputStream(path));
        byte[] buffer = new byte[fis.available()];
        fis.read(buffer);
        fis.close();
        response.reset();
        // 先去掉文件名称中的空格,然后转换编码格式为utf-8,保证不出现乱码,这个文件名称用于浏览器的下载框中自动显示的文件名
        response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.replaceAll(" ", "").getBytes("utf-8"),"iso8859-1"));
        response.addHeader("Content-Length", "" + file.length());
        OutputStream os = new BufferedOutputStream(response.getOutputStream());
        response.setContentType("application/octet-stream");
        os.write(buffer);// 输出文件
        os.flush();
        os.close();
    }
}

