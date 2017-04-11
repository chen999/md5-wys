function radioFun(){
	$('.form-list .radio').click(function(){
		if($(this).children('.radio-check').hasClass('current')){
			return;
		}
		else{
			$(this).children('.radio-check').addClass('current');
			$(this).siblings('.radio').children('.radio-check').removeClass('current');
			$(this).children('input').val('1');
			$(this).siblings('.radio').children('input').val('0');
		}
	})
}
radioFun();