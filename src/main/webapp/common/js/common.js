
(function($){
	/**
	 * popup open 
	 * ex) $("#id").openPopupWindow("test.do","test","100,"100","no","no","no","yes");
	 */
	$.fn.openPopupWindow = function(url,popid,width,height,status,menubar,toolbar,scrollbar) {		
		$(this).click(function(){
			window.open(url, popid, "width="+width+", height="+height+", status="+status+", menubar="+menubar+", toolbar="+toolbar+", scrollbars="+scrollbar+", location=no,resizable=yes");
		});
	};
	
	/**
	*체크박스 전체선택/해제
	*/
	$.fn.checkAll = function(chk_id,totNum){
		$(this).click(function(){
			$('input:checkbox[id^='+chk_id+'_]').not(this).prop('checked', this.checked);	 
			checkBoxCount(chk_id,totNum);
		}); 
	};
	
	/**
	* 검색 버튼 클릭
	*/		
	$.fn.search = function(frm,action,method){
		$(this).click(function(){
			$(frm).attr("action",action).attr("method",method).submit();	
		}); 
	};	
	
	/**
	* 검색초기화 버튼 클릭
	*/
	$.fn.reset = function(frm){
		$(this).click(function(){
			 $(frm).reset();  
		});
	};

	/**
	멀티 체크박스 삭제,상태변경 등 일괄처리 공통
	param : 체크박스아이디, 폼객체, 선택항목처리URL, 모든항목처리URL, 검색폼action, 현재페이지번호
	caution : 선택항목,전체항목을 선택하는 selectBox의 id=applyTarget이어야 한다.
	caution : 처리후 페이지의 reload는 검색조건을 다시 submit하는 것으로 처리한다. 이때 page정보가 유지되어야 하므로 검색폼에 페이지정보를 담을수 있는 hidden type의 input 엘리먼트 id를 'currentPage'로 하여야 한다.
	*/
	$.fn.batchExec = function(chk_id,frm,choiceUrl,allUrl,action,currentPage){
		$(this).click(function(){
			if(confirm('정말로 진행하시겠습니까?')){
				if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
					if($("input:checkbox[id^="+chk_id+"_]:checked").length > 0) {	//체크항목이 1개 이상일 경우만 동작
						$.ajax({
							type: "POST",
							dataType:"json",
							url: choiceUrl,   
							data: $(frm).serialize(),
							success: function(data, textStatus, jqXHR){
								if (data.result == "success") {
									alert("처리되었습니다.");
									$("#currentPage").val(currentPage);	//처리후 페이지 유지할 경우. 첫페이지로 이동시는 주석 처리할 것
									$(frm).attr("action",action).submit();	//처리후 리로드 효과
								} else {
									alert(data.result);
								}				
							},
							error: function(e){
								Error(e.status);
								alert("error code : " + e.status);
							}
						});
					} else{
						alert("하나 이상 체크하여야 합니다.");
					}					
				} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
					var conf = confirm('현재 검색조건을 만족하는 모든 데이타에 적용됩니다.(검색후 검색조건을 변경하면 변경된 검색조건으로 적용됨 유의)\n진행하시겠습니까?');
					if(conf){			
						$.ajax({
							type: "POST",
							dataType:"json",
							url: allUrl,   
							data: $(frm).serialize(),
							success: function(data, textStatus, jqXHR){
								if (data.result == "success") {
									alert("처리되었습니다.");
									$("#currentPage").val(currentPage);	//처리후 페이지 유지할 경우. 첫페이지로 이동시는 주석 처리할 것. 
									$(frm).attr("action",action).submit();	//처리후 리로드 효과
								} else {
									alert(data.result);
								}				
							},
							error: function(e){
								Error(e.status);
								alert("error code : " + e.status);
							}
						});	
					}else{
						return false;
					}
				}
			}
			
		});			
	};
	
	/**
	멀티 체크박스 엑셀다운로드 클릭
	param : 체크박스아이디, 폼객체, 선택항목처리URL, 모든항목처리URL
	caution : 선택항목,전체항목을 선택하는 selectBox의 id=applyTarget이어야 한다.
	*/
	$.fn.batchExcelDown = function(chk_id,frm,choiceUrl,allUrl){
		$(this).click(function(){
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if($("input:checkbox[id^="+chk_id+"_]:checked").length > 0) {	//체크항목이 1개 이상일 경우만 동작
					$(frm).attr({action:choiceUrl, target:'_self'}).submit();
				} else{
					alert("하나 이상 체크하여야 합니다.");
				}					
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				var conf = confirm('현재 검색조건을 만족하는 모든 데이타에 적용됩니다.(검색후 검색조건을 변경하면 변경된 검색조건으로 적용됨 유의)\n진행하시겠습니까?');
				if(conf){
					$(frm).attr({action:allUrl, target:'_self'}).submit();
				}else{
					return false;
				}	
			}		
		});			
	};		
	
	/**
	멀티 체크박스 SMS발송 클릭
	param : 체크박스아이디,폼객체, SMS발송팝업페이지URL ,가로창사이즈, 세로창사이즈
	caution : 선택항목,전체항목을 선택하는 selectBox의 id=applyTarget이어야 한다.
	*/
	$.fn.batchSms = function(chk_id,frm,action,width,height){
		$(this).click(function(){			
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if($("input:checkbox[id^="+chk_id+"_]:checked").length > 0) {	//체크항목이 1개 이상일 경우만 동작				
					
					openPopupWindow("","smsForm",width,height,"no","no","no","no");					
					$(frm).attr("target","smsForm");
					$(frm).attr("method","post");
					$(frm).attr("action",action);
					$(frm).submit();					
					
				} else{
					alert("하나 이상 체크하여야 합니다.");
				}					
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				openPopupWindow("","smsForm",width,height,"no","no","no","no");					
				$(frm).attr("target","smsForm");
				$(frm).attr("method","post");
				$(frm).attr("action",action);
				$(frm).submit();
			};		
		});			
	};		
	
	/**
	멀티 체크박스 EMAIL발송 클릭
	param : 체크박스아이디,폼객체, EMAIL발송팝업페이지URL ,가로창사이즈, 세로창사이즈
	caution : 선택항목,전체항목을 선택하는 selectBox의 id=applyTarget이어야 한다.
	*/
	$.fn.batchEmail = function(chk_id,frm,action,width,height){
		$(this).click(function(){			
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if($("input:checkbox[id^="+chk_id+"_]:checked").length > 0) {	//체크항목이 1개 이상일 경우만 동작						
						 
					openPopupWindow("","emailForm",width,height,"no","no","no","no");				                
					$(frm).attr("target","emailForm");
					$(frm).attr("method","post");
					$(frm).attr("action",action);
					$(frm).submit();
				
				} else{
					alert("하나 이상 체크하여야 합니다.");
				};					
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				openPopupWindow("","emailForm",width,height,"no","no","no","no");				                
				$(frm).attr("target","emailForm");
				$(frm).attr("method","post");
				$(frm).attr("action",action);
				$(frm).submit();
			};		
		});			
	};	
	
	
	
	/**
	멀티 체크박스 독려발송 클릭
	param : 체크박스아이디,폼객체, 독려발송팝업페이지URL ,가로창사이즈, 세로창사이즈
	caution : 선택항목,전체항목을 선택하는 selectBox의 id=applyTarget이어야 한다.
	*/
	$.fn.batchEncourage = function(chk_id,frm,action,width,height){
		$(this).click(function(){			
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if($("input:checkbox[id^="+chk_id+"_]:checked").length > 0) {	//체크항목이 1개 이상일 경우만 동작						
						 
					openPopupWindow("","encourageForm",width,height,"no","no","no","no");				                
					$(frm).attr("target","encourageForm");
					$(frm).attr("method","post");
					$(frm).attr("action",action);
					$(frm).submit();
				
				} else{
					alert("하나 이상 체크하여야 합니다.");
				};					
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				openPopupWindow("","encourageForm",width,height,"no","no","no","no");				                
				$(frm).attr("target","encourageForm");
				$(frm).attr("method","post");
				$(frm).attr("action",action);
				$(frm).submit();
			};		
		});			
	};	
	
	/**
	클릭버튼 우측에 선택레이어 띄우기
	param : 레이어객체
	*/
	$.fn.batchPopLayer = function(popLayer){
		$(this).click(function(){
			$(popLayer).css("top",$(this).position().top-10).css("left",$(this).position().left+$(this).outerWidth()+10).show();	
		});			
	};	
	
	/**
	체크박스 일괄처리시 값을 추가로 선택해야 하는 경우 선택레이어 닫기
	param : 레이어객체
	*/
	$.fn.batchCloseLayer = function(popLayer){
		$(this).click(function(){
			$(popLayer).hide();
		});			
	};		
	
	/**
	테이블 rowspan
	param : col index
	*/	
	$.fn.rowspan = function(colIdx) {	
	   return this.each(function(){	 
	     var that = null;
	     $('tr', this).each(function(row) {
	      $('td:eq('+colIdx+')', this).each(function(col) {
	          if ($(this).html() == $(that).html()) {
	            rowspan = $(that).attr("rowSpan");
	            if (rowspan == undefined) {	       
	              $(that).attr("rowSpan",1);
	              rowspan = $(that).attr("rowSpan");
	            }
	            rowspan = Number(rowspan)+1;
	            $(that).attr("rowSpan",rowspan); // do your action for the colspan cell here
	            $(this).hide(); // .remove(); // do your action for the old cell here
	          } else {
	            that = this;
	          }
	          that = (that == null) ? this : that; // set the that if not already set
	      });
	     });	 
	   });
	};
	
	
	/**
	팝업창으로 submit 하기
	param : 체크박스아이디, 폼객체, 팝업URL, 팝업ID, 폭,높이,폭조절여부,메뉴바여부,툴바여부,스크롤바여부 yes or no
	caution : 선택항목,전체항목을 선택하는 selectBox의 id=applyTarget이어야 한다.
	caution : 검색 submit() 시에 target 과 action 을 다시 셋팅해 주어야함
	*/
	$.fn.popsubmit = function(chk_id,frm, url,popid,top, left, width,height,resizable,menubar,toolbar,scrollbar) {
		$(this).click(function(){
			
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if($("input:checkbox[id^="+chk_id+"_]:checked").length > 0) {	//체크항목이 1개 이상일 경우만 동작
					var status = "top="+top+", left="+left+", width="+width+",height="+height+",toolbar="+toolbar+",location=no,directories=no";
						status +=",menubar="+menubar+",scrollbars="+scrollbar+",resizable="+resizable; 
					window.open("", popid,status);				                
					$(frm).attr("target",popid);
					$(frm).attr("method","post");
					$(frm).attr("action",url);
					$(frm).submit();			
				
				} else{
					alert("하나 이상 체크하여야 합니다.");
				}					
			} 	
		});
	};
	/**
	팝업창으로 submit 하기 체크가 없는경우
	param : 폼객체, 팝업URL, 팝업ID, 폭,높이,폭조절여부,메뉴바여부,툴바여부,스크롤바여부 yes or no
	caution : 선택항목,전체항목을 선택하는 selectBox의 id=applyTarget이어야 한다.
	caution : 검색 submit() 시에 target 과 action 을 다시 셋팅해 주어야함
	*/
	$.fn.popsubmit_nochk = function(frm, url,popid,top,left,width,height,resizable,menubar,toolbar,scrollbar) {
		$(this).click(function(){
			var status = "width="+width+",height="+height+",top="+top+", left="+left+", toolbar="+toolbar+",location=no,directories=no";
					status +=",menubar="+menubar+",scrollbars="+scrollbar+",resizable="+resizable; 
			window.open("", popid,status);				                
			$(frm).attr("target",popid);
			$(frm).attr("method","post");
			$(frm).attr("action",url);
			$(frm).submit();			
		});
	};
		
	
	/**
	 * 이름   : $("#aaa").sendUserSMS("formId", "objId");
	 * objName : 회원 일련번호(MB_IDX)를 담고 있는 checkbox object ID , frmName : objName이 포함된 폼 ID
	 */
	$.fn.sendUserSMS = function(frmId, objId) {		
		$(this).click(function() {
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				
				if ($("input[id="+ objId +"]:checked").length == 0) {
					alert('SMS를 전송할 대상을 선택하여 주십시오.');
				}else {				
					$("#" + frmId).one("submit", function(){
						window.open("", "sendSmsForm", "width=520, height=670, top=200, left=200, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no");
						this.method = "post";
						this.action = "/sms/sendSMSForm.do?obj=" + objId;
						this.target = "sendSmsForm";
					}).trigger("submit");
				}
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				alert('대량 SMS 발송은 불가합니다. \n개별 선택 후 사용하여 주십시오.');
			}
		});
	};
	
	$.fn.sendEncUserSMS = function(frmId, objId) {		
		$(this).click(function() {
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if ($("input[id="+ objId +"]:checked").length == 0) {
					alert('SMS를 전송할 대상을 선택하여 주십시오.');
				}else {				
					$("#" + frmId).one("submit", function(){
						window.open("", "sendSmsForm", "width=820, height=750, top=200, left=200, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no");
						this.method = "post";
						this.action = "/sms/sendEncSMSForm.do?obj=" + objId;
						this.target = "sendSmsForm";
					}).trigger("submit");
				}
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				alert('대량 SMS 발송은 불가합니다. \n개별 선택 후 사용하여 주십시오.');
			}
		});
	};
	
	/**
	 * 이름   : $("#aaa").sendUserSMS("formId", "objId","logYN");
	 * objName : 회원 일련번호(MB_IDX)를 담고 있는 checkbox object ID , frmName : objName이 포함된 폼 ID
	 */
	$.fn.sendTutorUserSMS = function(frmId, objId, logYN) {
		var logyn = 'N'; //로그를 남길지 안남길지 
		$(this).click(function() {
			if ($("input[id="+ objId +"]:checked").length == 0) {
				alert('SMS를 전송할 대상을 선택하여 주십시오.');
			}else {
				
				if(logYN!=null){
					logyn = logYN;
				}
				$("#" + frmId).one("submit", function(){
					window.open("", "sendSmsForm", "width=520, height=670, top=200, left=200, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no");
					this.method = "post";
					this.action = "/sms/sendTutorSMSForm.do?obj=" + objId+"&logyn="+logyn;
					this.target = "sendSmsForm";
				}).trigger("submit");
			}
		});
	};
	
	
	
	/**
	 * 이름   : $("#aaa").sendUserEMAIL("formId", "objId");
	 * objName : 회원 일련번호(MB_IDX)를 담고 있는 checkbox object ID , frmName : objName이 포함된 폼 ID
	 */
	$.fn.sendUserEMAIL = function(frmId, objId) {
		$(this).click(function() {
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if ($("input[id="+ objId +"]:checked").length == 0) {
					alert('EMAIL 전송할 대상을 선택하여 주십시오.');
				}else {
					
					$("#" + frmId).one("submit", function(){
						window.open("", "sendEmailForm", "width=520, height=670, top=200, left=200, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no");
						this.method = "post";
						this.action = "/email/sendEMAILForm.do?obj=" + objId;
						this.target = "sendEmailForm";
					}).trigger("submit");
				}
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				alert('대량 Email 발송은 불가합니다. \n개별 선택 후 사용하여 주십시오.');
			}
		});
	};
	
	
	/**
	 * 이름   : $("#aaa").sendUserEMAIL("formId", "objId");
	 * objName : 회원 일련번호(MB_IDX)를 담고 있는 checkbox object ID , frmName : objName이 포함된 폼 ID
	 */
	$.fn.sendEncUserEMAIL = function(frmId, objId) {
		$(this).click(function() {
			if ($("#applyTarget option:selected").val() == "chk") {	//선택항목만 처리일 경우
				if ($("input[id="+ objId +"]:checked").length == 0) {
					alert('EMAIL 전송할 대상을 선택하여 주십시오.');
				}else {
					
					$("#" + frmId).one("submit", function(){
						window.open("", "sendEncEmailForm", "width=820, height=750, top=200, left=200, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no");
						this.method = "post";
						this.action = "/email/sendEncEMAILForm.do?obj=" + objId;
						this.target = "sendEncEmailForm";
					}).trigger("submit");
				}
			} else if ($("#applyTarget option:selected").val() == "all") { //모든검색결과 처리일 경우
				alert('대량 Email 발송은 불가합니다. \n개별 선택 후 사용하여 주십시오.');
			}
		});
	};
	
	
	/**
	 * 이름   : $("#aaa").sendUserEMAIL("formId", "objId");
	 * objName : 회원 일련번호(MB_IDX)를 담고 있는 checkbox object ID , frmName : objName이 포함된 폼 ID
	 */
	$.fn.sendEncUserTEL = function(frmId, objId) {
		$(this).click(function() {
			if ($("input[id="+ objId +"]:checked").length == 0) {
				alert('입력할 대상을 선택하여 주십시오.');
			}else {
				
				$("#" + frmId).one("submit", function(){
					window.open("", "sendEncTelForm", "width=820, height=750, top=200, left=200, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no");
					this.method = "post";
					this.action = "/encourage/encourageSendTel.do?obj=" + objId;
					this.target = "sendEncTelForm";
				}).trigger("submit");
			}
		});
	};
	
	/**
	 * 이름   : $("#aaa").sendUserEMAIL("formId", "objId");
	 * objName : 회원 일련번호(MB_IDX)를 담고 있는 checkbox object ID , frmName : objName이 포함된 폼 ID
	 */
	$.fn.sendTutorUserEMAIL = function(frmId, objId,logYN) {
		var logyn = 'N'; //로그를 남길지 안남길지 
		$(this).click(function() {
			if ($("input[id="+ objId +"]:checked").length == 0) {
				alert('EMAIL 전송할 대상을 선택하여 주십시오.');
			}else {
				if(logYN!=null){
					logyn = logYN;
				}
				$("#" + frmId).one("submit", function(){
					window.open("", "sendEmailForm", "width=520, height=670, top=200, left=200, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no");
					this.method = "post";
					this.action = "/email/sendTutorEMAILForm.do?obj=" + objId+"&logyn="+logyn;
					this.target = "sendEmailForm";
				}).trigger("submit");
			}
		});
	};
	
	
	
	
	
})(jQuery);


