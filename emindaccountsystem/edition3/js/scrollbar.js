function addWhell(obj,fun){
	var navt = window.navigator.userAgent.toLowerCase().indexOf('firefox');
	// 先判断是不是Firefox浏览器
	if(navt != -1){
		obj.addEventListener('DOMMouseScroll', scrollFn);
	}else {
		if(obj.addEventListener){
			obj.addEventListener('mousewheel', scrollFn);
		}else {
			obj.attachEvent('onmousewheel', scrollFn);
		}
	}
	// 在函数中判断是ev.wheelDelta||ev.detail,然后统一方向down = true(向上)，down = false(向下)
	function scrollFn(ev){
		var down = true;
		if(ev.wheelDelta){
			down = ev.wheelDelta > 0? true: false;
		}else {
			down = ev.detail < 0 ? true: false;
		}
		// 判断是否有函数传入，有就走下面这条，没有就不走；
		typeof(fun) == 'function' && fun(down);
		ev.preventDefault();
	}
}
$(function (){
	function barFn(){
		var scrollVal = 0;
		var scale = 0;
		var fixHeight = $('#landinglog-wrap').height();
		var listHeight = $('#landinglog').height();
		var barBoxHeight = fixHeight;
		var barHeight = 44;
		function scrollBar(){
			$('#barbox').show(0);
			var num = 20;
			if(fixHeight>=listHeight){
				$('#bar').css('height',fixHeight);
				$('#barbox').stop().animate({'width':0}, 300,function (){
					$('#barbox').hide(0);
				});
				return;
			}else {
				$('#barbox').css('width',0);
				$('#barbox').stop().animate({'width':9}, 300);
				barHeight = parseInt(fixHeight/listHeight*barBoxHeight);
					$('#bar').css('height',barHeight);
				addWhell(document,function (down){
					if(down){
						scrollVal-=num;
						if(scrollVal<=10){
							scrollVal = 0;
							$('#bar').css('top',0);
							$('#landinglog').css('top',0);
						}else {
							scale =  parseFloat(scrollVal/(barBoxHeight-barHeight));
							var listTop = parseInt((listHeight-fixHeight)*scale);
							$('#bar').css('top',scrollVal);
							$('#landinglog').css('top',-listTop);
						}
					}else {
						scrollVal+=num;
						var h = barBoxHeight-barHeight-10;
						var h2 = barBoxHeight-barHeight;
						var h3 = listHeight-fixHeight;
						if(scrollVal>=h){
							scrollVal = h2;
							$('#bar').css('top',h2);
							$('#landinglog').css('top',-h3);
							return;
						}else {
							scale =  parseFloat(scrollVal/(barBoxHeight-barHeight));
							var listTop = parseInt((listHeight-fixHeight)*scale);
							$('#bar').css('top',scrollVal);
							$('#landinglog').css('top',-listTop);
						}
					}
				});
			}
		}
		scrollBar();
		/********************************/ 
		function dragBar(id){
			var disY = 0;
			id.bind('mousedown',downFn);
			function downFn(ev){
				disY = ev.pageY - id[0].offsetTop;
				$(document).bind('mousemove',mousemoveFn);
				$(document).bind('mouseup',mouseupFn);
				ev.preventDefault();
			}
			function mousemoveFn(ev){
				var t = ev.pageY - disY;
				var tMax = id[0].parentNode.offsetHeight - id[0].offsetHeight;
				if(t<=10){
					t = 0;
				}else if(t>=tMax-10){
					t = tMax;
				}
				scrollVal = t;
				id[0].style.top = t+'px';
				scale =  parseFloat(scrollVal/(barBoxHeight-barHeight));
				var listTop = parseInt((listHeight-fixHeight)*scale);
				$('#landinglog')[0].style.top = -listTop+'px';
			}
			function mouseupFn(){
				$(document).unbind('mousemove',mousemoveFn);
				$(document).unbind('mouseup',mouseupFn);
			}
		}
		dragBar($('#bar'));
	}
	barFn();
});