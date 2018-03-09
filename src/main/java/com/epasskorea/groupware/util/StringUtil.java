/**
 * Copyright (c) 2013 EPASSKOREA. All Rights Reserved.
  * Project: Epasskorea B2B LMS Renewal(2013.07~)
*/
package com.epasskorea.groupware.util;

import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.regex.*;
/**
 * Class Name : StringUtil
 * Description : String Utils
 * Modification Information
 * Date			    Autor					Contents
 * -----------  --------------  --------------------------------
 * 2013.10.00   dolcoms	 	    	
 * 
 * @author: dolcoms
 * @version: 1.0
*/
public class StringUtil {
	//private final static Log log = LogFactory.getLog("StringUtil");
	/**
	 * String null check
	 * @param str
	 * @return
	 */
	public static boolean getNullCheck(String str){
		if(str == null || ("").equals(str)) 
			return true;
		else return false;
	}
		
	/**
	 * 쿼리 특수문자 검색
	 * @param params
	 * @return
	 */
	public static String getQuerySpecialString(String str){
		String query="";
		
		if(!getNullCheck(str)){
			query = str.replace("!", "!!").replace("[", "![").replace("]", "!]").replace("%", "!%");
		}		
		
		return query;
	}
	
	/**
	 * 쿼리 특수문자 검색 후 리턴 값은 다시 원래 문자로 변경
	 * @param params
	 * @return
	 */
	public static String getQuerySpecialStringBack(String str){
		String query="";
		
		if(!getNullCheck(str)){
			query = str.replace("![", "[").replace("!]", "]").replace("!%", "%").replace("!!", "!");
		}		
		
		return query;
	}
	/**
	 * 한글 인코딩 변환
	 * @param params
	 * @return
	 */
	public static String getEncodingChange(String params){
		String rParam = "";
		try {
			rParam = new String(params.getBytes("8859_1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return rParam;
	}
	
	
	/**
	 * commandMap의 값을 QueryString 형식으로 생성 반환한다.
	 * @param commandMap
	 * @param removeParams 제거하고자하는 파라메터명 (ex param1,params2,param3...)
	 * @return
	 */
	public static String getQueryString(Map<String, Object> commandMap, String removeParams){
		// 기본 제거 값 
		//removeParams = "," + removeParams + ",authsGrade,lang_code,";
		removeParams = "," + removeParams + ",";
		
		StringBuilder result = new StringBuilder();
		for(String key : commandMap.keySet()){
			// 제거값에 속하지 않고 배열값이 아닐 경우만 파라메터로 생성
			if (removeParams.indexOf("," + key + ",") == -1){
				if(String.valueOf(commandMap.get(key)).startsWith("[Ljava.lang.String")){
					String[] valueArr = (String[]) commandMap.get(key);
					for(int i=0;i<valueArr.length;i++){
						result.append("&" + key + "=" + valueArr[i]);
					}						
				}else{
					result.append("&" + key + "=" + commandMap.get(key));
				}
			}
		}

		if (result.length() > 0)
			return result.toString().substring(1);
		else
			return "";
	}
	
	/**
	 * last key + 1 return
	 * @param type : template(T)/content(C)/webpage(W)/layout(L) 구분 
	 * @param maxKey : last key
	 * @return
	 */
	public static String getMakeTCPCodeKey(String type, String maxKey){
		
		if(!getNullCheck(type) && !getNullCheck(maxKey)){
			int tmp = Integer.valueOf(maxKey.replace(type, ""));   //구분제거
			String zStr = "";
			for(int i=0; i<(maxKey.length() - String.valueOf(tmp+1).length()-1); i++){
				zStr = zStr + "0";
			}
			
			return type + zStr + String.valueOf(tmp + 1);			
		}else{
			return type + "0000001";
		}
	}
	
	
	
	@SuppressWarnings("rawtypes")
	public static String url_encoding(java.util.Hashtable hash){
	    if ( hash == null ) throw new IllegalArgumentException("argument is null");
	    java.util.Enumeration enums = hash.keys();
	    StringBuffer buf = new StringBuffer();
	    boolean isFirst = true;
	    while(enums.hasMoreElements()){
	    	if (isFirst) isFirst = false;
	    	else buf.append('&');
	    	String key = (String)enums.nextElement();
	    	String value = (String)hash.get(key);
	    	
	    	buf.append(key);
			buf.append('=');
			buf.append(value);			
	    	/*try {
	    		//buf.append(java.net.URLEncoder.encode(key));
				buf.append(new String(key.getBytes("UTF-8"), "8859_1"));	    		
				buf.append('=');				
				//buf.append(java.net.URLEncoder.encode(value));
				buf.append(new String(value.getBytes("UTF-8"), "8859_1"));				
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}*/	
	    	//System.out.println("## value ==> "+value);
	    }
	    System.out.println("## encoding ==> "+System.getProperty("file.encoding"));
	   
	    return buf.toString();
	  }
	
	
	/**
	 * cutByte
	 * @param data : 문자 byte배열
	 * @param cutLen : 자를 바이트 수
	 * @return 바이트수 만큼 잘린 문자
	 */
	public static byte[] cutBytes(byte[] data, int cutLen){
		byte[] tmp;
		int len = data.length;
		if(len <= cutLen){
			tmp = new byte[len];
			System.arraycopy(data, 0, tmp, 0, len);
			return tmp;
		}
		else if(cutLen > 0){
			int pos = cutLen -1;
			while(pos > 0&& (data[pos] & 0x80) == 0x80){
				pos--;
			}
			if((cutLen - pos) %2 ==0){
				tmp = new byte[cutLen];
				System.arraycopy(data, 0, tmp, 0, cutLen);
			}
			else{
				tmp = new byte[cutLen-1];
				System.arraycopy(data, 0, tmp, 0, cutLen-1);
			}
			return tmp;
		}
				
		return null;		
	}
	
	/**
	 * Xss  필터 적용
	 * @param obj
	 * @return returnStr
	 * @throws Exception
	 */
	public static String cleanXSS(String value) {   

		value = value.replaceAll("(?i)&lt;script[^&gt;]*&gt;(.*?)&lt;/SCRIPT&gt;","");
		
		value = value.replaceAll("(?i)<script[^>]*>(.*?)</SCRIPT>","");
		
	     value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");   

	     value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");   

	     value = value.replaceAll("'", "&#39;");             

	     value = value.replaceAll("eval\\((.*)\\)", "");   

	     value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");   

	     value = value.replaceAll("(?i)script", "");   

	     return value;   

	 } 



	
	
}