/**
* 체크박스 체크갯수
*/	
function checkBoxCount(chk_id,totNum){
	$("#applyTarget option:eq(0)").text("선택항목만 [" + $("input:checkbox[id^="+chk_id+"_]:checked").length + "/"+totNum+"]");	
}	


/**
*클립보드에 저장
*/
function setClipBoard(txt){
    if ((navigator.appName).indexOf("Microsoft")!= -1) {
         if(window.clipboardData){
              var ret = null;
              ret = clipboardData.clearData();
              if(ret){
                   window.clipboardData.setData('Text', txt);
                   alert('클립보드에 코드가 복사되었습니다.');
              }else{
                   alert("클립보드 액세스 허용을 해주세요.");
              }
         }
    }
    else {
    	window.prompt('IE외 브라우져는 Ctrl+C를 이용하여 문자열을 카피합니다.', txt);
    }
}


/**
 * popup open - non jquery 상태에서 호출시 사용.
 */
function openPopupWindow(url,popid,width,height,status,menubar,toolbar,scrollbar) {
	window.open(url, popid, "width="+width+", height="+height+", status="+status+", menubar="+menubar+", toolbar="+toolbar+", scrollbars="+scrollbar+", location=no,resizable=yes");	
}


/**
 * 등록폼을 수정폼으로 바꾸기(수정폼 자동으로 채우기). DB 테이블의 필드명과 input element NAME이 일치할 때 사용하면 편함.
 */
