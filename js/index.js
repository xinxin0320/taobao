
$(function(){
	// 搜索框
	$('.search-select>li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.search').attr('class','search fl '+$(this).attr('class'));
		$(':text').prop('placeholder',$(this).attr('data-placeholder'))

	})
	// 点击相机上传文件
	$('form em').on('click',function(){
		// $('#uploadfile').trigger('click')
		$('#uploadfile').click()

	})
	// 滚动窗口的时候，>=搜索框的位置时吸顶
	var $top = $('.search>form').offset().top;
	// 总结：top值要保存起来，不保存起来每次滚动都会找一次文档坐标值，会出现页面晃动
	$(window).scroll(function(){
		if($(window).scrollTop() >= $top ){
			// console.log(1111)
			$('.search-wrap>div').addClass('search-fixed');
			$('.search-fixed .search-select li.on').click();
		}else{
			$('.search-wrap>div').removeClass('search-fixed');

		}
		// 点击搜索框里的li，让它成为ul的第一个孩子
		$('.search-select li').on('click',function(){
			$('.search-select').prepend($(this))
		})
		
	})
	// 点击二维码的span，隐藏app
	$('.app>span').bind('click',function(){
		// $(this).parent().css('display','none')
		$(this).parent().hide()

	})
	// 主体市场部分
	// 鼠标移上market-list下的li时 加on 显示下方的二级菜单
	$('.market-list>li').hover(function(){
		$(this).toggleClass('on');

	})
	// 移上ul上的li时，下方的二级菜单淡入一次
	$('.market-list').bind('mouseenter',function(e){
		$(e.target).children('.market-submenu').css({opacity:0}).animate({opacity:1},1000)
	})


})
// 焦点图1 (优化)
$(function(){
	var idx=0;
	var timer;
	var $banner_ol_li_length = $('.banner>ol>li').length;
	var $banner = $('.banner');
	var $banner_span = $('.banner>span');
	var $banner_ul = $('.banner>ul');
	var $banner_ol_li = $('.banner>ol>li');

	// 鼠标移上焦点图显示span
	$banner.mouseenter(function(){
		$banner_span.show()
		// 鼠标移上焦点图清除定时器
		clearInterval(timer)
	})
	// 鼠标离开焦点图隐藏span
	$banner.mouseleave(function(){
		$banner_span.hide()
		// 鼠标离开后，每隔三秒自动跳到下一张图片，即触发下一个按钮
		timer=setInterval(function(){
			$banner_span.eq(1).click()
		},3000)

	})
	// 触发鼠标离开事件，焦点图自动播放
	$banner.mouseleave();


	// 点击向后按钮，图片向左走
	$banner_span.eq(1).on('click',function(){
		// 如果动画正在运行，则不允许点击，阻止函数运行
		if($banner_ul.is(':animated')){
			return;

		}
		idx++;
		if(idx<$banner_ol_li_length){
			// 角标工作
			$banner_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur')
			// 图片工作
			$banner_ul.animate({left:'-'+idx+'00%'},1000)

		}else{
			idx=0;
			// 角标工作
			$banner_ol_li.eq(0).addClass('cur').siblings().removeClass('cur');
			// 图片工作
			$banner_ul.animate({left:'-'+$banner_ol_li_length+'00%'},1000,function(){
				// 回调函数，
				$(this).css({left:'0'})
			})



		}
		
	})
	
	// 点击赏一个按钮，图片向右走
	$banner_span.eq(0).bind('click',function(){
		idx--;
		if(idx>=0){
			// 角标工作
			$banner_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			// 图片工作
			$banner_ul.animate({left:'-'+idx+'00%'},1000)


		}else{
			idx=$banner_ol_li_length-1;
			$banner_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			$banner_ul.css({left:'-'+$banner_ol_li_length+'00%'}).animate({left:'-'+idx+'00%'},1000)


		}

	})
	// 单击角标中的li，索引值对应图片，
	// 如果li的索引是最后一个 4 ，当用户点击索引0的时候，触发向后按钮span（1），
	// 如果li的索引是0，当用户点击最后一个 4 ，触发向前的按钮
	$banner_ol_li.on('click',function(){
		if(idx == $banner_ol_li_length-1 && $(this).index() == 0){
			$banner_span.eq(1).click()
		}else if(idx==0 && $(this).index()==$banner_ol_li_length-1){
			$banner_span.eq(0).click()
		}else{
			$(this).addClass('cur').siblings().removeClass('cur');
			idx=$(this).index()
			$banner_ul.animate({left:'-'+idx+'00%'},1000)
		}

	})

})
/* 
// 焦点图1(没优化)
$(function(){
	var idx=0;
	var timer;
	// 鼠标移上焦点图显示span
	$('.banner').mouseenter(function(){
		$('.banner>span').show()
		// 鼠标移上焦点图清除定时器
		clearInterval(timer)
	})
	// 鼠标离开焦点图隐藏span
	$('.banner').mouseleave(function(){
		$('.banner>span').hide()
		// 鼠标离开后，每隔三秒自动跳到下一张图片，即触发下一个按钮
		timer=setInterval(function(){
			$('.banner>span').eq(1).click()
		},3000)

	})
	// 触发鼠标离开事件，焦点图自动播放
	$('.banner').mouseleave();


	// 点击向后按钮，图片向左走
	$('.banner>span').eq(1).on('click',function(){
		// 如果动画正在运行，则不允许点击，阻止函数运行
		if($('.banner>ul').is(':animated')){
			return;

		}
		idx++;
		if(idx<5){
			// 角标工作
			$('.banner>ol>li').eq(idx).addClass('cur').siblings().removeClass('cur')
			// 图片工作
			$('.banner>ul').animate({left:'-'+idx+'00%'},1000)

		}else{
			idx=0;
			// 角标工作
			$('.banner>ol>li').eq(0).addClass('cur').siblings().removeClass('cur');
			// 图片工作
			$('.banner>ul').animate({left:'-500%'},1000,function(){
				// 回调函数，
				$(this).css({left:'0'})
			})



		}
		
	})
	
	// 点击赏一个按钮，图片向右走
	$('.banner>span').eq(0).bind('click',function(){
		idx--;
		if(idx>=0){
			// 角标工作
			$('.banner>ol>li').eq(idx).addClass('cur').siblings().removeClass('cur');
			// 图片工作
			$('.banner>ul').animate({left:'-'+idx+'00%'},1000)


		}else{
			idx=5-1;
			$('.banner>ol>li').eq(0).addClass('cur').siblings().removeClass('cur');
			$('.banner>ul').css({left:'-500%'}).animate({left:'-400%'},1000)


		}

	})
	// 单击角标中的li，索引值对应图片，
	// 如果li的索引是最后一个 4 ，当用户点击索引0的时候，触发向后按钮span（1），
	// 如果li的索引是0，当用户点击最后一个 4 ，触发向前的按钮
	$('.banner>ol>li').on('click',function(){
		if(idx == 4 && $(this).index() == 0){
			$('.banner>span').eq(1).click()
		}else if(idx==0 && $(this).index()==4){
			$('.banner>span').eq(0).click()
		}else{
			$(this).addClass('cur').siblings().removeClass('cur');
			idx=$(this).index()
			$('.banner>ul').animate({left:'-'+idx+'00%'},1000)
		}

	})

})
*/
/*焦点图2*/
$(function(){
	var idex=0;
	var timer;
	var $banner2_ol_li_length = $('.banner2>ol>li').length;

	// 鼠标移上焦点图按钮显示
	$('.banner2').mouseenter(function(){
		$('.banner2>span').show();
		clearInterval(timer)
	})
	// 鼠标离开焦点图按钮隐藏
	$('.banner2').mouseleave(function(){
		$('.banner2>span').hide();

		// 鼠标离开焦点图，每个三秒自动播放下一张
		timer= setInterval(function(){
			$('.banner2>span').eq(1).click()

		},3000)
	})
	// 触发离开事件
	$('.banner2').mouseleave()

	// 点击下一个按钮，播放下一张图片
	// 对应的ol li加cur其他的不加
	$('.banner2>span').eq(1).on('click',function(){
		// 如果动画正在执行，不允许点击
		if($('.banner2>ul').is(':animated')){
			return;
		}
		idex++;

		if(idex<6){
			//角标的工作
			$('.banner2>ol>li').eq(idex).addClass('cur').siblings().removeClass('cur')


			// 图片的工作
			$('.banner2>ul').animate({left:'-'+idex+'00%'},1000)

		}else{
			idex=0;
			$('.banner2>ol>li').eq(0).addClass('cur').siblings().removeClass('cur')
			$('.banner2>ul').animate({left:'-600%'},1000,function(){
				$(this).css({left:0})
			})
		}
		$('.banner2-header>em').html('<span>'+(idex+1)+'</span>'+'/'+$banner2_ol_li_length)

		
	})
	// 点击上一个按钮，播放上一张图片
	$('.banner2>span').eq(0).on('click',function(){
		if($('.banner2>ul').is(':animated')){
			return;
		}
		idex--;
		if(idex>=0){
			$('.banner2>ol>li').eq(idex).addClass('cur').siblings().removeClass('cur');
			$('.banner2>ul').animate({left:'-'+idex+'00%'},1000)
		}else{
			idex=5;
			$('.banner2>ol>li').eq(idex).addClass('cur').siblings().removeClass('cur');
			$('.banner2>ul').css({left:'-600%'}).animate({left:'-500%'},1000)
		}
		$('.banner2-header>em').html('<span>'+(idex+1)+'</span>'+'/'+$banner2_ol_li_length)

	})
	// 点击角标上的li，加cur,其他不加，索引对应图片显示，
	// 当角标在最后一个且用户点击第一个的li,触发向后按钮
	// 当角标的索引值为0且用户点击最后的li,触发向前按钮
	$('.banner2>ol>li').on('click',function(){
		if(idex==5 && $(this).index()==0){
			$('.banner2>span').eq(1).click();
		}else if(idex==0 && $(this).index()==5){
			$('.banner2>span').eq(0).click()
		}else{
			$(this).addClass('cur').siblings().removeClass('cur')
			idex=$(this).index();
			$('.banner2>ul').animate({left:'-'+idex+'00%'},1000)
		}
		$('.banner2-header>em').html('<span>'+(idex+1)+'</span>'+'/'+$banner2_ol_li_length)

	})


	// 主体右侧背景图渲染
	$('.main-services span').each(function(index){
		$(this).css({'background-position':'0 -'+index*44+'px'})
	})
	// 主体右侧鼠标移上li显示（on）二级菜单，鼠标离开隐藏二级菜单
	$('.main-services>li:lt(4)').on('mouseenter',function(){
		$(this).addClass('on').siblings().removeClass('on')
	})
	$('.main-services>li:lt(4)').on('mouseleave',function(){
		$(this).removeClass('on')
	})
	
	// 点击二级菜单下的i,隐藏他的老爸
	$('.services-submenu>i').on('click',function(){
		$(this).parent().parent().removeClass('on')
	})




	// 侧边栏吸顶
	var colors=['#FF5C21','#FF689A','#9B8AFB','#CACE3D','#BA97AB','#f40','#515151','#515151','#515151']
	
	$('#aside-nav>li').each(function(index){
		$(this).css({'color':colors[index]});

	})
	// 鼠标移上li有一个淡入，改变其css的opacity:0，动画0.5秒后opacity:1
	$('#aside-nav>li').mouseenter(function(){
		// 判断li不是处于单机状态
		if($(this).hasClass('cur')==false){
			$(this).css({opacity:0}).animate({opacity:1},500)


		}
	})

	// 点击侧边栏的li，加cur,其他不加
	$('#aside-nav>li').on('click',function(){
		$(this).addClass('cur').siblings().removeClass('cur');

		

	})
	$('#aside-nav>li').filter(':lt(6)').on('click',function(){
		// 点击li,其对应的文档坐标值得顶部贴上搜索框底部
		// 我常逛的
		console.log($(this).index())
		var li_index =$(this).index();
		console.log($('.section').eq(0).offset().top-49)
		$('html,body').animate({scrollTop:$('.section').eq(li_index).offset().top-49},500)
	})
		
	

	// 点击‘返回顶部’，文档坐标滚动到0
	$('#aside-nav>li').eq(6).on('click',function(){
		$('html,body').animate({scrollTop:0},500)
	})
	var aside_top = $('#aside-nav').offset().top
	console.log(aside_top)
	// 如果窗口滚动的高度>=窗口的高度，那么顶部就显示，否则就隐藏
	// 窗口滚动的高度+49>=侧边栏文档坐标值，则吸顶
	// 窗口滚动的高度>=文档坐标值时，对应的侧边栏索引显示背景图（触发点击状态）
	$(window).on('scroll',function(){
		// 如果窗口滚动的高度>=窗口的高度，那么顶部就显示，否则就隐藏
		if($(window).scrollTop() >= $(window).height()){
			$('#aside-nav>li').eq(6).show()

		}else{
			$('#aside-nav>li').eq(6).hide()
		}
	// 判断窗口滚动的高度+49>=侧边栏文档坐标值，则吸顶，否则不吸顶
	
		if($(window).scrollTop()+49>=aside_top){
			$('#aside-nav').css({position:'fixed',top:49})
		}else{
			$('#aside-nav').css({position:'absolute',top:440})


		}
	// 窗口滚动的高度>=文档坐标值-49时，对应的侧边栏索引显示背景图
		// if($(window).scrollTop()>=$('.section').eq(1).offset().top-49){
		// 	$('#aside-nav>li').eq(1).addClass('cur').siblings().removeClass('cur')
		// }
		// if($(window).scrollTop()>=$('.section').eq(2).offset().top-49){
		// 	$('#aside-nav>li').eq(2).addClass('cur').siblings().removeClass('cur')
		// }

		for(var i=0;i<6;i++){
			if($(window).scrollTop()>=$('.section').eq(i).offset().top-49){
				$('#aside-nav>li').eq(i).addClass('cur').siblings().removeClass('cur')
			}

		}
	
	})

}) 
































