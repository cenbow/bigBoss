package com.junyi.erp.util;

import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSourceFactory;

/**
 * @author  xiqf
 * @date 创建时间：2016年3月28日 下午3:04:01 
 * @version 1.0
 */
public class Log4j2DataSourceUtil {
	private static DataSource ds = null;

	static {
		try {
			String mayiConfig = System.getenv("ERP_CONFIG");
			FileReader in = new FileReader(new File(mayiConfig + "/MyMon/db.properties"));
			Properties props = new Properties();
			props.load(in);
			ds = DruidDataSourceFactory.createDataSource(props);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static Connection getConnection() throws SQLException {
		return ds.getConnection();
	}
}