function setValueInputElement(objIdStr, objValStr) {	
	if(typeof document.getElementsByName(objIdStr)[0] == "undefined") return false;	//select한 필드명과 일치하는 NAME의 엘리먼트가 없으면 리턴	
	if(document.getElementsByName(objIdStr)[0].type == "text")	//텍스트박스일때
		$("input:text[name="+objIdStr+"]").val(objValStr);
	else if(document.getElementsByName(objIdStr)[0].type == "hidden" )	//히든타입일때
		$("input:hidden[name="+objIdStr+"]").val(objValStr);
	else if(document.getElementsByName(objIdStr)[0].type == "radio" )		//라디오버튼일때
		$("input:radio[name="+objIdStr+"]:input[value='"+objValStr+"']").attr("checked", true);
	else if(document.getElementsByName(objIdStr)[0].type == "checkbox" ){	//체크박스일때 (Y/N의 value만 적용됨)
		if(objValStr == 'Y')
			$("input:checkbox[name="+objIdStr+"]").prop("checked", true);
		if(objValStr == 'N')
			$("input:checkbox[name="+objIdStr+"]").prop("checked", false);
	}
	else if(document.getElementsByName(objIdStr)[0].tagName == "SELECT" )	//select박스일때
		$("#"+objIdStr).val(objValStr).attr("selected", "selected");
}

