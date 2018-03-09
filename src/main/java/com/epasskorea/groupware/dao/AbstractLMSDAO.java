/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.dao;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import com.ibatis.sqlmap.client.SqlMapClient;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * Class Name : AbstractLMSLDAO
 * Description : Abstract LMS 공통 DAO
 * Modification Information
 * Date			Autor			Contents
 * -----------  --------------  --------------------------------
 * 2013.10.00   dolcoms	 	    	
 * 
 * @author: dolcoms
 * @version: 1.0
*/
public class AbstractLMSDAO  extends EgovAbstractMapper {
    /**
     * Annotation 형식으로 sqlMapClient 를 받아와 이를
     * super(SqlMapClientDaoSupport) 의 setSqlMapClient
     * 메서드를 호출하여 설정해 준다.
     * @param sqlMapClientIR
     *        - ibatis 의 SQL Map 과의 상호작용을 위한 기본 클래스로
     *        mapped statements(select, insert, update,
     *        delete 등) 의 실행을 지원함.
     */
   /* @Resource(name = "sqlMapClientLMS")
    public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
        super.setSqlMapClient(sqlMapClient);
    }*/
	
	@Resource(name = "sqlMapClientLMS")
	 public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
	    	super.setSqlSessionFactory(sqlSession);
	    }





}