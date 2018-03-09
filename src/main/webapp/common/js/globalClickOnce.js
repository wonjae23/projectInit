var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
}

function Initialize()
{
  if (HasRuntimeVersion(runtimeVersion))
  {
    document.getElementById("BootstrapperSection").style.display = "none";
  }
  else
  {
    document.getElementById("BootstrapperSection").style.display = "";
  }
}
function HasRuntimeVersion(v)
{
  var va = GetVersion(v);
  var i;
  var a = navigator.userAgent.match(/\.NET CLR [0-9.]+/g);
  if (a != null)
    for (i = 0; i < a.length; ++i)
      if (CompareVersions(va, GetVersion(a[i])) <= 0)
		return true;
  return false;
}
function GetVersion(v)
{
  var a = v.match(/([0-9]+)\.([0-9]+)\.([0-9]+)/i);
    return a.slice(1);
}
function CompareVersions(v1, v2)
{
  for (i = 0; i < v1.length; ++i)
  {
    var n1 = new Number(v1[i]);
    var n2 = new Number(v2[i]);
    if (n1 < n2)
      return -1;
    if (n1 > n2)
      return 1;
  }
  return 0;
}

var runtimeVersion = "2.0.0";
var directLink     = "";

function SetParametersAndGo()
{
    //document.getElementById("hdnUserID").value = document.getElementById("txtUserID").value;
    //document.getElementById("hdnUserPW").value = document.getElementById("txtUserPW").value;
    
    StartClickOnce();
}


// CMS
function ClickOnceCMS(uid, pwd)
{
    //실서버 : url = "http://cms.epasskorea.com/App/Enterprise/ClickOnce/CMS.application?uid=" + uid + "&pwd=" + pwd;
  //  url = "http://cms.epasskorea.com/App/Enterprise/ClickOnce/CMS.application?uid=" + uid + "&pwd=" + pwd;
    url = "http://cms.epasskorea.com/App/Enterprise/ClickOnce/CMS.application?uid=" + uid + "&pwd=" + pwd;
    //window.navigate(url);
    window.location.href = url;
    //window.open(url.toString(), "_blank", "", "");
}

// TMSe 관리 프로그램
function ClickOnceTMSe(uid, pwd, grp)
{
 //   url = "http://tms.epasskorea.com/TMSe/Master/Update/TMSe.application?uid=" + uid + "&pwd=" + pwd + "&grp=" + grp;
    url = "http://tms.epasskorea.com/TMSe/Master/Update/TMSe.application?uid=" + uid + "&pwd=" + pwd + "&grp=" + grp;
    //window.navigate(url);
    window.location.href = url;
}

// TMSe 평가 프로그램
function ClickOnceTMSeTest(smid)
{   
    url = "http://tms.epasskorea.com/TMSe/User/Update/TMSe-Test.application?smid=" + Base64.encode(smid);
    //window.navigate(url);
    window.location.href = url;
}

// TMSe 오답노트
function ClickOnceTMSeReport(scheduleid, smid)
{   
    url = "http://tms.epasskorea.com/TMSe/Report/Update/TMSe-Report.application?scheduleid=" + Base64.encode(scheduleid) + "&smid=" + Base64.encode(smid);
    //window.navigate(url);
    window.location.href = url;
}

// TMSe 로컬답안 업로드
function ClickOnceTMSeLocal(smid)
{   
    url = "http://tms.epasskorea.com/TMSe/LocalUploader/TMSe-LocalUploader.application?smid=" + Base64.encode(smid);
    //window.navigate(url);
    window.location.href = url;
}

// TMSc 관리 프로그램
function ClickOnceTMSc(uid, pwd, grp)
{
    url = "http://tms.epasskorea.com/TMSc/Master/Update/TMSc.application?uid=" + Base64.encode(uid) + "&pwd=" + Base64.encode(pwd) + "&grp=" + Base64.encode(grp);
    //window.navigate(url);
    window.location.href = url;
}

// TMSc 평가 프로그램
function ClickOnceTMScTest(smid)
{   
    url = "http://tms.epasskorea.com/TMSc/User/Update/TMSc-Test.application?smid=" + Base64.encode(smid);
    //window.navigate(url);
    window.location.href = url;
}

// TMSc 오답노트
function ClickOnceTMScReport(scheduleid, smid)
{   
    url = "http://tms.epasskorea.com/TMSc/Report/Update/TMSc-Report.application?scheduleid=" + Base64.encode(scheduleid) + "&smid=" + Base64.encode(smid);
    //window.navigate(url);
    window.location.href = url;
}

// TMSc 로컬답안 업로드
function ClickOnceTMScLocal(smid)
{   
    url = "http://tms.epasskorea.com/TMSc/LocalUploader/TMSc-LocalUploader.application?smid=" + Base64.encode(smid);
    //window.navigate(url);
    window.location.href = url;
}

// 2012-08-14
// TMSe 평가 프로그램 - 웹
function WebTMSeTest(smid)
{
	window.open('http://tms.epasskorea.com/tmse/web/userexamwebver/exam_testing.asp?smid='+encodeURIComponent(smid),'tmsExam','width=900,height=620');
}

// 2012-11-09 임시
// TMSe 평가 프로그램
function ClickOnceTMSeTestTEST(smid)
{   
    url = "http://tms.epasskorea.com/TMSe/User/Update/TMSe-Test.application?smid=" + Base64.encode(smid);
    window.open(url);
}
// TMSe 평가 프로그램 - 웹
function WebTMSeTestTEST(smid)
{
	window.open('http://tms.epasskorea.com/tmse/web/userexamwebver/exam_testing.asp?smid='+encodeURIComponent(smid),'tmsExam','width=900,height=620');
}

function goTMSeTest(svcmode, smid, desen_smid) 
{
	if (svcmode == "107001")
	{
		ClickOnceTMSeTest(smid);	// 동작안함/ 수정해야함/
	}
	else if(svcmode == "107002")
	{
		//alert(desen_smid);
		WebTMSeTest(desen_smid);
	}
	else
	{
		alert("시험 정보가 없습니다.");
	}
}
//TMSe 오답노트(웹 버전)
function TMSePopanswer(smid){
	var dsmid = encodeURIComponent(smid);
	var pa = window.open("http://tms.epasskorea.com/tmse/web/userexamwebver/wrong_answer.asp?smid="+dsmid,"pa","width=800,height=800,noresize,scrollbars=yes");
	pa.focus();
}

//TMSe 성적표
function WebTMSeRoport(scheduleid,smid,obj_kind){
	var dsmid = encodeURIComponent(smid);
	window.open('http://tms.epasskorea.com/tmse/web/reportCard/reportCard.asp?scheduleid='+scheduleid+'&smid='+dsmid+'&obj_kind='+obj_kind,'ReportCard',"width=760,height=700,scrollbars=yes");
}
function previewTmseTest(examid){
	window.open("http://tms.epasskorea.com/tmse/web/userexamwebver/PREVIEW_EXAM.ASP?ExamID="+examid,"preview","width=900,height=620,scrollbars=yes,resizeable=yes");
}