/**
 * 등록폼을 뷰폼으로 바꾸기.input element를 텍스트value로 변경. DB 테이블의 필드명과input element NAME이 일치할 때 사용하면 편함.
 */
function replaceInputElementToValue(objIdStr, objValStr) {
	if(typeof document.getElementsByName(objIdStr)[0] == "undefined") return false;	//select한 필드명과 일치하는 NAME의 엘리먼트가 없으면 리턴	
	if(document.getElementsByName(objIdStr)[0].type == "text")	//텍스트박스일때
	{
		$("input:text[name="+objIdStr+"]").val(objValStr);
		$("input:text[name="+objIdStr+"]").css("border","0px");	//텍스트박스 테두리 없애서 일반 텍스트처럼 보이기
	}			
	else if(document.getElementsByName(objIdStr)[0].type == "hidden" )	//히든타입일때
		$("input:hidden[name="+objIdStr+"]").val(objValStr);
	else if(document.getElementsByName(objIdStr)[0].type == "radio" )		//라디오버튼일때
		$("input:radio[name="+objIdStr+"]:input[value='"+objValStr+"']").attr("checked", true);
	else if(document.getElementsByName(objIdStr)[0].type == "checkbox" ){	//체크박스일때 (Y/N의 value만 적용됨)
		if(objValStr == 'Y')
			$("input:checkbox[name="+objIdStr+"]").prop("checked", true);
		if(objValStr == 'N')
			$("input:checkbox[name="+objIdStr+"]").prop("checked", false);
	}
	else if(document.getElementsByName(objIdStr)[0].tagName == "SELECT" )	//select박스일때
		$("#"+objIdStr).val(objValStr).attr("selected", "selected");		
}


