/**
 * ie8이하 체크
 */  

function cX_chkIe8OUnder()
{ 
	if (document.documentMode == 5) return true;
	else if (document.documentMode == 6) return true;
	else if (document.documentMode == 7) return true;
	else if (document.documentMode == 8) return true;	
	else return false;
}

//콘텐츠 XML 데이타 전역변수
if(cX_chkIe8OUnder())	//ie8이하 체크
	var cX_treeNodes = new ActiveXObject("Microsoft.XMLDOM");	//ie8 이하일때 
else
	var cX_treeNodes = "";

/** CMS XML 데이타 예시
<xmlData>
<COUR CLOSEYN="N" PROCEEDING="C" TOT_FILENUM_REAL="531" TOT_RUNNINGTIME_REAL="0" TOT_CHASINUM_REAL="20" TOT_RUNNINGTIME="0" TOT_CHASINUM="20" CAPTUREIMG_URL="http://edu.epasskorea.com/content/FileSvr_wbt/100002940/sample/stillcut.gif" SAMPLE_CHAPIDM="0" SAMPLE_CHAPID="300314488" SAMPLETYPE_CODE="101002" CONTTYPE_CODE="101002" USERIDX_ETC="0" USERNAME="김영훈" USERIDX="150466" VERSION_MONTH="01" VERSION_YEAR="2011" TITLE="글로벌 경쟁력 창출! 무역실무 에센스" CATEGORYID="11473" COURSEID="100033500">
<PART TITLE="수출입절차" SORTNO="1" PARTID="200024443">
<CHAP TITLE="수출입절차 개관" SORTNO="1" CHAPTERID="300314488">
<SECT TITLE="무역 준비하기" SORTNO="1" YSIZE="722" XSIZE="1022" SECTIONID="400323305">
<FILE CONTTYPE_CODE="101002" TITLE="010101.htm" SORTNO="1" ENABLED="Y" PLAYTIME_SEC="0" PLAYTIME="0" PROF_IDX="0" WIN_HEIGHT_H="0" WIN_WIDTH_H="0" SKIN_CODE_H=" " WIN_HEIGHT="0" WIN_WIDTH="0" SKIN_CODE=" " FILENAME_LD="010101.htm" FILEURL_LD="100002940/0101/" MOBILEYN="N" HDYN=" " LDYN=" " FILEID="500328573" PROF_NAME=""/>
<FILE CONTTYPE_CODE="101002" TITLE="010102.htm" SORTNO="2" ENABLED="Y" PLAYTIME_SEC="0" PLAYTIME="0" PROF_IDX="0" WIN_HEIGHT_H="0" WIN_WIDTH_H="0" SKIN_CODE_H=" " WIN_HEIGHT="0" WIN_WIDTH="0" SKIN_CODE=" " FILENAME_LD="010102.htm" FILEURL_LD="100002940/0101/" MOBILEYN="N" HDYN=" " LDYN=" " FILEID="500328574" PROF_NAME=""/>
<FILE CONTTYPE_CODE="101002" TITLE="010103.htm" SORTNO="3" ENABLED="Y" PLAYTIME_SEC="0" PLAYTIME="0" PROF_IDX="0" WIN_HEIGHT_H="0" WIN_WIDTH_H="0" SKIN_CODE_H=" " WIN_HEIGHT="0" WIN_WIDTH="0" SKIN_CODE=" " FILENAME_LD="010103.htm" FILEURL_LD="100002940/0101/" MOBILEYN="N" HDYN=" " LDYN=" " FILEID="500328575" PROF_NAME=""/>
</SECT>
 */


//학습페이지 전역변수
var cX_currentPartid = '';		//현재페이지 편아이디
var cX_currentChapid = '';		//현재페이지 장아이디
var cX_currentSectid = '';		//현재페이지 절아이디
var cX_currentFileid = '';		//현재페이지 파일아이디
var cX_currentSdt = '';			//현재페이지 시작일시



/**
 * 콘텐츠 XML 데이타를 전역변수에 담기
 * @param cmsCourseid : CMS courseid
 */
function cX_setTreeNodes(cmsCourseid)	
{
	
	$.get(cX_makeTreeNodes(cmsCourseid), function(data) {	
		if(cX_chkIe8OUnder()){	//ie8이하 체크
			cX_treeNodes.loadXML(data);	//ie8 이하일때 xml 값 넣는 법
		}
		else{
			cX_treeNodes = data;
		}
	});
}



