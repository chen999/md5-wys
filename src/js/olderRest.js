(function(){
	$('.list-container li').click(function(e){
		var target= e.target;
		if(target.tagName.toLowerCase()=='button'){
			$('.rest-info').show();
			$('.rest-info>li').eq($(this).index()).show();
			return;
		}
		if($(this).hasClass('current')){
			$(this).removeClass();
		}
		else{
			$(this).addClass('current');
			$(this).siblings('.current').removeClass();
		}
	})
})();

(function(){
	$('.del').click(function(){
		$(this).parents('li').hide();
		$(this).parents('.rest-info').hide();
	})
})();