/* ----------------------------------------------------------------------------
 * 특정 날짜에 대해 지정한 값만큼 가감(+-)한 날짜를 반환 
 * js library 파일이 있으면 추가하세용
 *  
 * 입력 파라미터 -----
 * pInterval : "yyyy" 는 연도 가감, "m" 은 월 가감, "d" 는 일 가감
 * pAddVal  : 가감 하고자 하는 값 (정수형)
 * pYyyymmdd : 가감의 기준이 되는 날짜
 * pDelimiter : pYyyymmdd 값에 사용된 구분자를 설정 (없으면 "" 입력)
 * 반환값 ----
 * yyyymmdd 또는 함수 입력시 지정된 구분자를 가지는 yyyy?mm?dd 값
 * 사용예 ---
 * 2008-01-01 에 3 일 더하기 ==> addDate("d", 3, "2008-08-01", "-");
 * 20080301 에 8 개월 더하기 ==> addDate("m", 8, "20080301", "");
 --------------------------------------------------------------------------- */
function addDate(pInterval, pAddVal, pYyyymmdd, pDelimiter)
{
 var yyyy;
 var mm;
 var dd;
 var cDate;
 var oDate;
 var cYear, cMonth, cDay;
 
 if (pDelimiter != "") {
  pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
 }
  
 yyyy = pYyyymmdd.substr(0, 4);
 mm  = pYyyymmdd.substr(4, 2);
 dd  = pYyyymmdd.substr(6, 2);
 
 if (pInterval == "yyyy") {
  yyyy = (yyyy * 1) + (pAddVal * 1); 
 } else if (pInterval == "m") {
  mm  = (mm * 1) + (pAddVal * 1);
 } else if (pInterval == "d") {
  dd  = (dd * 1) + (pAddVal * 1);
 }
  
 cDate = new Date(yyyy, mm - 1, dd); // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
 cYear = cDate.getFullYear();
 cMonth = cDate.getMonth() + 1;
 cDay = cDate.getDate();
 
 cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
 cDay = cDay < 10 ? "0" + cDay : cDay;
  
 if (pDelimiter != "") {
  return cYear + pDelimiter + cMonth + pDelimiter + cDay;
 } else {
  return cYear + cMonth + cDay;
 }
 
}

