
/*
* JSONP를 통한 서비스 호출 
* url : jsonp 호출 url
* method : jsonp type (method) : GET --> jsonp는 get만 지원됨..ㅠㅠ
* params : parameter - param1=value1&param2=value2
* callback : callback 함수	 
*/
function getJsonPData(url,method, params,callback)
{
	if(params == ""){
		url = url + "?callback=" + callback
	}else{
		url = url + "?" + params + "&callback=" + callback
	}
//		alert(url);
	$.ajaxPrefilter("json", function(options, orig, jqXHR) {
		return "jsonp";
	});

	$.ajax({
		url: url
		, crossDomain: true
		, async: false
		, cache: false			
		, dataType: "json"
		, type: method			
		, success: function( data, textStatus, jqXHR ){}
		, error: function( jqXHR, textStatus, errorThrown ){}
	});
}


