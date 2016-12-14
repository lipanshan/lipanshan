$(function (){
	// 头部账户信息和推出的弹框
	$('#accountName').click(function (ev){
		if($('#accountlist').css('display') == 'none'){
			showFn();
		}else {
			hideFn();
		}
		ev.originalEvent.cancelBubble = true;
	});
	function showFn(){
		$('#accountNameIco').css('backgroundPosition','-33px -85px');
		$('#accountlist')[0].style.display = 'block';
		$('#accountlist').stop().animate({"opacity":".25"},50,function (){
			$('#accountlist').animate({"opacity":".5"},150,function (){$('#accountlist').animate({"opacity":"100"},50)})
		});
	}
	function hideFn(){
		$('#accountNameIco').css('backgroundPosition','0 -85px');
		$('#accountlist').stop().animate({
				"opacity":"0"
		},300,function (){$('#accountlist').css('display','none');});
	}
	$('#accountNameIco').click(function (){
		$('#accountName').trigger('click');
	})
	$(document).click(function (ev){
		if(ev.target.getAttribute('index') != 'ac'){
			hideFn();
		}
	});
	// 点击问题的标题然后内容显示出来,(id)点击的元素id，listId需要显示的列表的id,动画播放时间'loiliavtive'
	function menuListMove(id,listId,playTime,className){
		playTime = ''|| 300;
		var onoff = true;
		id.bind('click',function (){
			if(!onoff){ return};
			onoff = false;
			if(listId.css('display') == 'block'){
				id.removeClass(className);
				removeClassFn(id,'licojtclickh');
				hideAnimate(listId);
			}else {
				addClassFn(id,'licojtclickh');
				id.addClass(className);
				showAnimate(listId);

			}
			setTimeout(function (){
				onoff = true;
			},500);
			return false;
		});
	}
	menuListMove($('#loili1'),$('#item1'),'easeIn','loiliavtive');
	menuListMove($('#loili2'),$('#item2'),'easeIn','loiliavtive');
	menuListMove($('#loili3'),$('#item3'),'easeIn','loiliavtive');
	menuListMove($('#loili4'),$('#item4'),'easeIn','loiliavtive');
	menuListMove($('#loili5'),$('#item5'),'easeIn','loiliavtive');
	menuListMove($('#laproblem1'),$('#apitem1'),'easeIn','loiliavtive');
	menuListMove($('#laproblem2'),$('#apitem2'),'easeIn','loiliavtive');
	menuListMove($('#laproblem3'),$('#apitem3'),'easeIn','loiliavtive');
		function showAnimate(elem,playTime){
				elem.show(0);
				var iHeight = elem.height()
				var csspt = parseFloat(elem.css('paddingTop'));
				var csspb = parseFloat(elem.css('paddingBottom'));
				var cssmt = parseFloat(elem.css('marginTop'));
				var cssmb = parseFloat(elem.css('marginBottom'));
				elem.css({'height':0,"paddingTop":0,'paddingBottom':0,'marginTop':0,'marginBottom':0});
				elem.stop().animate({'height':iHeight,"paddingTop":csspt,'paddingBottom':csspb,'marginTop':cssmt,'marginBottom':cssmb},playTime);
		}
		function hideAnimate(elem,playTime){
			var iHeight = elem.height()
			var csspt = parseFloat(elem.css('paddingTop'));
			var csspb = parseFloat(elem.css('paddingBottom'));
			var cssmt = parseFloat(elem.css('marginTop'));
			var cssmb = parseFloat(elem.css('marginBottom'));
			elem.stop().animate({'height':0,"paddingTop":0,'paddingBottom':0,'marginTop':0,'marginBottom':0},playTime,function (){
				elem.hide(0);
				elem.css({'height':iHeight,"paddingTop":csspt,'paddingBottom':csspb,'marginTop':cssmt,'marginBottom':cssmb});
			});
		}
		function addClassFn(id,className){
			var icoId = id.find('.licojt');
			if(!icoId){
				return;
			}

			icoId.addClass(className);
		}
		function removeClassFn(id,className){
			var icoId = id.find('.licojt');
			if(!icoId){
				return;
			}
			icoId.removeClass(className);
		}
	// for(var i=0; i< $('#menu3list').children().size();i++){
	// 	var indexLi = $('#menu3list').children().eq(i).find('h2');
	// 	var indexList = $('#menu3list').children().eq(i).find('.lmenu3list');
	// 	menuListMove(indexLi,indexList,'easeIn','lsideliactive');
	// }
	
		var indexLi = $('#qxgl').find('h2');
		var indexList = $('#qxgl').find('.lmenu3list');
		menuListMove(indexLi,indexList,'easeIn','lsideliactive');
	// 登陆邮箱弹框效果
	function opacityShow(id,num,speed,callBack){
		if(callBack&&typeof callBack == 'function'){
			id.stop().animate({'opacity':num},speed,callBack);
		}else {
			id.stop().animate({'opacity':num},speed);
		}
	}
	var verificationcode = 120;
	var onoff = true;
	var timer = 0;
	function getnewverificationcode(id){
		if(!onoff)return;
		onoff = false;
		timer = setInterval(function (){
			verificationcode--;
			if(verificationcode>=0){
				id.val(verificationcode+'秒后可从新获取');
			}else {
				clearInte(id);
			}
		},900);
	}
	function clearInte(idElem){
		clearInterval(timer);
		verificationcode = 120;
		onoff = true;
		idElem.val('免费获取验证码');
	}
		// 设置邮箱步骤1，校验码验证
	$('#setbtn').click(function (){

		$('#verifyphone').html();//应该是从后台获取用户的手机号放入这里面
		window.scrollTo(0,0);
		$('#lshadow').css('height',$(document).height())
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#setloginemail').show(0);
		$('#setloginemail').css('opacity',0);
		opacityShow($('#setloginemail'),100,400);

	});
	// step1 校验码的验证
	$('#verifynum').bind('blur',function (){
		verifyNumberStep1();
	});
	function verifyNumberStep1(){
		var str = $('#verifynum').val();
		var partten = /^\d{6,6}$/.test(str);
		if(partten||!str){
			$('#verifstep1tip').show(0);
			$('#lsendsuccess').hide(0);
			$('#verifynumfalse').hide(0);
		}else {
			$('#verifstep1tip').hide(0);
			$('#lsendsuccess').hide(0);
			$('#verifynumfalse').show(0);
		}
	}
	function shadowH(){
		$('#lshadow').hide(0);
	}
	function clearStep1(){
		$('#setloginemail').hide(0);
		clearInte($('#getverificationcode'));
		$('#verifynum').val('');
		$('#verifstep1tip').show(0);
		$('#lsendsuccess').hide(0);
		$('#verifynumfalse').hide(0);
	}
	$('#setloginemail-closebtn').click(function (){
		opacityShow($('#setloginemail'),0,400,clearStep1);
		opacityShow($('#lshadow'),0,300,shadowH);
	});
		// 步骤1 免费获取验证码
	$('#getverificationcode').click(function (){
		// ajax发送用户输入的到后台进行对比，发送成功后提示发送成功
		$('#lsendsuccess').show(0); //提示发送成功，请查收验证码
		$('#verifynumfalse').hide(0);//提示验证码错误
		$('#verifstep1tip').hide(0);//提示先验证再绑定
		getnewverificationcode($('#getverificationcode'));
	});	
	// 步骤1 提交
	$('#step1submit').click(function (){
		// ajax请求成功后才进行步骤2
		step2Show();
		clearStep1();
	});
	// 邮箱设置步骤2，邮箱格式验证
	function step2Show(){
		window.scrollTo(0,0);
		function fn3(){
			$('#setloginemail').hide(0);
		}
		opacityShow($('#setloginemail'),0,400,fn3);
		$('#setloginemail2').show(0);
		$('#setloginemail2').css('opacity',0);
		opacityShow($('#setloginemail2'),100,400);
	}
	function clearStep2(){
		$('#emailformfalse').hide(0);
		$('#emailalreadyr').hide(0);
		$('#emailtip').show(0);
		$('#setemailstep2').val('');
	}
	$('#setemailstep2').bind('blur',function (){
		verifyEmailFormatstep2();
	});
	function verifyEmailFormatstep2(){
		var str = $('#setemailstep2').val();
		var partten = /^\w+@(\w{1,}\.)+\w+$/g.test(str);
		if(partten|| !str){
			$('#emailtip').show(0);
			$('#emailformfalse').hide(0);
			$('#emailalreadyr').hide(0);
		}else {
			$('#emailformfalse').show(0);
			$('#emailtip').hide(0);
			$('#emailalreadyr').hide(0);
		}
	}
	$('#setloginemail2-closebtn').click(function (){
		opacityShow($('#setloginemail2'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#setloginemail2').hide(0);
			clearStep2();
		}
	});
	//步骤2 提交
	$('#step2submit').click(function (){
		// ajax请求成功后才进行步骤3
		$('#emailnumstep3').html();//ajax请求后将设置的邮箱号放入
		step3Show();
		clearStep2();
	});
	function step3Show(){
		window.scrollTo(0,0);
		function fn3(){
			$('#setloginemail2').hide(0);
		}
		opacityShow($('#setloginemail2'),0,400,fn3);
		$('#setloginemail3').show(0);
		$('#setloginemail3').css('opacity',0);
		opacityShow($('#setloginemail3'),100,400);
	}
	$('#setloginemail3-closebtn').click(function (){
		opacityShow($('#setloginemail3'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#setloginemail3').hide(0);
		}
	});

	// 步骤3 提交
	$('#alreadyactivetion').click(function (){
		//ajax请求检测是否已经激活，
			//激活后
			 $('#setloginemail3-closebtn').trigger('click');
			//没有激活，提示用户还未激活

	});


	// 修改登录邮箱
	function modifyClearStep1(){
		$('#modifyemailstep1').val('');
		$('#modifytype').html('<option value="">绑定手机(132****789)</option>');
		$('#setloginemail').hide(0);
		clearInte($('#mgetverificationcode'));
		$('#mtip').show(0);
		$('#msendsuccess').hide(0);
		$('#mverifynumfalse').hide(0);
	}
	$('#modifyemailbtn').click(function (){
		$('#modifytype').html();//ajax请求后向后台取得修改的方式放入select选择框中
		window.scrollTo(0,0);
		$('#lshadow').css('height',$(document).height())
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#modifyemail').show(0);
		$('#modifyemail').css('opacity',0);
		opacityShow($('#modifyemail'),100,400);
	});
	$('#modifyclose').click(function (){
		opacityShow($('#modifyemail'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#modifyemail').hide(0);
			modifyClearStep1();
		}
	});
	// 修改邮箱校验码验证
	function modifyEmailFormatstep1(){
		var str = $('#modifyemailstep1').val();
		var partten = /^\d{6,6}$/g.test(str);
		if(partten|| !str){
			$('#mtip').show(0);
			$('#mverifynumfalse').hide(0);
			$('#msendsuccess').hide(0);
		}else {
			$('#mtip').hide(0);
			$('#mverifynumfalse').show(0);
			$('#msendsuccess').hide(0);
		}
	}
	$('#modifyemailstep1').bind('blur',function (){
		modifyEmailFormatstep1();
	});
	$('#mgetverificationcode').click(function (){
		// ajax请求将用户的户名发送后台，然后倒计时
		$('#msendsuccess').show(0); //提示发送成功，请查收验证码
		$('#mverifynumfalse').hide(0);//提示验证码错误
		$('#mtip').hide(0);//提示先验证再绑定
		getnewverificationcode($('#mgetverificationcode'));
	});
	// 修改邮箱登陆 step1 提交
	function mstep1Show(){
		window.scrollTo(0,0);
		function fn3(){
			$('#modifyemail').hide(0);
		}
		opacityShow($('#modifyemail'),0,400,fn3);
		$('#modifyemail-success').show(0);
		$('#modifyemail-success').css('opacity',0);
		opacityShow($('#modifyemail-success'),100,400);
	}
	$('#msubitstep1').click(function (){
		// ajax提交数据成功后
		mstep1Show();
		modifyClearStep1();
	});
	// 修改邮箱step2 提示登陆新邮箱
	function modifyEmailFormatstep2(){
		var str = $('#newemail').val();
		var parttre = /^\w+@\w+(\.\w+)+$/.test(str);
		if(parttre||!str){
			$('#mstep2tip').show(0);
			$('#mstep2sendsuccess').hide(0);
			$('#mstep2verifyfalse').hide(0);
		}else {
			$('#mstep2tip').hide(0);
			$('#mstep2sendsuccess').hide(0);
			$('#mstep2verifyfalse').show(0);
		}
	}
	$('#newemail').bind('blur',function (){
		modifyEmailFormatstep2();
	});
	function modifyClearStep2(){
		$('#mstep2tip').show(0);
		$('#mstep2sendsuccess').hide(0);
		$('#mstep2verifyfalse').hide(0);
		$('#newemail').val('');
	}
	$('#modifyemail-closebtn').click(function (){
		opacityShow($('#modifyemail-success'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#modifyemail-success').hide(0);
			modifyClearStep2();
		}
	});
	//修改邮箱step2  提交
	$('#mstep2submit').click(function (){
		// ajax请求成功后
		modifyClearStep2();
	});

	// 解绑邮箱step1 
	$('#unbindemail').click(function (){
		$('#verification-mode').html(); //ajax请求后将可选项放入select中

		window.scrollTo(0,0);
		$('#lshadow').css('height',$(document).height())
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#unbindingemail').show(0);
		$('#unbindingemail').css('opacity',0);
		opacityShow($('#unbindingemail'),100,400);
	});
	// 解绑邮箱step1 校验码验证
	function tiedCheckCode(){
		var str = $('#ubstep1checkcode').val();
		var partten = /^\d{6,6}$/.test(str);
		if(partten||!str){
			$('#ubstep1tip').show(0);
			$('#ubsendsuccess').hide(0);
			$('#ubverifyfalse').hide(0);
		}else {
				$('#ubstep1tip').hide(0);
			$('#ubsendsuccess').hide(0);
			$('#ubverifyfalse').show(0);
		}
	}
	$('#ubstep1checkcode').bind('blur',function (){
		tiedCheckCode();
	});
	// 免费获取验证码
	$('#ubstep1getcode').click(function (){
		//ajax请求
		$('#ubsendsuccess').show(0); //提示发送成功，请查收验证码
		$('#ubverifyfalse').hide(0);//提示验证码错误
		$('#ubstep1tip').hide(0);
		getnewverificationcode($('#ubstep1getcode'));
	});
	function unbindStep1Clear(){
		$('#ubstep1tip').show(0);
		$('#ubsendsuccess').hide(0);
		$('#ubverifyfalse').hide(0);
		$('#verification-mode').html('<option value="">绑定手机(132****789)</option>');
		$('#ubstep1checkcode').val('');
		clearInte($('#ubstep1getcode'));
	}
	$('#closebtn').click(function (){
		opacityShow($('#unbindingemail'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#unbindingemail').hide(0);
			unbindStep1Clear();
		}
	});
		// 解绑step1 提交
	function unbindStep2Show(){
		window.scrollTo(0,0);
		function fn3(){
			$('#unbindingemail').hide(0);
			unbindStep1Clear();
		}
		opacityShow($('#unbindingemail'),0,400,fn3);
		$('#unbinding-emails').show(0);
		$('#unbinding-emails').css('opacity',0);
		opacityShow($('#unbinding-emails'),100,400);
	}
	$('#ubstep1submit').click(function (){
		// ajax请求成功
		unbindStep2Show();
	});
	$('#closebtn2').click(function (){
		opacityShow($('#unbinding-emails'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#unbinding-emails').hide(0);
		}
	});


	/******************************************************************/ 
	// 全选和单选同步
	function selectSynchronization(allId,listWrapId,deletId){
		var allInt = listWrapId.find('input');
		allId.unbind('click').bind('click',function (){
			if($(this).attr('checked')){
				allInt.attr('checked',true);
			}else {
				allInt.attr('checked',false);
			}
		});
		deletId.unbind('click').bind('click',function (){
			allInt.attr('checked',false);
			allId.attr('checked',false)
		});
		for(var i = 0; i<allInt.length; i++){
			if(allInt[0] == allId)continue;
			allInt.eq(i).unbind('click').bind('click',function (){
				for(var j = 0; j <allInt.length;j++){
					if(allInt[0] == allId)continue;
					if(!allInt[j].checked){
						allId.attr('checked',false);
						 return ;
					}
				}
				allId.attr('checked',true);
			});
			
		}
	}
	selectSynchronization($('#qmallchecked'),$('#qmlsit'),$('#deletchecked'));
});