//오늘날짜 가져오기 yyyy-mm-dd
function todayDate() {
    var now = new Date();  // 오늘 날짜 충력
    var year = now.getFullYear();  // 년도만 가져오기
    var month = now.getMonth()+1;  // 월만 가져오기
    var date = now.getDate();  // 일만 가져오기 
    // 날짝 출력 형식 'yy-mm-dd'
    var _date = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + date).slice(-2); 
    return _date;  // return 
}

//현재일시 가져오기 yyyy-mm-dd hh:mm:ss 로 가져오기
function js_yyyy_mm_dd_hh_mm_ss() {
	  now = new Date();
	  year = "" + now.getFullYear();
	  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
	  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
	  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
	  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	}

/**
 * inputbox 숫자만 입력될수 있도록 반환한다. 
 * input box에 이벤트를 걸어준다. 형식ex) numberonly="true"
 * 한글,영문 입력 시 자동 지움 효과
 */
$(function(){
	$(document).on("keyup", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});
	$(document).on("keyup", "input:text[datetimeOnly]", function() {$(this).val( $(this).val().replace(/[^0-9:\-]/gi,"") );});
});

/**
 * selectbox change 시 전체 체크 및 전체 해제 하기
 * selectBox의 id=applyTarget이어야 한다.
 * selectName : select : id 
 * inputName : table > td >  input : checkbox > name
 * chkAllname : table > th > input : checkbox > id
 */
