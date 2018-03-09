/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.test.context.ContextConfiguration;

/**
 * Class Name : CommonLMSDAO
 * Description : CommonLMSDAO
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2013.10.00   dolcoms	 	    	
 * 
 * @author: dolcoms
 * @version: 1.0
*/
@Repository("commonLMSDAO")
@ContextConfiguration
public class CommonLMSDAO extends AbstractLMSDAO { 

	/**
	 * 데이터 등록한다.
	 * @param param - 등록할 정보가 담긴 param
	 * @return 등록 결과
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public Integer insert(String queryID,  Map param) throws DataAccessException {
		return (Integer)super.insert(queryID, (Object)param);
	}
	
	/**
	 * 데이터 등록후 key return 
	 * @param param - 등록할 정보가 담긴 param
	 * @return 등록 결과
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public Integer insertRetKey(String queryID,  Map param) throws DataAccessException {
		return (Integer)super.insert(queryID, (Object)param);
	}
	
	/**
	 * 데이터 등록후 key return 
	 * @param param - 등록할 정보가 담긴 param
	 * @return 등록 결과
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public Object insertRetKeyStr(String queryID,  Map param) throws DataAccessException {
		return super.insert(queryID, (Object)param);
	}	

	/**
	 * 데이터 수정한다.
	 * @param param - 수정할 정보가 담긴 param
	 * @return 삭제 결과
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public int update(String queryID, Map param) throws DataAccessException {
		return (int)update(queryID, (Object)param);
	}

	/**
	 * 데이터 삭제한다.
	 * @param param - 삭제할 정보가 담긴 param
	 * @return 삭제 결과 
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public int delete(String queryID, Map param) throws DataAccessException {
		return (int)delete(queryID, (Object)param);
	}

	/**
	 * 데이터 조회한다.
	 * @param vo - 조회할 정보가 담긴 param
	 * @return 조회한 글
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public Map select(String queryID, Map param) throws DataAccessException {
		return (Map) selectByPk(queryID, param);
	}

	/**
	 * 데이터 조회한다.
	 * @param vo - 조회할 정보가 담긴 param
	 * @return 조회한 글
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public Object selectObject(String queryID, Map param) throws DataAccessException {
		return (Object) selectByPk(queryID, param);
	}

	/**
	 * 데이터 조회한다.
	 * @param vo - 조회할 정보가 담긴 param
	 * @return 조회한 글
	 * @exception Exception
	 */
	public Object selectObject(String queryID, Object param) throws DataAccessException {
		return (Object) selectByPk(queryID, param);
	}
	
	/**
	 * 데이터 목록을 조회한다.
	 * @param param - 조회할 정보가 담긴 param
	 * @return 글 목록
	 * @exception Exception
	 */
	@SuppressWarnings("rawtypes")
	public List selectList(String queryID, Map param) throws DataAccessException {
		List returnList =  list(queryID, param);
		if(returnList == null) {
			returnList = new ArrayList();
		}
		return returnList;
	}

	/**
	 * 데이터 총 갯수를 조회한다.
	 * @param param - 조회할 정보가 담긴 param
	 * @return 글 총 갯수
	 * @exception
	 */
	@SuppressWarnings("rawtypes")
	public int selectCount(String queryID, Map param) throws DataAccessException {
		return (Integer)getSqlSession().selectOne(queryID, param);
	}
}