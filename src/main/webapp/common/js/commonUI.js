//
(jQuery)(function($){
	function colorPalette(){
		if($('#colorPalette').length == 0) return false;
		var bts = $('#colorPalette button');
		$(bts).each(function(){
			var color = $(this).attr('class').replace('color','#');
			$(this).css('background',color);
		});
	}colorPalette();
	$('.openSearchDetail').on('click',function(){					
		var str = "검색옵션 [+]";
		if ($(this).text() == str){
			$(this).text('검색옵션 [ - ]');
			$('.formTable.searchDetail').css('display','table');			
		}else {
			$(this).text(str);
			$('.formTable.searchDetail').css('display','none');
		}
	});


	/* ************레이어 관련 임시 스크립트************* */
	function layerCtrl(name) {
		var h = $(document).height();
		if (name.indexOf(' ') != -1 ){
			var classNames = name.split(' ');
			var key = classNames[classNames.length-1];
			$('#'+key).parent($('.modalDiv')).css('height',h).show();
			$('#'+key+' .btClose').on('click',function(){
				$('#'+key).parent($('.modalDiv')).hide();
			});
		}
		else {
			$(name).parent($('.modalDiv')).css('height',h).show();
			$(name+' .btClose').on('click',function(){
				$(name).parent($('.modalDiv')).hide();
			});
		}		
	}
	$('.templateMakeList').on('click',function(){
		layerCtrl('#'+$(this).attr('class'));
	});
	$('.pageUseCompanyList').on('click',function(){
		layerCtrl('#'+$(this).attr('class'));
	});
	$('.regContents').on('click',function(){
		layerCtrl('#'+$(this).attr('class'));
	});
	$('.selectContents').on('click',function(){
		layerCtrl('#'+$(this).attr('class'));
	});
});