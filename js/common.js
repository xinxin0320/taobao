// 用户导航 
// 当用户悬停li时，有二级菜单的li加on显示
$(function(){
	$('.nav-right>li>.submain').parent().hover(function(){
		$(this).toggleClass('on');
	})
})