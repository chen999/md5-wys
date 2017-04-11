
function change(){
	if($('.tool-list').height() > ($('.tool-list li').outerHeight()+30)){
		if($('.tool-list li').length % 2 != 0){
			$('.tool-list').append('<li class="empty" style=" visibility:hidden;">1</li>');
		}
	}
	else{
		if($('.tool-list li:last-child').html() == 1){
			$('.tool-list li:last-child').remove();
		}
	}
}
change();



