// JavaScript Document
function fontAuto(width){
	var winW=document.documentElement.clientWidth;
	if(winW>=width){
		document.documentElement.style.fontSize="6.25rem";
	}
	else{
		document.documentElement.style.fontSize=(winW/width*6.25)+"rem";
	}
}
fontAuto(640);
window.onresize=function(){
	fontAuto(640);
}