$.fn.selectCheckAll = function(selectId, inputName,  chkAllId){
	var checktemp ="";
	$(selectId).change(function(){
		checktemp =  $('#applyTarget option:selected').val();
		if(checktemp === "all"){
			$('input[name='+inputName+']:checkbox').prop('checked', true);
			$(chkAllId).prop('checked', true);
			$('input[name='+inputName+']:checkbox').attr('disabled',true); 
			$(chkAllId).attr('disabled',true); 
		}else{
			$('input[name='+inputName+']:checkbox').prop('checked', false);
			$(chkAllId).prop('checked', false);
			$('input[name='+inputName+']:checkbox').attr('disabled',false); 
			$(chkAllId).attr('disabled',false);
		}
	});
};


/**
 * 검색버튼 Enter key로 발생 시키는 함수
 * 검색 input box에 이벤트를 걸어준다. 형식ex) onKeyPress="keyEvent(event);" 
 */
function keyEvent(e){
	if(e.keyCode == 13){
		$("#btnSearch").click();
	}else{
		e.keyCode == 0;
	}
};


/**
 * 검색조건 시스템 선택[대] 분류에 따른 기업사이트[중] 값 가져오기
 * selectbox change 시 [중분류]  값 가져오기
 * selectPntId : change 대상 selectboxId 
 * selectChId  : selectboxId 값에 따른 변경 대상 Id
 */
$.fn.selectChange = function(selectPntId, selectChId){
    $(selectPntId).change(function(){
        $.ajax({ 
            url: "/board/adminAuthCompanyList.do",
            type: "POST", 
            data: {"CD_SYSGRP": $(this).val()}, 
            dataType: "html", 
            success:function(data){
            	$(selectChId).html(data); 
            },
    		error: function(e){
    			Error(e.status);
    			alert("error code : " + e.status);
    		} 
        }); 
    });
};

/**
 * 검색조건 기업사이트[중] 값 초기화 하기
 * 초기화 이벤트 발생 시 초기값 설정
 */