/**
 * 콘텐츠정보 XML url 만들기
 * @param cmsCourseid : CMS courseid
 * @returns String Xml파일url(CMS파일서버url + '/' + CMS과정코드앞6자리(폴더용) + '/' + CMS과정코드 + '.XML'
 */
function cX_makeTreeNodes(cmsCourseid)
{
	return "/webStorageCMS/XML/"+cmsCourseid.substr(0,6)+"/"+cmsCourseid+".XML";

}

/**
 * 과정의 첫 fileid 가져오기
 * @param 
 * @returns String fileid
 */
function cX_getCourFirstFileid()
{
	return $(cX_treeNodes).find('COUR FILE:first').attr("FILEID");	
}

/**
 * 교시의 첫 sectionid 가져오기
 * @param 
 * @returns String sectionid
 */
function cX_getChapFirstSectid(partId,chapId)
{
	return $(cX_treeNodes).find("COUR>PART[PARTID='"+partId+"']>CHAP[CHAPTERID='"+chapId+"']>SECT:first").attr("SECTIONID");
}

/**
 * 절의 첫 fileid 가져오기
 * @param 
 * @returns String fileid
 */
function cX_getSectFirstFileid(partId,chapId,sectId)
{
	return $(cX_treeNodes).find("COUR>PART[PARTID='"+partId+"']>CHAP[CHAPTERID='"+chapId+"']>SECT[SECTIONID='"+sectId+"']>FILE:first").attr("FILEID");	
}


/**
 * 과정의 어트리뷰트 값 가져오기
 * @param : 어트리뷰트네임
 * @returns String 어트리뷰트 값
 */
function cX_getCourAttributeVal(attributeNm)
{
	return $(cX_treeNodes).find('COUR').attr(attributeNm);
}

/**
 * 단원의 어트리뷰트 값 가져오기
 * @param : 어트리뷰트네임
 * @returns String 어트리뷰트 값
 */
function cX_getPartAttributeVal(partId,attributeNm)
{
	return $(cX_treeNodes).find("PART[PARTID='"+partId+"']").attr(attributeNm);	
}

/**
 * 교시의 어트리뷰트 값 가져오기
 * @param : 어트리뷰트네임
 * @returns String 어트리뷰트 값
 */
function cX_getChapAttributeVal(chapId,attributeNm)
{
	return $(cX_treeNodes).find("CHAP[CHAPTERID='"+chapId+"']").attr(attributeNm);	
}

/**
 * 파일의 어트리뷰트 값 가져오기
 * @param : 어트리뷰트네임
 * @returns String 어트리뷰트 값
 */
function cX_getFileAttributeVal(fileId,attributeNm)
{
	return $(cX_treeNodes).find("FILE[FILEID='"+fileId+"']").attr(attributeNm);	
}

/**
 * SCO 갯수 가져오기
 * @param : SCO 태그
 * @returns int
 */
function cX_getTotScoCnt(scoTag)
{
	if (scoTag == 'FILE')
		return $(cX_treeNodes).find("FILE[ENABLED='Y']").length;
	else 
		return $(cX_treeNodes).find(scoTag).length;
}

/**
 * Sco 코드 세팅하기
 */
function cX_setScoCode(fileId,sectId,chapId,partId)
{
	cX_currentFileid = fileId;
	cX_currentSectid = sectId;	
	cX_currentChapid = chapId;	
	cX_currentPartid = partId;		
}

/**
 * 콘텐츠페이지 경로 가져오기
 * @param 
 * @returns String fileid
 */
function cX_getContentUrl(proceeding)
{
	
	var cpTestBase ="/cpcms/"; //cp용 콘텐츠서버 도메인
	var docBase = "/storage_content/";
	
	if(proceeding =='T')
		docBase = cpTestBase;
	
	
	var filePath = $(cX_treeNodes).find("FILE[FILEID='"+cX_currentFileid+"']").attr("FILEURL_LD");
	var fileName = $(cX_treeNodes).find("FILE[FILEID='"+cX_currentFileid+"']").attr("FILENAME_LD");
	return 	docBase + filePath + fileName;
}

/**
 * 페이지 시작시간 초기화
 */
function cX_setContentSdt()
{
	cX_currentSdt  =  js_yyyy_mm_dd_hh_mm_ss();
}


