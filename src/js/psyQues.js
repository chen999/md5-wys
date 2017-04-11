function change(){
	console.log($('.op').height(),$('.op label').outerHeight(),$('.op label').length);
	if($('.op').height() > ($('.op label').outerHeight()+24)){
		if($('.op label').length /2 % 2 != 0){
			$('.op').append('<label class="radio empty"  style=" visibility:hidden;">1</label>');
		}
	}
	else{
		if($('.op label:last-child').html() == 1){
			$('.op label:last-child').remove();
		}
	}
}
change();


(function(){
	$('.op .radio').click(function(){
		if($(this).hasClass('current')){
			return;
		}
		else{
			$(this).addClass('current');
			$(this).siblings('.current').removeClass('current');
		}
	})
})()
