<%/****************************************************************************
 JSP Name : /login.jsp
 Description : login form
 Author: pwj
 Since: 2018. 03. 00
 Modification Information
 Mod Date	    Modifier	  Description
 ----------	    --------	  ---------------------------
 2018.03.00	    pwj	              최초 생성 
*******************************************************************************/%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/common/jstl_taglib.jsp" %>
<div class="loginWrap">
	<h1>LOGO</h1> 
	<h2>GroupWare Login</h2>
	<form name="frmInsert"  method="POST" action="loginOk.do">
		<div class="login">
			<p>
				<label for="">아이디1</label>
				<input type="text" name="LOGINID" id="LOGINID" value="" required  maxlength="30"/><!-- !!주의!! 아이디 패스워드 입력해서 SVN 및 개발서버 업로드 금지 -->
			</p>
			<p>
				<label for="">비밀번호</label>
				<input type="password" name="LOGINPWD" id="LOGINPWD" value="" required  maxlength="30"/><!-- !!주의!! 아이디 패스워드 입력해서 SVN 및 개발서버 업로드 금지 -->
			</p>
			<input type="submit" value="LOGIN" class="btBasic login">
		</div>
	</form>
	
	<p class="attention">※ 본 사이트는 관리자 외에는 접근을 금지합니다. </p>
	<ul class="dotList">
		<li>사내 인트라넷 시스템(GroupWare)에서 발급받으신 아이디와 비밀번호를<br> 입력 후 로그인하여 주십시오.</li>
		<li>아이디와 비밀번호가 유출되지 않도록 각별히 주의하여 주시기 바라며,<br> 비밀번호는 수시로 변경하여 비밀번호가 유출되는 것을 방지하여 주십시오. </li>
		<li>사용 중 오류가 발생할 경우 시스템 담당자에게 문의하여 주십시오.</li>
	</ul>
	<p class="attentionBox">
		시스템 담당자 :  정보기술팀  조성우 차장  ☎ 02-070-4304-1301
	</p>
</div>
<div id="footer">
	<p class="copyright">
		Copyright (C) 2003~2013 epasskorea. All Rights Reserved. 
	</p>
</div>	

<!-- 본인인증 서비스 팝업을 호출하기 위해서는 다음과 같은 form이 필요합니다. -->
<form name="form_chk" method="post">
	<input type="hidden" name="m" value="checkplusSerivce">					<!-- 필수 데이타로, 누락하시면 안됩니다. -->
	<input type="hidden" name="EncodeData" value="${sEncData}">			<!-- 위에서 업체정보를 암호화 한 데이타입니다. -->
    
    <!-- 업체에서 응답받기 원하는 데이타를 설정하기 위해 사용할 수 있으며, 인증결과 응답시 해당 값을 그대로 송신합니다.
    	 해당 파라미터는 추가하실 수 없습니다. -->
	<input type="hidden" name="param_r1" value="${req.third_yn}">
	<input type="hidden" name="param_r2" value="">
	<input type="hidden" name="param_r3" value="/loginOk.do?RESULTSTR=S">    
</form>

<!-- 가상주민번호 서비스 팝업 페이지에서 사용자가 인증을 받으면 암호화된 사용자 정보는 해당 팝업창으로 받게됩니다.
	 따라서 부모 페이지로 이동하기 위해서는 다음과 같은 form이 필요합니다. -->
<form name="vnoform" method="post">
	<input type="hidden" name="enc_data">								<!-- 인증받은 사용자 정보 암호화 데이타입니다. -->
	
	<!-- 업체에서 응답받기 원하는 데이타를 설정하기 위해 사용할 수 있으며, 인증결과 응답시 해당 값을 그대로 송신합니다.
    	 해당 파라미터는 추가하실 수 없습니다. -->
    <input type="hidden" name="param_r1" value="${req.third_yn}">
    <input type="hidden" name="param_r2" value="">
    <input type="hidden" name="param_r3" value="">
    
    
    <input type="hidden" name="loginId" value="${loginId}">
    <input type="hidden" name="loginPwd" value="${loginPwd}">
    
</form>

<%-- <%@ include file="/WEB-INF/view/common/popup_footer.jsp"%>	 --%>

<script type="text/javascript">
window.name ="epkAdmin";

	$(document).ready(function(){
		/**
		* LOGIN 버튼 클릭
		*/
		$("#btnLogin").click(function(){
			$("#frmInsert").validate();
		});
		
		if ("${checkplusYN }" == "Y") {
			popup_checkplus();
		}
		
	});
	
	//본인인증 POPUP 호출
	function popup_checkplus(){
		window.open('', 'popupChk', 'width=500, height=461, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_chk.action = "https://check.namecheck.co.kr/checkplus_new_model4/checkplus.cb";
		document.form_chk.target = "popupChk";
		document.form_chk.submit();
	}

</script>
