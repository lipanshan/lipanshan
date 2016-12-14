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

	/************************基本资料保存成功提示start*************************************/
	// 判断个人简介字数
	$('#perdatetext').blur(function (){
		var len = $('#perdatetext').val().length;
		if(len>=0&&len<=500){	
			$('#perdatetip').css('height',0);
		}else {
			$('#perdatetip').css('height','auto');
		}
	});
	$('#biname').blur(function (){
		//判断姓名长度
		var namebi = $('#biname').val().length;
		if(namebi==0||namebi>=2&&namebi<=7){
			$('#namefalsetip').hide(0);
		}else {
			$('#namefalsetip').show(0);
		}
	});
	$('#submitbd').click(function (){

		// ajax成功之后执行这些
		window.scrollTo(0,0);
		$('#lshadow').height($(document).height());
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#basicdatesuccess').show(0);
		$('#basicdatesuccess').css('opacity',0);
		opacityShow($('#basicdatesuccess'),100,400);
	});
	$('#closebtnsuccess').click(function (){
		opacityShow($('#basicdatesuccess'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#basicdatesuccess').hide(0);
		}
	});
	$('#submitdi').click(function (){
		// ajax成功之后执行这些
		window.scrollTo(0,0);
		$('#lshadow').height($(document).height());
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#detailedinfosuccess').show(0);
		$('#detailedinfosuccess').css('opacity',0);
		opacityShow($('#detailedinfosuccess'),100,400);
	});
	$('#closebtn-disuccess').click(function (){
		opacityShow($('#detailedinfosuccess'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#detailedinfosuccess').hide(0);
		}
	});
	//************************基本资料保存成功提示end*************************************/





	//************************绑定手机弹框提示start*************************************/
		//解绑手机弹框效果
		// 设置手机步骤1，校验码验证
	$('#setbtnphone').click(function (){

		$('#verifyphone').html();//应该是从后台获取用户的手机号放入这里面
		window.scrollTo(0,0);
		$('#lshadow').css('height',$(document).height())
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#setloginphone').show(0);
		$('#setloginphone').css('opacity',0);
		opacityShow($('#setloginphone'),100,400);

	});
	// step1 校验码的验证
	$('#verifynumphone').bind('blur',function (){
		verifyNumberStep1Phone();
	});
	function verifyNumberStep1Phone(){
		var str = $('#verifynumphone').val();
		var partten = /^\d{6,6}$/.test(str);
		if(partten||!str){
			$('#verifstep1tipphone').show(0);
			$('#lsendsuccessphone').hide(0);
			$('#verifynumfalsephone').hide(0);
		}else {
			$('#verifstep1tipphone').hide(0);
			$('#lsendsuccessphone').hide(0);
			$('#verifynumfalsephone').show(0);
		}
	}
	function clearStep1Phone(){
		$('#setloginphone').hide(0);
		clearInte($('#getverificationcodephone'));
		$('#verifynumphone').val('');
		$('#verifstep1tipphone').show(0);
		$('#lsendsuccessphone').hide(0);
		$('#verifynumfalsephone').hide(0);
	}
	$('#setloginphone-closebtn').click(function (){
		opacityShow($('#setloginphone'),0,400,clearStep1Phone);
		opacityShow($('#lshadow'),0,300,shadowH);
	});
		// 步骤1 免费获取验证码
	$('#getverificationcodephone').click(function (){
		// ajax发送用户输入的到后台进行对比，发送成功后提示发送成功
		$('#lsendsuccessphone').show(0); //提示发送成功，请查收验证码
		$('#verifynumfalsephone').hide(0);//提示验证码错误
		$('#verifstep1tipphone').hide(0);//提示先验证再绑定
		getnewverificationcode($('#getverificationcodephone'));
	});	
	// 步骤1 提交
	$('#step1submitphone').click(function (){
		// ajax请求成功后才进行步骤2
		step2ShowPhone();
		clearStep1Phone();
	});
	// 手机设置步骤2，手机格式验证
	function step2ShowPhone(){
		window.scrollTo(0,0);
		function fn3(){
			$('#setloginphone').hide(0);
		}
		opacityShow($('#setloginphone'),0,400,fn3);
		$('#setloginphone2').show(0);
		$('#setloginphone2').css('opacity',0);
		opacityShow($('#setloginphone2'),100,400);
	}
	function clearStep2Phone(){
		$('#phoneformfalse').hide(0);
		$('#phonealreadyr').hide(0);
		$('#phonetip').show(0);
		$('#setphonestep2').val('');
	}
	$('#setphonestep2').bind('blur',function (){
		verifyPhoneFormatstep2();
	});
	function verifyPhoneFormatstep2(){
		var str = $('#setphonestep2').val();
		var partten = /^1[3-9]\d{9,9}$/g.test(str);
		if(partten|| !str){
			$('#phonetip').show(0);
			$('#phoneformfalse').hide(0);
			$('#phonealreadyr').hide(0);
		}else {
			$('#phoneformfalse').show(0);
			$('#phonetip').hide(0);
			$('#phonealreadyr').hide(0);
		}
	}
	$('#setloginphone2-closebtn').click(function (){
		opacityShow($('#setloginphone2'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#setloginphone2').hide(0);
			clearStep2Phone();
		}
	});
	//步骤2 提交
	$('#step2submitphone').click(function (){
		// ajax请求成功后才进行步骤3
		$('#phonenumstep3').html();//ajax请求后将设置的邮箱号放入
		step3ShowPhone();
		clearStep2Phone();
	});
	function step3ShowPhone(){
		window.scrollTo(0,0);
		function fn3(){
			$('#setloginphone2').hide(0);
		}
		opacityShow($('#setloginphone2'),0,400,fn3);
		$('#setloginphone3').show(0);
		$('#setloginphone3').css('opacity',0);
		opacityShow($('#setloginphone3'),100,400);
	}
	$('#setloginphone3-closebtn').click(function (){
		opacityShow($('#setloginphone3'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#setloginphone3').hide(0);
			$('#phonenumstep3').html('');
		}
	});

	// 步骤3 提交
	$('#alreadyactivetionphone').click(function (){
		//ajax请求检测是否已经激活，
			//激活后
			 $('#setloginphone3-closebtn').trigger('click');
			//没有激活，提示用户还未激活

	});
	// 修改登录手机
	function modifyClearStep1Phone(){
		$('#modifyphonestep1').val('');
		$('#modifytypephone').html('<option value="">绑定手机(132****789)</option>');
		$('#setloginphone').hide(0);
		clearInte($('#mgetverificationcodephone'));
		$('#mtipphone').show(0);
		$('#msendsuccessphone').hide(0);
		$('#mverifynumfalsephone').hide(0);
	}
	$('#modifyphonebtn').click(function (){
		$('#modifytypephone').html();//ajax请求后向后台取得修改的方式放入select选择框中
		window.scrollTo(0,0);
		$('#lshadow').css('height',$(document).height())
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#modifyphone').show(0);
		$('#modifyphone').css('opacity',0);
		opacityShow($('#modifyphone'),100,400);
	});
	$('#modifyclosephone').click(function (){
		opacityShow($('#modifyphone'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#modifyphone').hide(0);
			modifyClearStep1Phone();
		}
	});
	// 修改手机校验码验证
	function modifyPhoneFormatstep1(){
		var str = $('#modifyphonestep1').val();
		var partten = /^\d{6,6}$/g.test(str);
		if(partten|| !str){
			$('#mtipphone').show(0);
			$('#mverifynumfalsephone').hide(0);
			$('#msendsuccessphone').hide(0);
		}else {
			$('#mtipphone').hide(0);
			$('#mverifynumfalsephone').show(0);
			$('#msendsuccessphone').hide(0);
		}
	}
	$('#modifyphonestep1').bind('blur',function (){
		modifyPhoneFormatstep1();
	});
	$('#mgetverificationcodephone').click(function (){
		// ajax请求将用户的户名发送后台，然后倒计时
		$('#msendsuccessphone').show(0); //提示发送成功，请查收验证码
		$('#mverifynumfalsephone').hide(0);//提示验证码错误
		$('#mtipphone').hide(0);//提示先验证再绑定
		getnewverificationcode($('#mgetverificationcodephone'));
	});
	// 修改手机登录 step1 提交
	function mstep1ShowPhone(){
		window.scrollTo(0,0);
		function fn3(){
			$('#modifyphone').hide(0);
		}
		opacityShow($('#modifyphone'),0,400,fn3);
		$('#modifyphone-success').show(0);
		$('#modifyphone-success').css('opacity',0);
		opacityShow($('#modifyphone-success'),100,400);
	}
	$('#msubitstep1phone').click(function (){
		// ajax提交数据成功后
		mstep1ShowPhone();
		modifyClearStep1Phone();
	});
	// 修改手机step2 提示验证新手机号
	function modifyPhoneFormatstep2(){
		var str = $('#newphone').val();
		var parttre = /^1\d{10,10}$/.test(str);
		if(parttre||!str){
			$('#mstep2tipphone').show(0);
			$('#mstep2sendsuccessphone').hide(0);
			$('#mstep2verifyfalsephone').hide(0);
		}else {
			$('#mstep2tipphone').hide(0);
			$('#mstep2sendsuccessphone').hide(0);
			$('#mstep2verifyfalsephone').show(0);
		}
	}
	$('#newphone').bind('blur',function (){
		modifyPhoneFormatstep2();
	});
	function modifyClearStep2Phone(){
		$('#mstep2tipphone').show(0);
		$('#mstep2sendsuccessphone').hide(0);
		$('#mstep2verifyfalsephone').hide(0);
		$('#newphone').val('');
	}
	$('#modifyphone-closebtn').click(function (){
		opacityShow($('#modifyphone-success'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#modifyphone-success').hide(0);
			modifyClearStep2Phone();
		}
	});
	//修改手机step2  提交
	$('#mstep2submitphone').click(function (){
		// ajax请求成功后
		modifyClearStep2Phone();
	});

	// 解绑手机step1 
	$('#unbindphone').click(function (){
		$('#verification-modephone').html(); //ajax请求后将可选项放入select中

		window.scrollTo(0,0);
		$('#lshadow').css('height',$(document).height())
		$('#lshadow').show(0);
		$('#lshadow').css('opacity',0);
		opacityShow($('#lshadow'),'.4',300);
		$('#unbindingphone').show(0);
		$('#unbindingphone').css('opacity',0);
		opacityShow($('#unbindingphone'),100,400);
	});
	// 解绑手机step1 校验码验证
	function tiedCheckCodePhone(){
		var str = $('#ubstep1checkcodephone').val();
		var partten = /^\d{6,6}$/.test(str);
		if(partten||!str){
			$('#ubstep1tipphone').show(0);
			$('#ubsendsuccessphone').hide(0);
			$('#ubverifyfalsephone').hide(0);
		}else {
				$('#ubstep1tipphone').hide(0);
			$('#ubsendsuccessphone').hide(0);
			$('#ubverifyfalsephone').show(0);
		}
	}
	$('#ubstep1checkcodephone').bind('blur',function (){
		tiedCheckCodePhone();
	});
	// 免费获取验证码
	$('#ubstep1getcodephone').click(function (){
		//ajax请求
		$('#ubsendsuccessphone').show(0); //提示发送成功，请查收验证码
		$('#ubverifyfalsephone').hide(0);//提示验证码错误
		$('#ubstep1tipphone').hide(0);
		getnewverificationcode($('#ubstep1getcodephone'));
	});
	function unbindStep1ClearPhone(){
		$('#ubstep1tipphone').show(0);
		$('#ubsendsuccessphone').hide(0);
		$('#ubverifyfalsephone').hide(0);
		$('#verification-modephone').html('<option value="">绑定手机(132****789)</option>');
		$('#ubstep1checkcodephone').val('');
		clearInte($('#ubstep1getcodephone'));
	}
	$('#closebtnphone').click(function (){
		opacityShow($('#unbindingphone'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#unbindingphone').hide(0);
			unbindStep1ClearPhone();
		}
	});
		// 解绑step1 提交
	function unbindStep2ShowPhone(){
		window.scrollTo(0,0);
		function fn3(){
			$('#unbindingphone').hide(0);
			unbindStep1Clear();
		}
		opacityShow($('#unbindingphone'),0,400,fn3);
		$('#unbinding-phones').show(0);
		$('#unbinding-phones').css('opacity',0);
		opacityShow($('#unbinding-phones'),100,400);
	}
	$('#ubstep1submitphone').click(function (){
		// ajax请求成功
		unbindStep2ShowPhone();
	});
	$('#closebtn2phone').click(function (){
		opacityShow($('#unbinding-phones'),0,400,fn);
		opacityShow($('#lshadow'),0,300,shadowH);
		function fn(){
			$('#unbinding-phones').hide(0);
		}
	});






	//************************绑定手机弹框提示end*************************************/










	//************************管理控制台-最新动态内容切换start*************************************/
	function colorFn(elem){
		$('#lpagenav').find('a').addClass('lnavh3acolor');
		elem.removeClass('lnavh3acolor');
	}
	// 点击最新动态--显示最近动态
	$('#news').click(function (){
		$('#lpage-content').children().hide(0);
		$('#lpage-content').children().eq(0).show(0);
		var _this = $(this);
		colorFn(_this);
	});

	function appendHtml(elem,elems){
			var htm = elem.children();
			for(var i = 0; i<htm.length;i++){
				var inn = htm.eq(i).find('.bagname')[0];
				if(inn){
					var inn2 = elems.find('.bagname')[0].innerHTML;
					if(inn.innerHTML == inn2 ){
						return;
					}
				}
			}
			elem.append(elems);
			widthFn();
	}
	function widthFn(){
		var num = $('#lpagenav').children().size();
		var widthI = $('#lpagenav').width()-113;
		var widthO = Math.floor((widthI-(num*41))/num);
		if(widthO>= 72){
			widthO = 72;
		}
		for(var i = 1; i<num;i++){
			$('#lpagenav').children().eq(i).find('a').css('width',widthO);
		}
		return Number(widthO);
	}
	function addTab(clickElem,showParent){
		clickElem.unbind('click').bind('click',function (){
			var str = $(this).attr('tagname');
			if(!str)return;
			var strNum = parseInt($(this).attr('tagnum'));
			var btni = $('#lpagenav').find('a').eq(strNum);
			var s = $('<h3 class="lnavh3aactive lnavh3"><a class="bagname" href="javascript:;">'+str+'</a><span  class="lfalseico lgban"></span></h3>');
			appendHtml($('#lpagenav'),s);
			showParent.children().hide(0);
			showParent.children().eq(strNum).show(0);
			var closedbtn = s.find('.lgban');
			var btn = s.find('.bagname');
			colorFn(btn);
			btni.removeClass('lnavh3acolor')
			closedbtn.unbind('click').bind('click',function (){
				var elemp = $(this).parent();
				elemp.remove();
				showParent.children().eq(strNum).hide(0);
				showParent.children().eq(0).show(0);
				colorFn($('#news'));
			});
			btn.unbind('click').bind('click',function (){
				showParent.children().hide(0);
				showParent.children().eq(strNum).show(0);
				var t = $(this);
				colorFn(t);
			});
		});
	}
	addTab($('#account01'),$('#lpage-content'));
	addTab($('#account02'),$('#lpage-content'));
	//************************管理控制台-最新动态内容切换end*************************************/
	
	// *************************选择框，复选框和单选框start**********************************************/
	function checkedFn(id){
		id.unbind("click").click(function (){
			var clickelem = id.parent().children();
			for(var i = 0; i< clickelem.size(); i++ ){
				if(clickelem.eq(i)[0].className == 'lcheckb'&&id[0].checked == true ){
					clickelem.eq(i).css('backgroundPosition','-26px 0');
				}else if(clickelem.eq(i)[0].className == 'lcheckb'&&id[0].checked == false ){
					clickelem.eq(i).css('backgroundPosition','0 0');
				}
			}
		})
	}
	function radioFn(id){
		id.unbind("click").click(function (){
			var radios = id.parent().parent().find('*');
			var showRadio;
			clearRadio();
			for(var i = 0; i<radios.size();i++){
				if(radios.eq(i).attr('type') == 'radio'){
					if(radios.eq(i).attr('checked') == 'checked'){
						showRadio = id.next().next();
						if(showRadio){
							showRadio[0].style.backgroundPosition = '-26px 0';
						}
					}
					
				}
			}
			
		});
		function clearRadio(){
			var elems = $('.lgenderlist').eq(0).find('*');
			for(var s = 0; s< elems.size(); s++){
				if(elems.eq(s)[0].className == 'lcheckb'){
					elems.eq(s)[0].style.backgroundPosition = '0 0';
				}
			}
		}
	}
	checkedFn($('#wr'));
	checkedFn($('#cg'));
	checkedFn($('#hp'));
	checkedFn($('#lc'));
	checkedFn($('#nx'));
	checkedFn($('#wx'));
	checkedFn($('#kl'));
	checkedFn($('#hs'));
	checkedFn($('#cm'));
	checkedFn($('#jz'));
	checkedFn($('#wz'));
	checkedFn($('#xx'));
	checkedFn($('#xz'));
	checkedFn($('#bj'));
	checkedFn($('#xgzt'));
	checkedFn($('#sc'));
	radioFn($('#man'));
	radioFn($('#woman'));
	radioFn($('#baomi'));
	// 当需要加载的时候某项需要被选中的时候,idelem为需要被选中的复选框的id


	function checkedFn2(idelem){
		idelem.attr('checked',true);
		idelem.trigger('click');
	}


	function selectFn(idelem){
		var returnval;
		var onoff = 0;
		idelem.hide(0);
		selectName = idelem.attr('name');
		idelem=idelem.parent();
		idelem.unbind("click").click(function (ev) {
			offAllList();
			var list = $(this).find('.lselectlist').eq(0);
			list.show(0);
			var elem = list.children();
			var elemHtml = $(this).find('.lselectshow');
			var inputVal = $(this).find('.linputval');
			if(selectName)inputVal.attr('name',selectName);
			addclick(elem,inputVal,elemHtml);
			if(onoff){
				list.hide(0);
				onoff = 0;
			}
			ev.originalEvent.cancelBubble = true;
		});
		function addclick(elem,inputVal,elemHtml){
			
			for(var i = 0; i < elem.size();i++){
				elem.unbind('click').click(function (ev){
					var _this = $(this);
					inputVal.val(add0(_this.val()));
					elemHtml.html(_this.html());
					onoff = 1;
					returnval = _this.val()+'&'+_this.html();
				});
			}
		}
		$(document).unbind('click').click(function (){
			offAllList();
		});
		function offAllList(){
			for(var i=0; i< $('.lselectlist').size(); i++){
				$('.lselectlist').eq(i).hide(0);
			}
		}
		return returnval;
	}
	function add0(el){
		return el = el<10?'0'+el:el;
	}	
		

	selectFn($('#shape'));
	selectFn($('#loveMarriage')); 
	selectFn($('#personalhabits1'));
	selectFn($('#personalhabits2'));
	selectFn($('#personalhabits3'));
	selectFn($('#educationLevel'));
	selectFn($('#currentempm'));
	selectFn($('#year'));
	selectFn($('#month'));
	selectFn($('#bloodtype'));
	selectFn($('#birthadress1'));
	selectFn($('#birthadress2'));

	selectFn($('#liveaddress1'));
	selectFn($('#liveaddress2'));

	selectFn($('#normalmanager'));
	// 当需要加载的时候某项需要被选中的时候,id为select的id,html为需要被显示的值,val为选择框的value值
	function selected(id,val,html){
		var inputVal = id.parent().find('.linputval');
		var elemHtml = id.parent().find('.lselectshow');
		inputVal.val(val);
		elemHtml.html(html);
	}
	// *************************选择框，复选框和单选框 end**********************************************/
	// 基本资料出生地址，居住地址
	function appendCity(elem){
		var str = '';
		for(var i = 0 ; i < cityArr.length; i++){
			str+='<li value="'+cityArr[i].cityCode+'">'+cityArr[i].cityName+'</li>'
		}
		elem.html(str);
	}
	appendCity($('#liveaddress1list'));
	appendCity($('#birthadress1list'));
	$('#birthadress1list').children().bind('mouseup',function (){
		var str = '';
		var valNum = $(this).attr('value')-1;
		for(var s=0; s< cityArr[valNum].city[0].length;s++){
			str+='<li value="'+cityArr[valNum].city[0][s]+'">'+cityArr[valNum].city[1][s]+'</li>';
		}
		$('#birthadress2list').html(str);
		selected($('#birthadress2'),valNum,cityArr[valNum].city[1][0]);
	});
	$('#liveaddress1list').children().bind('mouseup',function (){
		var str = '';
		var valNum = $(this).attr('value')-1;
		for(var s=0; s< cityArr[valNum].city[0].length;s++){
			str+='<li value="'+cityArr[valNum].city[0][s]+'">'+cityArr[valNum].city[1][s]+'</li>';
		}
		$('#liveaddress2list').html(str);
		selected($('#liveaddress2'),valNum,cityArr[valNum].city[1][0]);
	});
	function appendmounth(el){
		var str = '';
		for(var i = 0; i< 12; i++){
			str+='<li value="'+(i+1)+'">'+(i+1)+'月</li>';
		}
		
		el.html(str);
	}
	$('#yearlist').children().bind('mouseup',function (){
		appendmounth($('#monthlist'));
		selected($('#month'),'01','1月');
	});


	// 出生地、居住地为在反显的时候调用的方法,id 为出生地或者居住地第一个select下拉框的id，val为后台保存他输入第值的值

	function citySelected(id,val){
		var inputVal = id.parent().find('.linputval');
		var elemHtml = id.parent().find('.lselectshow');
		var inputVal2 = id.parent().next().find('.linputval');
		var elemHtml2 = id.parent().next().find('.lselectshow');
		var cle = id.parent().next().find('.lselectlist');
		var citys = val.substring(0,2)-1;
		var citys2 = val.substring(5,7)-1;
		var strn = '';
		if(!isNaN(citys)){
			for(var s1 = 0;s1<cityArr.length;s1++){
				if(s1 == citys){
					inputVal.val(s1);
					elemHtml.html(cityArr[s1].cityName);
					break;
				}
			}
		}
		if(!isNaN(citys2)){
			for(var s2 = 0; s2<cityArr[citys2].city[1].length; s2++){
				if(s2 == citys2){
					inputVal2.val(s2);
					elemHtml2.html(cityArr[citys2].city[1][s2]);
				}
				strn+='<li value="'+cityArr[citys2].city[0][s2]+'">'+cityArr[citys2].city[1][s2]+'</li>';;
			}
			cle.html(strn);
		}
	}
	
	// citySelected($('#birthadress1'),st)
});
// 将城市的数字解析为具体城市名称
var cityArr = [
	{
		'cityName':'北京',
		'cityCode':'01',
		'city':[
			['0101','0102','0103','0104','0105','0106','0107','0108','0109','0110','0111','0112','0113','0114','0115','0116'],
			['东城区', '西城区', '海淀区', '朝阳区', '丰台区', '石景山区', '通州区', '顺义区','房山区', '大兴区', '昌平区', '怀柔区', '平谷区', '门头沟区', '延庆县', '密云县']			
		]
	},
	{
		'cityName':'深圳',
		'cityCode':'02',
		'city':[
			['0201','0202','0203','0204','0205','0206'],
			['罗湖','福田','南山','盐田','宝安','龙岗']			
		]
	},
	{
		'cityName':'上海',
		'cityCode':'03',
		'city':[
			['0301','0302','0303','0304','0305','0306','0307','0308','0309','0310','0311','0312','0313','0314','0315','0316','0317','0318','0319','0320'],
			['宝山','金山','南市','长宁','静安','青浦','崇明','卢湾','松江','奉贤','浦东','杨浦','虹口','普陀','闸北','黄浦','闵行','徐汇','嘉定','南汇']			
		]
	},
	{
		'cityName':'重庆',
		'cityCode':'04',
		'city':[
			['0401','0402','0403','0404','0405','0406'],
			['渝中','江北','沙坪坝','南岸','九龙坡','大渡口']			
		]
	},
	{
		'cityName':'天津',
		'cityCode':'05',
		'city':[
			['0501','0502','0503','0504','0505','0506','0507','0508','0509','0510','0511','0512','0513','0514','0515'],
			['和平','河北','河西','河东','南开','红桥','塘沽','汉沽','大港','东丽','西青','津南','北辰','武清','滨海']			
		]
	},
	{
		'cityName':'广东',
		'cityCode':'06',
		'city':[
			['0601','0602','0603','0604','0605','0606','0607','0608','0609','0610','0611','0612','0613','0614','0615'],
			['广州','珠海','中山','佛山','东莞','清远','肇庆','阳江','湛江','韶关','惠州','河源','汕尾','汕头','梅州']			
		]
	},
	{
		'cityName':'河北',
		'cityCode':'07',
		'city':[
			['0701','0702','0703','0704','0705','0706','0707','0708','0709','0710','0711'],
			['石家庄','唐山','秦皇岛','邯郸','邢台','张家口','承德','廊坊','沧州','保定','衡水']			
		]
	},
	{
		'cityName':'山西',
		'cityCode':'08',
		'city':[
			['0801','0802','0803','0804','0805','0806','0807'],
			['太原','大同','阳泉','朔州','长治','临汾','晋城']			
		]
	},
	{
		'cityName':'内蒙古',
		'cityCode':'09',
		'city':[
			['0901','0902','0903','0904','0905','0906','0907','0908','0909','0910','0911'],
			['呼和浩特','包头','乌海','临河','东胜','集宁','锡林浩特','通辽','赤峰','海拉尔','乌兰浩特']			
		]
	},
	{
		'cityName':'辽宁',
		'cityCode':'10',
		'city':[
			['1001','1002','1003','1004','1005','1006','1007','1008','1009','1010','1011','1012','1013','1014'],
			['沈阳','大连','鞍山','锦州','丹东','盘锦','铁岭','抚顺','营口','辽阳','阜新','本溪','朝阳','葫芦岛']			
		]
	},
	{
		'cityName':'吉林',
		'cityCode':'11',
		'city':[
			['1101','1102','1103','1104','1105','1106','1107','1108','1109'],
			['长春','吉林','四平','辽源','通化','白山','松原','白城','延边']			
		]
	},
	{
		'cityName':'黑龙江',
		'cityCode':'12',
		'city':[
			['1201','1202','1203','1204','1205','1206','1207','1208','1209','1210','1211','1212','1213'],
			['哈尔滨','齐齐哈尔','牡丹江','佳木斯','大庆','伊春','黑河','鸡西','鹤岗','双鸭山','七台河','绥化','大兴安岭']			
		]
	},
	{
		'cityName':'江苏',
		'cityCode':'13',
		'city':[
			['1301','1302','1303','1304','1305','1306','1307','1308','1309','1310','1311','1312','1313'],
			['南京','苏州','无锡','常州','镇江','连云港 ','扬州','徐州 ','南通','盐城','淮阴','泰州','宿迁']			
		]
	},
	{
		'cityName':'浙江',
		'cityCode':'14',
		'city':[
			['1401','1402','1403','1404','1405','1406','1407','1408','1409','1410','1411'],
			['杭州','湖州','丽水','温州','绍兴','舟山','嘉兴','金华','台州','衢州','宁波']			
		]
	},
	{
		'cityName':'安徽',
		'cityCode':'15',
		'city':[
			['1501','1502','1503','1504','1505','1506','1507','1508','1509','1510','1511','1512','1513','1514','1515','1516','1517'],
			['合肥  ','芜湖 ','蚌埠 ','滁州 ','安庆 ','六安 ','黄山 ','宣城 ','淮南 ','宿州 ','马鞍山 ','铜陵','淮北 ','阜阳 ','池州 ','巢湖 ','亳州']			
		]
	},
	{
		'cityName':'福建',
		'cityCode':'16',
		'city':[
			['1601','1602','1603','1604','1605','1606','1607','1608','1609'],
			['福州 ','厦门 ','泉州 ','漳州 ','龙岩 ','南平 ','宁德 ','莆田 ','三明']			
		]
	},
	{
		'cityName':'江西',
		'cityCode':'17',
		'city':[
			['1701','1702','1703','1704','1705','1706','1707','1708','1709','1710','1711'],
			['南昌','景德镇','九江','萍乡','新余','鹰潭','赣州','宜春','吉安','上饶','抚州']			
		]
	},
	{
		'cityName':'山东',
		'cityCode':'18',
		'city':[
			['1801','1802','1803','1804','1805','1806','1807','1808','1809','1810','1811','1812','1813','1814','1815','1816','1817'],
			['济南','青岛','淄博','德州','烟台','潍坊','济宁','泰安','临沂','菏泽','威海','枣庄','日照','莱芜','聊城','滨州','东营']			
		]
	},
	{
		'cityName':'河南',
		'cityCode':'19',
		'city':[
			['1901','1902','1903','1904','1905','1906','1907','1908','1909','1910','1911','1912','1913','1914','1915','1916','1917','1918'],
			['郑州','开封','洛阳','平顶山','安阳','鹤壁','新乡','焦作','濮阳','许昌','漯河','三门峡','南阳','商丘','周口','驻马店','信阳','济源']			
		]
	},
	{
		'cityName':'湖北',
		'cityCode':'20',
		'city':[
			['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'],
			['武汉','黄石','十堰','荆州','宜昌','襄樊','鄂州','荆门','孝感','黄冈','咸宁','恩施','随州','仙桃','天门','潜江','神农架']			
		]
	},
	{
		'cityName':'湖南',
		'cityCode':'21',
		'city':[
			['2101','2102','2103','2104','2105','2106','2107','2108','2109','2110','2111','2112','2113'],
			['长沙','株州','湘潭','衡阳','邵阳','岳阳','常德','郴州','益阳','永州','怀化','娄底','湘西 ']			
		]
	},
	{
		'cityName':'广西',
		'cityCode':'22',
		'city':[
			['2201','2202','2203','2204','2205','2206','2207','2208','2209','2210','2211','2212'],
			['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','贺州','百色','河池']			
		]
	},
	{
		'cityName':'海南',
		'cityCode':'23',
		'city':[
			['2301','2302','2303','2304','2305','2306','2307','2308','2309'],
			['海口 ','三亚','通什','琼海','琼山','文昌','万宁','东方','儋州']			
		]
	},
	{
		'cityName':'四川',
		'cityCode':'24',
		'city':[
			['2401','2402','2403','2404','2405','2406','2407','2408','2409','2410','2411','2412','2413','2414','2415','2416','2417','2418','2419','2420'],
			['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充  ','宜宾','广安','达川','巴中','雅安','眉山  ','阿坝 ','甘孜 ','凉山 ']			
		]
	},
	{
		'cityName':'贵州',
		'cityCode':'25',
		'city':[
			['2501','2502','2503','2504','2505','2506','2507','2508','2509'],
			['贵阳 ','六盘水','遵义','铜仁','毕节','安顺','黔西南 ','黔东南','黔南']			
		]
	},
	{
		'cityName':'云南',
		'cityCode':'26',
		'city':[
			['2601','2602','2603','2604','2605','2606','2607','2608','2609','2610','2611','2612','2613','2614','2615','2616','2617'],
			['昆明','东川','曲靖','玉溪','昭通','思茅','临沧','保山','丽江','文山 ','红河 ','西双版纳 ','楚雄 ','大理 ','德宏 ','怒江','迪庆']			
		]
	},
	{
		'cityName':'西藏',
		'cityCode':'27',
		'city':[
			['2701','2702','2703','2704','2705','2706','2707'],
			['拉萨','那曲','昌都','山南','日喀则','阿里','林芝']			
		]
	},
	{
		'cityName':'陕西',
		'cityCode':'28',
		'city':[
			['2801','2802','2803','2804','2805','2806','2807','2808','2809','2810'],
			['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','商洛','安康']			
		]
	},
	{
		'cityName':'甘肃',
		'cityCode':'29',
		'city':[
			['2901','2902','2903','2904','2905','2906','2907','2908','2909','2910','2911','2912','2913','2914'],
			['兰州','金昌','白银','天水','嘉峪关','定西','平凉','庆阳','陇南','武威','张掖','酒泉','甘南 ','临夏']			
		]
	},
	{
		'cityName':'青海',
		'cityCode':'30',
		'city':[
			['3001','3002','3003','3004','3005','3006','3007','3008'],
			['西宁','海东',' 海北 ','黄南','海南','果洛','玉树','海西']			
		]
	},
	{
		'cityName':'宁夏',
		'cityCode':'31',
		'city':[
			['3101','3102','3103','3104'],
			['银川','石嘴山','银南','固原']			
		]
	},
	{
		'cityName':'新疆',
		'cityCode':'32',
		'city':[
			['3201','3202','3203','3204','3205','3206','3207','3208','3209','3210','3211','3212','3213'],
			['乌鲁木齐','克拉玛依','石河子','吐鲁番','哈密','和田','阿克苏','喀什','克孜勒苏','巴音郭楞','昌吉','博尔塔拉','伊犁']			
		]
	},
	{
		'cityName':'香港',
		'cityCode':'33',
		'city':[
			[],
			[]			
		]
	},
	{
		'cityName':'澳门',
		'cityCode':'34',
		'city':[
			[],
			[]			
		]
	},
	{
		'cityName':'台湾',
		'cityCode':'35',
		'city':[
			[],
			[]			
		]
	}	
];


