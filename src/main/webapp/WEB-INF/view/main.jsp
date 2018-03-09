<%/****************************************************************************
 JSP Name : /main.jsp
 Description : 메인페이지
 Author: pwj
 Since: 2018. 03. 00
 Modification Information
 Mod Date	    Modifier	  Description
 ----------	    --------	  ---------------------------
 2018.03.00	    pwj	              최초 생성 
*******************************************************************************/%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/common/jstl_taglib.jsp" %>
	<c:import url="/top.do"/>
	<c:import url="/left.do"/> 
		<div id="content">
			<div class="hgroup">
			<h3>메인페이지</h3>
		</div>
<style type="text/css">
table.basic_top{width:100%;border-top:1px solid #b7c8c5;margin-top:20px}table.basic_top th{background:#daf6f0;color:#666}table.basic_top th,td{text-align:center}table.basic_top th,table.basic_top td{border-bottom:1px solid #b7c8c5;border-left:1px solid #b7c8c5;padding:8px}table.basic_top th:first-child,table.basic_top td:first-child,table.basic_top .leftnone{border-left:0}table.basic_top .subtitle th{background:#c5d9d5}table.basic_top .month{background:#0aa586;color:#fff}table.basic_top th.leftline{border-left:1px solid #b7c8c5}table.basic_top .btn{font-weight:700;font-size:2em;background:#fff}table.basic_top .btn a{color:#333}table.basic_top .btn a:hover{color:#0b6b58;text-decoration:none}table.basic_top th.btn:hover{background:#f7f7f7}ul.mainbox{margin:20px 0 0;clear:both}ul.mainbox li.left{float:left;width:41%}ul.mainbox li.right{float:right;width:56%}ul.mainbox table.floatL{float:left;width:65%}ul.mainbox table.floatR{float:right;width:33%}table.basic td.subtitle{font-weight:700;background:#fafafa}
</style>		
<!-- 일정 -->
<form name="frmSchedule" id="frmSchedule" method="post" action=""> 
<input type="hidden" id="newYear" name="newYear" value="${newDate.newYear}">
<input type="hidden" id="newMonth" name="newMonth" value="${newDate.newMonth}">
<input type="hidden" id="newWeekNum" name="newWeekNum" value="${newDate.newWeekNum}">
<input type="hidden" id="lastWeekNum" name="lastWeekNum" value="${newDate.lastWeekNum}">
<input type="hidden" id="nowYear" name="nowYear" value="${newDate.nowYear}">
<input type="hidden" id="nowMonth" name="nowMonth" value="${newDate.nowMonth}">
<input type="hidden" id="nowDay" name="nowDay" value="${newDate.nowDay}">

</form>
	<table class="basic_top">
		<colgroup>
		<col width="10%" />
		<col width="10%" />
		<col width="10%" />
		<col width="10%" />
		<col width="10%" />
		<col width="10%" />
		<col width="10%" />
		<col width="10%" />
		</colgroup>
	<tr>
		<th rowspan="6" class="month">${newDate.newMonth}<br/>월<br/>일<br/>정</th>
		<th rowspan="2" class="leftnone btn"><a href="javascript:goSchedule(${newDate.newWeekNum-1})">&lt;</a></th>
		<th>일</th>
		<th>월</th>
		<th>화</th>
		<th>수</th>
		<th>목</th>
		<th>금</th>
		<th>토</th>		
		<th rowspan="2" class="btn"><a href="javascript:goSchedule(${newDate.newWeekNum+1})">&gt;</a></th>
	</tr>
	<tr>
	
		<c:forEach begin="0" end="6" varStatus="i">
		<th <c:if test="${i.index eq 0 }"> class="leftline" </c:if> 
			<c:choose>
				<c:when test ="${newDate.startWeekDay + i.index > newDate.lastDay || newDate.startWeekDay + i.index <= 0 }" ></c:when>
				<c:otherwise> onclick ="goMyPlan(${newDate.startWeekDay + i.index })" style="cursor:pointer" </c:otherwise>
			</c:choose>>
			<c:choose>
				<c:when test ="${newDate.startWeekDay + i.index > newDate.lastDay || newDate.startWeekDay + i.index <= 0 }" >
				&nbsp;
				</c:when>
				<c:otherwise> ${newDate.startWeekDay + i.index }</c:otherwise>
			</c:choose>
		</th>
		
	</c:forEach>
	</tr>
	<tr class="subtitle">
		<th colspan="3">일정</th>
		<th colspan="3">당일 업무계획</th>
		<th colspan="3">당일 수행업무</th>
	</tr>
	
	<c:forEach var="adminScheduleList" items="${adminScheduleList}" varStatus='va' > 
	
	<c:if test="${va.index == 0 }">
	<tr>
		<td colspan="3">${adminScheduleList.AS_SCHCONTENT}</td>
		<td colspan="3" rowspan="3">${mySchedule.CONTENT4}</td>
		<td colspan="3" rowspan="3">${mySchedule.CONTENT1}</td>
	</tr>
	</c:if>
	<c:if test="${va.index > 0 }">
		<tr>
			<td colspan="3">${adminScheduleList.AS_SCHCONTENT}</td>
		</tr>
	</c:if>
	
	</c:forEach>
	</table>
<!-- // 일정 -->

<!-- 질의상담 접수현황, today 학사관리 -->
<ul class="mainbox">
<li class="left">
<h5>질의상담 접수현황</h5>
	<table class="basic">
		<thead>
			<tr>
				<th>유형</th>
				<th>처리대기</th>
				<th>처리완료</th>
				<th>평점</th>
			</tr>
		</thead>
		<tbody>
		
		<c:forEach var="qnaList" items="${qnaList}">
			<tr>
				<td class="subtitle">${qnaList.BM_NAME}</td>
				<td>${qnaList.NCOMP}건</td>
				<td>${qnaList.COMP}건</td>
				<td><c:if test="${qnaList.BM_IDX > 1 }">${qnaList.AVPT}점</c:if></td>
			</tr>
		</c:forEach>
			
		</tbody>
	</table>
</li>
<li class="right">
<h5>TODAY 학사관리</h5>
	<table class="basic floatL">
		<thead>
			<tr>
				<th>과정</th>
				<th>기업수</th>
				<th>고용</th>
				<th>비고용</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="chasuList" items="${chasuList }">  
			
			<tr>
				<td class="subtitle"><c:if test="${chasuList.OB eq '1' }">개강</c:if>
				<c:if test="${chasuList.OB eq '2' }">종료</c:if>
				</td>				
					<td><strong>${chasuList.CNT }</strong>업체 </td>
				<td> <strong>${chasuList.LAY }</strong>명</td>
				<td> <strong>${chasuList.LAN }</strong>명</td>
			</tr>
			</c:forEach>
			
		</tbody>
	</table>
	
	
	<table class="basic floatR">
		<thead>
			<tr>
				<th>독려</th>
				<th>건수</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="subtitle">SMS</td>
				<td><strong>${encList.SMS}</strong>건</td>
			</tr>
			<tr>
				<td class="subtitle">E-mail</td>
				<td><strong>${encList.EMAIL}</strong>건</td>
			</tr>
			<tr>
				<td class="subtitle">전화독려</td>
				<td><strong>${encList.TEL}</strong>건</td>
			</tr>
		</tbody>
	</table>
</li>
</ul>
<!-- // 질의상담 접수현황, today 학사관리 -->

<!-- 수강인원 현황, 수강신청 개설현황  -->
<ul class="mainbox">
<li class="left">
<h5>수강인원 현황</h5>
	<table class="basic">
		<thead>
			<tr>
				<th>운영자</th>
				<th>대기</th>
				<th>진행중</th>
				<th>종료</th>
			</tr>
		</thead>
		<tbody>
		<c:forEach var="leccntList" items="${leccntList }">  
			<tr>
				<td class="subtitle">${leccntList.NAME}</td>
				<td><fmt:formatNumber value="${leccntList.LEC01}" type="number"></fmt:formatNumber>건</td>
				<td><fmt:formatNumber value="${leccntList.LEC02}" type="number"></fmt:formatNumber>건</td>
				<td><fmt:formatNumber value="${leccntList.LEC05}" type="number"></fmt:formatNumber>건</td>
			</tr>
			</c:forEach>
			
			
		</tbody>
	</table>
</li>
<li class="right">
<h5>수강신청 개설현황</h5>
	<table class="basic">
		<thead>
			<tr>
				<th>업체명</th>
				<th>운영자</th>
				<th>개강일</th>
				<th>신청기간</th>
				<th>신청인원</th>
			</tr>
		</thead>
		<tbody>
		<c:forEach var ="openlecList" items="${openlecList }">
		
			<tr>
				<td>${openlecList.ST_NAME}</td>
				<td>${openlecList.NAME}</td>
				<td>${openlecList.CS_SLECDT}</td>
				<td>${openlecList.CS_SAPLDT}~${openlecList.CS_EAPLDT}</td>
				<td>${openlecList.CNT}</td>
			</tr>
		</c:forEach>	
		</tbody>
	</table>
</li>
</ul>
<!-- // 수강인원 현황, 수강신청 개설현황  -->

<!-- 사이트 신규등록 현황, 공지사항  -->
<ul class="mainbox">
<li class="left">
<h5>사이트 신규등록 현황</h5>
	<table class="basic">
		<tbody>
			<c:forEach var ="newList" items="${newList }">
			<tr>
				<th>${newList.CNAME }</th>
				<td><fmt:formatNumber value="${newList.CNT}" type="number"></fmt:formatNumber>건</td>
			</tr>
			</c:forEach>
		</tbody>

	</table>
</li>
<li class="right">
<h5>공지사항</h5>
<form name="frmSearch" id="frmSearch" method="POST" action="/board/boardList.do">
		<input type="hidden" id="BM_IDX" name="BM_IDX" value="3" />
		<input type="hidden" id="BD_IDX" name="BD_IDX" />
		<input type="hidden" id="BM_REF" name="BM_REF" />
		<input type="hidden" id="BM_DEPTH" name="BM_DEPTH" value="0" />
		<input type="hidden" id="MB_EIDX" name="MB_EIDX" value="" />
		<input type="hidden" id="page" name="page" value="" />		
		<input type="hidden" id="CD_SYSGRP" name="CD_SYSGRP" />		
</form>
	<table class="basic">
		<colgroup>
		<col width="80%" />
		<col width="20%" />
		</colgroup>
		<tbody>
		<c:forEach var ="noticeList" items="${noticeList }">
			<tr>
				<td class="taL"><a href="javascript:void(0);" onclick="goView('${noticeList.BD_IDX}','${noticeList.BM_REF}');">ㆍ${noticeList.BD_TITLE}</td>
				<td>${noticeList.BD_REGDT}</td>
			</tr>
			
			</c:forEach>
		</tbody>
	</table>
</li>
</ul>
<!-- // 사이트 신규등록 현황, 공지사항  -->


<ul class="mainbox">
<li class="center">
	<h5>LOMS 모니터링</h5>
	<table width=100% class="basic">
	<thead>
			<tr>
				<th>회원번호</th>
				<th>이름</th>
				<th>생년월일성별</th>
				<th>기업명</th>
				<th>이메일</th>
				<th>휴대폰</th>
				<th>전화번호</th>
				<th>우편번호</th>
				<th>변경상태</th>
				<th>등록일</th>
			</tr>
		</thead>
	<tbody>
		<c:forEach var ="lomsuser" items="${lomsuser}">	
	<tr>
	<c:set var="name" value="${lomsuser.USER_NAME}" />	
		<td>${lomsuser.USER_AGENT_PK}</td>
		<td>
			<c:if test="${fn:length(name) < 3}">
				${fn:substring(name,0,1)}*${fn:substring(name,2,3)}
			</c:if>
			<c:if test="${fn:length(name) eq 3}">
				${fn:substring(name,0,1)}*${fn:substring(name,2,3)}
			</c:if>
			<c:if test="${fn:length(name) eq 4}">
				${fn:substring(name,0,1)}**${fn:substring(name,3,4)}
			</c:if>
			<c:if test="${fn:length(name) > 4}">
				<c:set var="namelen" value="${fn:length(name)}" />							
				${fn:substring(name,0,2)}<c:forEach begin="1" end="${namelen-4}">*</c:forEach>${fn:substring(name,namelen-2 ,namelen)}
			</c:if>
		</td>
		<td>${lomsuser.RES_NO}</td>
		<td>${lomsuser.ENC_RES_NO}</td>
		<td>
			<c:if test="${lomsuser.EMAIL ne null && lomsuser.EMAIL ne '' && lomsuser.EMAIL ne '미입력'}">										
				<c:set var="email" value="${lomsuser.EMAIL}"/>
				${fn:substring(email,0,2)}**@${fn:substringAfter(email, "@")}
			</c:if>
		</td>
		<td>${fn:substring(lomsuser.MOBILE,8,4)}</td>
		<td>${fn:substring(lomsuser.TEL,8,4)}</td>
		<td>${lomsuser.POST}</td>
		<td>${lomsuser.CHANGE_STATE}</td>
		<td>${lomsuser.REG_DATE}</td>
	</tr>
	</c:forEach>
	</tbody>
	</table>
	</ul>		
	</li>

</div>

<script>

<c:if test="${req.msgCnt > 0}">
	alert("쪽지가 도착했습니다.");
</c:if>
function goView(idx,ref,sysgrp){
	$("#BD_IDX").val(idx);
	$("#BM_REF").val(ref);
	$("#CD_SYSGRP").val(sysgrp);
	$("#frmSearch").attr('action','/board/boardView.do').submit();	
}

function goSchedule(weekday){
	$("#newWeekNum").val(weekday);
	$("#frmSchedule").attr('action','/main.do').submit();	
}
function goMyPlan(day){
	var dday = day;
	if( dday.length == 1) dday = "0"+dday; 
	$("#nowDay").val(dday);
	$("#frmSchedule").attr('action','/main.do').submit();	
}
</script>