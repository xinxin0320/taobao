$(function(){
// 给more-market-wrapper加on显示二级菜单

	$('.more-market-wrapper').on('mouseenter',function(){
		$(this).addClass('on');
	});
	$('.more-market-wrapper').on('mouseleave',function(){
		$(this).removeClass('on');
	})
	// 点击search-select后的li,让其成为它的第一个孩子
	$('.search-select>li').on('click',function(e){
		$(this).parent().prepend($(this))
		
	});
		console.log($('.nvnav-wrapper li'))

	// 鼠标移上女装导航的li时，让span的top为0
	$('.nvnav-wrapper li').not(":eq(0)").on('mouseenter',function(){
		$(this).children('i').animate({'top':0},100)
		
	});
	$('.nvnav-wrapper li').not(":eq(0)").on('mouseleave',function(){

		$(this).children('i').animate({'top':35},100)
		
	})
	// 呼吸轮播图
	var idx=0;
	var timer;
	// 点击向后按钮，图片播放下一张，角标加on
	$('.banner>span').eq(1).on('click',function(e){
	// 图片的工作
		idx++;
		if(idx>=3){
			idx=0;
		}

		$('.banner>ul>li').eq(idx).fadeIn(500).siblings().fadeOut(500);
	// 角标的工作
		$('.banner>ol>li').eq(idx).addClass('on').siblings().removeClass('on')
		
	})
	$('.banner>span').eq(0).on('click',function(e){
	// 图片的工作
		idx--;
		if(idx<0){
			idx=2;
		}

		$('.banner>ul>li').eq(idx).fadeIn(500).siblings().fadeOut(500);
	// 角标的工作
		$('.banner>ol>li').eq(idx).addClass('on').siblings().removeClass('on')
		
	})
	// 点击角标，显示对应的图片
	$('.banner>ol>li').on('click',function(e){
		$(this).addClass('on').siblings().removeClass('on');
		$('.banner>ul>li').eq($(this).index()).fadeIn(500).siblings().fadeOut(500);
		
	})
	// 鼠标离开轮播图  每隔三秒自动播放
	// 鼠标移动到banner清除定时器
	$('.banner').on('mouseenter',function(e){
		clearInterval(timer);
		
		
	});
	$('.banner').on('mouseleave',function(e){
		timer = setInterval(function(){
			$('.banner>span').eq(1).trigger('click');

		},3000)
		
	}).mouseleave();


});

	