$.fn.selectInit = function(selectPntId, selectChId){
    $.ajax({ 
        url: "/board/adminAuthCompanyList.do",
        type: "POST", 
        data: {"CD_SYSGRP": $(this).val()}, 
        dataType: "html", 
        success:function(data){
        	$(selectChId).html(data); 
        },
		error: function(e){
			Error(e.status);
			alert("error code : " + e.status);
		} 
    }); 
};

/**
 * 검색조건 기업 검색[대] 분류에 따른 기업사이트[중] 값 가져오기
 * selectbox change 시 [중분류]  값 가져오기
 * selectPntId : change 대상 selectboxId 
 * selectChId  : selectboxId 값에 따른 변경 대상 Id
 * adIdx : 사용자 고유 권한 번호
 */
$.fn.selectCompay = function(selectPntId, selectChId, adIdx){
	$(selectPntId).change(function(){
	    $.ajax({ 
	        url: "/member/memberSelectComsite.do", 
	        type: "POST", 
	        data: {"CM_IDX": $(this).val(), "ADMINIDX": adIdx},
	        dataType: "html", 
	        success:function(data){ 
	            $(selectChId).html(data); 
	        },
			error: function(e){
				Error(e.status);
				alert("error code : " + e.status);
			} 
	    });
	 }); 
};

/**
 * 검색조건 기업사이트[중] 값 초기화 하기
 * 초기화 이벤트 발생 시 초기값 설정
 */
$.fn.selectComSiteInit = function(selectPntId, selectChId, adIdx){
    $.ajax({ 
    	url: "/member/memberSelectComsite.do",
        type: "POST", 
        data: {"CM_IDX": $(this).val(), "ADMINIDX": adIdx},
        dataType: "html", 
        success:function(data){
        	$(selectChId).html(data); 
        },
		error: function(e){
			Error(e.status);
			alert("error code : " + e.status);
		} 
    }); 
};

function is_number(v) {
    var reg = /^(\s|\d)+$/;
    return reg.test(v);
}


/*******************************************************************
설명 : 텍스트박스나 텍스트에어리어에 입력되었나 체크하는 함수
파라메터
        obj : 텍스트박스 Name
        msg : 오류 메시지
반환값 : 입력 되지 않으면 false 반환
*******************************************************************/
function isNull(obj, msg){

    if(trim(obj.value) == "")
    {
        alert(msg + " 입력하십시오.");
        obj.focus();
        return true;
    }
    return false;

}

/*******************************************************************
설명 : 왼쪽 Trim 함수
파라메터
        str : 문자열
반환값 : 없음
*******************************************************************/
function ltrim(str) {
    var s = new String(str);

    if (s.substr(0,1) == " ")
            return ltrim(s.substr(1));
    else
            return s;
}
/*******************************************************************
설명 : 오른쪽 Trim 함수
파라메터
        str : 문자열
반환값 : 없음
*******************************************************************/
function rtrim(str) {
    var s = new String(str);
    if(s.substr(s.length-1,1) == " ")
            return rtrim(s.substring(0, s.length-1))
    else
            return s;
}
/*******************************************************************
설명 : 양쪽 Trim 함수
파라메터
        str : 문자열
반환값 : 없음
*******************************************************************/
function trim(str) {
    return ltrim(rtrim(str));
}

/*******************************************************************
설명 : DateDiff 날짜 간격 일자
파라메터
        d1 : 시작일
        d2 : 종료일
반환값 : 간격 일자
*******************************************************************/
function DateDiff(d1, d2) {
	 d1 = new Date(d1);
     d2 = new Date(d2);

     var t2 = d2.getTime();
     var t1 = d1.getTime();
     return parseInt((t2-t1)/(24*3600*1000));
}

/*******************************************************************
설명 : 파일에 포함된 한글 포함 여부 체크
파라메터
        name : 입력값
반환값 : 포함여부(true, false)
*******************************************************************/
function isHangul(name) {
	var nameArr = name.split("\\");
	var chkName = nameArr[nameArr.length-1];
	
	var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	
	if(check.test(chkName)){
		return true;
	}else{
		return false;
	}
	
}