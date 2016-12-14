$(function (){
    var now =0;
    var wi = 1000;
    var timer = 0;
    var onoff = true;
    var arrSrc = ['../images/web-index-ico/lunbo1.png','../images/web-index-ico/lunbo2.png','../images/web-index-ico/lunbo3.png'];
    var as = $('.llittle-nav').children('a');
        // 遮罩层
    $(window).bind('scroll resize',function (){
        $('.lshade').css('top',$(document).scrollTop());
        $('.lshade')[0].style.width = $(window).width()+'px';
        $('.lshade')[0].style.height = $(window).width()+'px';
        if($(window).width() >= 1000){
            $('#llunbo1 li').css('width',$(window).width());
            $('#llunbo1').css('width',$(window).width());
            $('.lheader').css('width',$(window).width())
            wi = $(window).width();
            $('header').css('width',wi);
            $('footer').css('width',wi);
        }else {
            $('.llunbo1').css('width',1000);
            $('#llunbo1').css('width',1000);
            $('#llunbo1 li').css('width',1000);
             $('.lheader').css('width',1000);
             wi = 1000;
            $('header').css('width',wi);
            $('footer').css('width',wi);
        }
    });
	/*****************轮播图S**************/

	as.click(function (){
            // index == 0;
			if($(this).index() > now){
				$('.llunbo-wrap').css('left',-wi);
				$('#llp').attr('src',arrSrc[$(this).index()]);
				$('#lrp').attr('src',arrSrc[now]);
				$('.llunbo-wrap').animate({
					"left": 0},800);
			}else if($(this).index() < now){
				$('.llunbo-wrap').css('left',0);
				$('#llp').attr('src',arrSrc[now]);
                $(window).trigger('resize');
                console.log(wi)
				$('#lrp').attr('src',arrSrc[$(this).index()]);
				$('.llunbo-wrap').animate({"left":-wi},800);
			}
			$(this).siblings().css('backgroundColor','transparent');
			$(this).css("backgroundColor","#fff")
			now = $(this).index();
	});
	/**************鼠标移入轮播区域停止自动播放动画*******************/ 
	$('#llunbo2')[0].onmouseover = function (){
		clearInterval(timer);
	}
	$('#llunbo2')[0].onmouseout = function (){
		autolunbo();
	}
	/**************鼠标移入轮播区域停止自动播放动画*******************/
	autolunbo();
	function autolunbo(){
		timer = setInterval(
			function (){
			var next = now +1;
			if(next >= arrSrc.length){
				next = 0;
			};
			
			$('#llp').attr('src',arrSrc[next]);
			$('#lrp').attr('src',arrSrc[now]);
			$('.llunbo-wrap').css('left',-wi);
			$('.llunbo-wrap').animate({
						"left": 0},800);
			as.siblings().css('backgroundColor','transparent');
			as.eq(next).css("backgroundColor","#fff")
			now = next;
		}, 5000);
	}
	/*****************轮播图E**************/



	// 登录模块
	$('#laccoun').bind('blur', function () {
        $(this).css('color', '#323230');
        var v = $('#laccoun').val();
        if (v != '') {
            /**************匹配了常用手机号和qq\163等邮箱，如过不行再更正******************/
            var oPhone = /^1[34578]\d{9}$/.test(v);
            var oEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g.test(v);
            if (oPhone || oEmail) {
                $('#ltipzh').hide(0);
            } else {

                $('#ltipzh').show(0);
            }
        } else {
            $('#ltipzh').hide(0);
            return
        }
    });
    $('#laccoun').bind('focus', function () {
        $(this).css('color', '#323230');
    });


    /******************密码验证*******************/

    $('#lpassword').bind('keyup', function () {
        $(this).css('color', '#323230');
       checkLoadpaddword();
    });
    function checkLoadpaddword(){
         var v = $('#lpassword').val();
        if (v != '') {
            /**************匹配饿了6-20为数字字母下滑线，不包括空格特殊符号等******************/
            // var onoff = /^\w{6,20}$/g.test(v);
            var onoff = v.length;
            if (onoff>=6 && onoff<=18) {
                $('#ltipmm').hide(0);
                return true;
            } else {
                
                $('#ltipmm').show(0);
                return false;
            }

        } else {
            $('#ltipmm').hide(0);
            return 
        }
    }

    /*****************登陆******************/

 

    // 首页点击登陆弹出登录框
    $('#ldlzc-dlbtn').click(function (){

            $('#ldltc-box').show(0);
            $('.lshade').show(0);

        // 点击记录密码后就执行这个函数
        autoLogn();
            
    });
    //首页点击注册弹出注册窗口
    $('#ldlzc-zcbtn').click(function (){
        $('.lshade').show(0);
        $('#ldlzc-zcform').show(0);
    });
    // 已有账号点击登陆弹出登录窗口
    $('#lyyzh-dlbtn1').click(function (){
        $('#ldlzc-zcform').hide(0);
        $('#ldlzc-dlbtn').trigger('click');
    });
    $('#lyyzh-dlbtn2').click(function (){
        $('#ldlzc-zcform').hide(0);
        $('#ldlzc-dlbtn').trigger('click');
    });
    // 在登陆窗口点击注册按钮
    $('#ldlform-zcbtn').click(function (){
        $('#ldltc-box').hide(0);
        $('#ldlzc-zcbtn').trigger('click');
    });
    // 在登陆窗口点击忘记密码弹出忘记密码
    $('#ldlform-wjmmbtn').click(function (){
        $('#ldltc-box').hide(0);
        $('#lwjmm-onoff').show(0);
    });






     // 获取图形验证码
    $('#jimg').click(function (){
        reloadcode();
    });
   
    //定义全局变量，累加密码错误次数
    var erro=0;
    $('#lloading').click(function () {
        var formData = $("#formdate").serialize();
        // console.log(formData)
        $.ajax({
            url: "/EmindStoreManager/userAction/login",
            type: "post",
            data: formData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend:function (){
                if(erro>=3&&$('#jinput').val()== ''){
                    alert('输入验证码后登陆');
                     $('#jimg').trigger('click');
                    return false;
                }
                
            },
            success: function (data) {
                    // console.log(erro)
                    var odata = JSON.parse(data);
                    if (odata.success) {
                        erro = 0;
                        $('#jinput').attr('name','');
                        sessionStorage.setItem("name", odata.account);
                        sessionStorage.setItem("usertype", odata.usertype);
                        sessionStorage.setItem("userId", odata.userId);
                        sessionStorage.setItem("state", odata.state);
                        sessionStorage.setItem("isstorePwd", $("#isRemberPwdId").checked = true);
                        // window.sessionStorage.setItem('isSign',true);
                        $('#ldltc-box').hide(0);
                        $('#lsuccess-tsxx').html("登陆成功！");
                        $('#lsuccess-tsxx2').html("登陆成功！");
                        $('.lsuccess').show(0);
                        setTimeout(function () {
                            $('.lshade').hide(0);
                            $('.lsuccess').hide(0);

                        }, 1000);
                        if (odata.usertype == 'm') {
                            setTimeout(function () {
                                window.open("shenheguanli.html", "_self");
                            }, 1000);
                        } else if (odata.usertype == 'cp' || odata.usertype == 'pp') {
                            setTimeout(function () {
                                window.open("ManagementCenter.html", "_self");
                            }, 1000);
                        } else if (odata.usertype == 'u') {
                            setTimeout(function () {
                                window.open("selecttype.html", "_self");
                            }, 1000);

                        } else {
                            // 等路后不跳转自动刷新
                            window.location.reload();
                        }

                    } else {
                        $('#jimg').trigger('click');
                        erro++;
                        if(odata.errMsg =='验证码错误'){
                            $('#lvcodesn').html('验证码错误');
                            $('#lvcodesn').show(0);
                            setTimeout(function (){
                                $('#lvcodesn').hide(0);
                            }, 5000);
                        }else if(odata.errMsg =='登录失败，用户名不存在'){
                             $('#ltipzh').html(odata.errMsg);
                            $('#ltipzh').show(0);
                            setTimeout(function () {
                                $('#ltipzh').html("输入的格式不正确");
                                $('#ltipzh').hide(0);
                            }, 5000);

                        }else if(odata.errMsg =='登录失败，密码错误'){
                            $('#ltipmm').html('登录失败，密码错误');
                            $('#ltipmm').show(0);
                            setTimeout(function (){
                                 $('#ltipmm').html('请输入6-18位密码');
                                $('#ltipmm').hide(0);
                            }, 5000);
                        }else {
                            $('#ltipzh').show(0);
                            $('#ltipzh').html(odata.errMsg);
                            setTimeout(function () {
                                $('#ltipzh').html("输入的格式不正确");
                                $('#ltipzh').hide(0);
                            }, 5000);
                        }
                        if(erro>=3){
                            $('.jyanzm').show(0);
                            // name="vcode"
                            $('#jinput').attr('name','vcode');
                        }
                    }
                
            },
            error: function (ad) {
               $('#jimg').trigger('click');
            }

        });

    });
    $(document).bind('keyup', function (ev) {
        if (ev.which == 13) {
            $('#lloading').trigger('click');
        }
    });
    function autoLogn(onoff){
        // 登陆的时候是否记录密码
        $('#laccoun').focus();
        //当有保存用户名密码时直接调用登录
        //auto login, use cookie
        //不是手动退出，上次登录未失败，自动登录
        var u = Cookie.get('eminduser');
        var p = Cookie.get('emindpass');
        u=u.replace("\"", "");
        p=p.replace("\"", "");
        
        
        if(p != '' && u != '' ){
            $('#laccoun').val(u);
            $('#lpassword').val(p);
            document.getElementById("rememberPW").checked = true;
            
        }
        
        $('#username').keypress(function(e){
            if(e.which == 13){
                if($('#rememberPW')[0].checked){
                    $('#rememberPW').val('1');
                }else {
                    $('#rememberPW').val('0');
                }
               $('#lloading').trigger('click');

            }
        });
        
        $('#password').keypress(function(e){        
            if(e.which == 13){
                if($('#rememberPW')[0].checked){
                    $('#rememberPW').val('1');
                }else {
                    $('#rememberPW').val('0');
                }
               $('#lloading').trigger('click');
            }
        });

    }









	// 密码强度
	/** 强度规则
 + ------------------------------------------------------- +
 1) 任何少于6个字符的组合，弱；任何字符数的同类字符组合，弱；
 2) 任何字符数的两类字符组合，中；
 3) 20位字符数以下的三类或四类字符组合，强；
 + ------------------------------------------------------- +
 **/
	var oTips = document.getElementById("tipss");
    var oInput = document.getElementById("lmm");
    var oInput2 = document.getElementById("lemil-mm");
    var aSpan = oTips.getElementsByTagName("span");
    var aStr = ["弱", "中", "强"];
    var i = 0;

    oInput2.onkeup=oInput2.onblur=oInput2.onfocus = oInput.onkeyup = oInput.onfocus = oInput.onblur = function () {
        var index = checkStrong(this.value);
        if(index == 1){
            $('.lcolor1').css('backgroundColor','#ff3100');
            $('.lcolor2').css('backgroundColor','#cdcdcd');
            $('.lcolor3').css('backgroundColor','#cdcdcd');
            $('.lqdti-r').show(0);
            $('.lqdti-z').hide(0);
            $('.lqdti-q').hide(0);
        }else if(index ==2){
             $('.lcolor1').css('backgroundColor','#f8ce00');
             $('.lcolor2').css('backgroundColor','#f8ce00');
             $('.lcolor3').css('backgroundColor','#cdcdcd');
             $('.lqdti-z').show(0);
            $('.lqdti-r').hide(0);
            $('.lqdti-q').hide(0);
         }else if(index == 3){
            $('.lcolor1').css('backgroundColor','#2cae10');
            $('.lcolor2').css('backgroundColor','#2cae10');
            $('.lcolor3').css('backgroundColor','#2cae10');
            $('.lqdti-q').show(0);
            $('.lqdti-z').hide(0);
            $('.lqdti-r').hide(0);
         }else if(index == 0){
            $('.lcolor1').css('backgroundColor','#cdcdcd');
            $('.lcolor2').css('backgroundColor','#cdcdcd');
            $('.lcolor3').css('backgroundColor','#cdcdcd');
            $('.lqdti-q').hide(0);
            $('.lqdti-z').hide(0);
            $('.lqdti-r').hide(0);
         }
    }


    // 手机注册和邮箱注册



  
     var mc;
    // 手机提交
    var phoneRegisterOnoff = true;
    $('#lpho-submit').bind('click', function () {
        if(!phoneRegisterOnoff){
            return;
        }
        phoneRegisterOnoff = false;
        var formData = $("#formdate-pho").serialize()+addString;
        $.ajax({
            url: interface_uri + "/EmindStoreManager/userAction/add",
            type: "post",
            data:formData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend: function () {
                // ajax请求前调用，常用来做验证处理
                if ($("#lsjyx").val() == "") {
                    phoneRegisterOnoff = true;
                    alert('用户名不能为空');
                    // 终止请求发出
                    return false;
                }
                if(!checkRegistrationPass()||!surePassPhone()){
                    phoneRegisterOnoff = true;
                    alert('密码输入错误')
                    return false;
                }
                if ($("#lqrmm").val() != $("#lmm").val()) {
                    phoneRegisterOnoff = true;
                   alert('密码不一致')
                    return false;
                }
                if(!$('#lyhxy')[0].checked){
                    phoneRegisterOnoff = true;
                    alert('阅读并同意条款');
                    return false;
                }
                // 忽略了其它的验证，自行完成
                // 验证通过了后处理
                //_this.val("正在提交...");
                // if (mc != $("#input1").val()) {
                //     // alert(mc+":"+$("#input1").val());
                //     phoneRegisterOnoff = true;
                //     $("#input1").attr('placeholder','输入的验证码有误');
                //     alert('输入的验证码有误');
                //     $('#lvcodes').show(0);
                //     setTimeout(function (){
                //          $("#input1").val('');
                //          $('#lvcodes').hide(0);
                //     }, 1000);
                //     return false;
                // }

            },
            success: function (data) {
                   phoneRegisterOnoff = true;
                    var ret = JSON.parse(data);
                    if(ret.success){
                        $('#ldlzc-zcform').hide(0);
                         $('#lsuccess-tsxx').html("注册成功！");
                        $('#lsuccess-tsxx2').html("注册成功！");
                        $('.lsuccess').show(0);
                        setTimeout(function () {
                            $('.lshade').hide(0);
                            $('.lsuccess').hide(0);
                            window.open('index.html','_self');
                        }, 1000);
                    }else {
                         alert(ret.errMsg);
                        logintimeout(ret);
                    }
                
            },
            error: function (errMsg) {
                alert(errMsg);
            }

        });
    });

    // 邮箱提交
    var emailRegisterOnoff = true;
    $('#lemi-submit').bind('click', function () {
        if(!emailRegisterOnoff){
            return;
        }
        emailRegisterOnoff = false;
        var formData = $("#formdate-emi").serialize()+addString;
        //console.log(formData);
        $.ajax({
            url: interface_uri + "/EmindStoreManager/userAction/addByEmail2",
            type: "post",
            data:formData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend: function () {
                // ajax请求前调用，常用来做验证处理
                if ($("#lemail").val() == "") {
                    emailRegisterOnoff = true;
                    alert("用户名不能为空");
                    // 终止请求发出
                    return false;
                }
                if(!mailboxRegister()||!surePassEmail()){
                    emailRegisterOnoff = true;
                    alert('密码输入错误');
                    return false;
                }
                if(!$('#lyhxy')[0].checked){
                    emailRegisterOnoff = true;
                    alert('阅读并同意条款');
                    return false;
                }
                // 忽略了其它的验证，自行完成
                // 验证通过了后处理
            },
            success: function (data) {
                emailRegisterOnoff = true;
                var ret = JSON.parse(data);
                if(ret.success){
                    $('#ldlzc-zcform').hide(0);
                    $('#lsuccess-tsxx').html("注册成功！");
                    $('#lsuccess-tsxx2').html("注册成功！");
                    $('.lsuccess').show(0);
                    setTimeout(function () {
                        $('.lshade').hide(0);
                        $('.lsuccess').hide(0);
                        window.open('index.html','_self');
                    }, 1000);
                }else {
                    alert(ret.errMsg);
                    logintimeout(ret);
                }

            },
            error: function (errMsg) {
                alert(errMsg);
            }

        });
    });

	//发送验证码

 
    $('#jimg').trigger('click');
    // 手机注册发送验证码
    var onoff = true;
    $("#checkCode1").bind("click", function () {
        if(!onoff){
            return;
        }
        onoff = false;
        var _this = $(this);
        var mobile = $(".phone").val();
        $.ajax({
            url: interface_uri + "/EmindStoreManager/userAction/sendMessage",
            type: "post",
            data: {phone: mobile},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            //jsonp: 'callback',
            beforeSend: function () {
                var regMobile = /1\d{10}/;
                // 验证
                if (!regMobile.test(mobile)) {
                    $(".tips p")
                        .text("手机号码不正确")
                        .fadeIn(500)
                        .delay(1500)
                        .fadeOut(500);
                    // 终止请求

                    return false;
                }
                var seconds = 60;
                var t = setInterval(function () {
                    if (seconds <= 1) {
                        clearInterval(t);
                       onoff = true;
                        $('#input1')[0].placeholder="请输入验证码";
                        return;
                    }
                    $('#input1')[0].placeholder=''+(--seconds) + '秒后再次获取';
                }, 1000);

            },
            success: function (data) {
                var ret = JSON.parse(data);
                if(ret.success){
                    // mc = ret.uicode;
                    alert('验证码已发送，请查收');
                }else {
                    alert(ret.errMsg);
                    logintimeout(ret);
                }
                
            },
            error: function (errMsg) {
                alert(errMsg);
            }
        });
    });
    // //  邮箱注册发送验证码
    $("#checkCode2").bind("click", function () {
        if(!onoff){
            return;
        }
        
        onoff = false;
        var _this = $(this);
        var lemail = $("#lemail").val();
        $.ajax({
            url: interface_uri + "/EmindStoreManager/userAction/sendEmailMessage",
            type: "post",
            data: {email: lemail},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend: function () {
                var seconds = 60;
                var t = setInterval(function () {
                    if (seconds <= 1) {
                        clearInterval(t);
                       onoff = true;
                        $('#lem-input')[0].placeholder="请输入验证码";
                        return;
                    }
                    $('#lem-input')[0].placeholder=''+(--seconds) + '秒后再次获取';
                }, 1000);
            },
            success: function (data) {
                var ret = eval('(' + data + ')');
                alert("验证码已发送，请查收");

            },
            error: function () {
            },
            complete: function () {
            }
        });
    });
    $('#lsjyx').bind('keyup',function (){

        $('#lsjyx').css('color','#333230');
        if($('#lsjyx').val()){
            if($('#lsjyx-label').html() == "手机号"){
                var v = /^1[34578]\d{9}$/g.test($('#lsjyx').val());
                if(v){
                    $('#lsjyx').next().addClass('lduigoud');
                    $('#lsjyx').next().removeClass('lduigoux');
                }else {
                    $('#lsjyx').next().addClass('lduigoux');
                    $('#lsjyx').next().removeClass('lduigoud');
                }
            }else if($('#lsjyx-label').html() == "邮箱"){
                var v2 = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,4}$/g.test($('#lsjyx').val());
                 if(v2){
                    $('#lsjyx').next().addClass('lduigoud');
                    $('#lsjyx').next().removeClass('lduigoux');
                }else {
                    $('#lsjyx').next().addClass('lduigoux');
                    $('#lsjyx').next().removeClass('lduigoud');
                }
            }
        }
    });
    //密码验证 \w@!#$&%
    $('#lmm').bind('keyup',checkRegistrationPass);
    function checkRegistrationPass(){
        $('#lmm').css('color','#333230');
        if($('#lmm').val()){
            var v = $('#lmm').val().length;
            if(v>=6&&v<=18){
                    $('#lmm').next().addClass('lduigoud');
                    $('#lmm').next().removeClass('lduigoux');
                    return true;
            }else {
                    $('#lmm').next().addClass('lduigoux');
                    $('#lmm').next().removeClass('lduigoud');
                    return false;
            }
        }
    }
    $('#lemil-mm').bind('keyup',mailboxRegister);
    function mailboxRegister(){
        $('#lemil-mm').css('color','#333230');
        if($('#lemil-mm').val()){
            var v = $('#lemil-mm').val().length;
            if(v>=6&&v<=18){
                    $('#lemil-mm').next().addClass('lduigoud');
                    $('#lemil-mm').next().removeClass('lduigoux');
                    return true;
            }else {
                    $('#lemil-mm').next().addClass('lduigoux');
                    $('#lemil-mm').next().removeClass('lduigoud');
                    return false;
            }
        }
    }
    // 确认密码验证
    $('#lqrmm').bind('keyup',surePassPhone);
    function surePassPhone(){
        $('#lqrmm').css('color','#333230');
        if( $('#lqrmm').val() != $('#lmm').val()){
            $('#lqrmm').next().addClass('lduigoux');
            $('#lqrmm').next().removeClass('lduigoud');
            return false;
        }else {
            $('#lqrmm').next().addClass('lduigoud');
            $('#lqrmm').next().removeClass('lduigoux');
            return true;
        }
    }
    // 邮箱的确认密码验证
    $('#lemi-qrmm').bind('keyup',surePassEmail);
    function surePassEmail(){
        $('#lemi-qrmm').css('color','#333230');
        if( $('#lemi-qrmm').val() != $('#lemil-mm').val()){
            $('#lemi-qrmm').next().addClass('lduigoux');
            $('#lemi-qrmm').next().removeClass('lduigoud');
            return false;
        }else {
            $('#lemi-qrmm').next().addClass('lduigoud');
            $('#lemi-qrmm').next().removeClass('lduigoux');
            return true;
        }
    }
    // 验证码验证
    $('.code').bind("keyup",function (){
        $(this).css('color','#323230')
    });
    // 点击直接登陆
    $('#lyyzh-dlbtn2').click(function (){
        $('#lyyzh-dlbtn1').trigger('click');
    });
    //邮箱账户验证
    $('#lemail').bind('blur',function (){
        var v = $('#lemail').val();
        var oEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g.test(v);
        if(oEmail){
            $('#lemail').next().addClass('lduigoud');
            $('#lemail').next().removeClass('lduigoux');
        }else {
            $('#lemail').next().addClass('lduigoux');
            $('#lemail').next().removeClass('lduigoud');
        }
    });
    // 忘记密码后找回密码


    var vnum = '';
	var timern = 0;
	var countnum = 60;
	$('#lsubmit-xgmm').click(function (){

		var formD = $('#forgetfrom').serialize();
		$.ajax({
			url: interface_uri + '/EmindStoreManager/userAction/updatePass',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: formD,
			beforeSend:function (){
				//在提交前确定都已经填写数据，否则不能提交
				if($('#account').val() == ''|| $('#newPass1') == ''||$('#vcode') == ''||$('#newPass2') == ''){
					return false;
				}
				//两次输入的新密码不相符
				if($('#newPass1').val() != $('#newPass2').val()){
					alert("两次输入的新密码不相符");
					return false;
				}
                if(!checkNewPass1()||!checkNewPass2()){
                    alert("密码输入错误");
                    return false;
                }
				// 输入的验证码不一样60s后自动请求新的验证码，点击也可获取验证码
				if(vnum != $('#vcode').val()){
					alert("验证码输入不正确");
					return false;
				}else {
					clearInterval(timern);
                    verifyCodeonoff = true;
				}
				
			},
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					$('.lsuccess').show(0);
					$('.banxin').hide(0);
					window.open('index.html','_self');
				}else {
					alert(ret.errMsg)
				}
			},
			error:function (errMsg){
				alert(errMsg);
			}
		})
		
	});




	// 发送验证码

	var verifyCodeonoff = true;
	$('#lfscode').click(function (){
        if($('#account').val()=='')return;
        if(!verifyCodeonoff)return;
        $('#vcode').val('');
        verifyCodeonoff = false;
		clearInterval(timern);
		countnum = 60;
		var va = $('#account').val();
		$.ajax({
			url:'/EmindStoreManager/userAction/sendValiCode',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data:{account:va},
			success:function (data){
				var ret = JSON.parse(data);
				vnum = ret.vcode;
				timern = setInterval(function (){
						countnum--;
						if(countnum<0){
							// $('#lfscode').trigger('click');
                            clearInterval(timern);
                            verifyCodeonoff = true;
							countnum = 60;
                            $('#vcode').attr('placeholder','再发验证码');
							return;
						}
						$('#vcode').attr('placeholder','('+countnum+')s');
					}, 1000);
                if(!ret.success){
                    alert(ret.errMsg);
                    logintimeout(ret);
                }
			},
			error:function (errMsg){
				console.log(errMsg)
			}
		});
		
	});
	//匹配输入的密码格式1
	$('#newPass1').bind('blur', checkNewPass1);
    function checkNewPass1() {
		/* Act on the event */
		// var v = /^\w{6,20}$/g.test($('#newPass1').val());
        var v = $('#newPass1').val().length;
		if(v>=6&&v<=18){
			$('#newPass1').next().addClass('lduigoud');
           	$('#newPass1').next().removeClass('lduigoux');
            return true;
        }else {
           	$('#newPass1').next().addClass('lduigoux');
           	$('#newPass1').next().removeClass('lduigoud');
            return false;
        }
	}
   
	//匹配输入的密码格式2
	$('#newPass2').bind('blur', checkNewPass2);
    function checkNewPass2() {
		/* Act on the event */

		var v1 = $('#newPass2').val();
		var v2 = $('#newPass1').val();
		if(v1 == v2){
			$('#newPass2').next().addClass('lduigoud');
           	$('#newPass2').next().removeClass('lduigoux');
            return true;
        }else {
           	$('#newPass2').next().addClass('lduigoux');
           	$('#newPass2').next().removeClass('lduigoud');
            return false;
        }
	}
		//匹配账户
	$('#account').bind('keyup',function (){
        $(this).css('color','#323230');
        var v = $('#account').val();
        if(v != ''){
            /**************匹配了常用手机号和qq\163等邮箱，如过不行再更正******************/ 
            // var onoff = /(^1[34578]\d{9})|(^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,4})$/g.test(v);
            var oPhone = /^1[34578]\d{9}$/g.test(v);
            //var oEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,4}$/g.test(v);
            var oEmail = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/g.test(v);
           if(oPhone || oEmail){
           		$('#account').next().addClass('lduigoud');
           		$('#account').next().removeClass('lduigoux');
           }else {
           		$('#account').next().addClass('lduigoux');
           		$('#account').next().removeClass('lduigoud');
           }
        }else {
            $('#ltipzh').hide(0);
            return
        }
    });








    


});
	// 注册模块
	//tab切换开始
    var myclick = function (v) {
        var ulsa = document.getElementById("tabnul");
        var llis = ulsa.getElementsByTagName("li");
        var lsjyx = document.getElementById('lsjyx-label');
        var lyatx = document.getElementById('lyatx');
        for (var i = 0; i < llis.length; i++) {
            var lli = llis[i];
            if (lli == document.getElementById("tab" + v)) {
                lli.style.backgroundColor = "#3285ff";
                lli.style.color = "#f3fbfe";
                $('.lcolor1').css('backgroundColor','#cdcdcd');
                $('.lcolor2').css('backgroundColor','#cdcdcd');
                $('.lcolor3').css('backgroundColor','#cdcdcd');
                $('.lqdti-q').css('display','none');
                $('.lqdti-z').css('display','none');
                $('.lqdti-r').css('display','none');
            } else {
                lli.style.backgroundColor = "#fff";
                lli.style.color = "#313332";
                $('.lcolor1').css('backgroundColor','#cdcdcd');
                $('.lcolor2').css('backgroundColor','#cdcdcd');
                $('.lcolor3').css('backgroundColor','#cdcdcd');
                $('.lqdti-q').css('display','none');
                $('.lqdti-z').css('display','none');
                $('.lqdti-r').css('display','none');
            }
          
        }
        if(v==1){
            $('#formdate-pho').css('display','block');
            $('#formdate-emi').css('display','none');
        }else if(v == 2){
            $('#formdate-pho').css('display','none');
            $('#formdate-emi').css('display','block');
        }
    };
function checkStrong(sValue) {
    var modes = 0;
    if (sValue.length < 6) return modes;
    if (/\d/.test(sValue)) modes++; //数字
    if (/[a-zA-Z]/.test(sValue)) modes++; //小写
    if (/\W/.test(sValue)) modes++; //特殊字符
    switch (modes) {
        case 1:
            return 1;
            break;
        case 2:
            return 2;
        case 3:
            return 3;
            break;
    }
}




/**
 * @class x.util.Cookie
 * Cookie操作类
 * 这个类是一个静态类，不需要实例化。
 */

Cookie = (function(){
    function set(name, value, expires, domain, path, secure){
        if(!expires){
            expires = new Date();
            expires.setTime(new Date().getTime() + 1 * (24 * 60 * 60 * 1000));
        }       
        var s = name + '=' + encodeURIComponent(value) +
                ';expires=' + expires.toGMTString() + 
                ';path=' + (path ? path : '/');
                     
        if(domain)
            s += ';domain=' + domain;       
        if(secure)      
            s += ';secure';     
        document.cookie = s;    
    }
    
    function get(name){     
        var r = new RegExp('(?:;)?' + name + '=([^;]*);?');
        r.test(document.cookie);
        return decodeURIComponent(RegExp.$1);
    }
    
    function remove(name, domain, path){
        var expire = new Date();
        expire.setTime(0); 
        var s = name + '=;expires=Thu, 01-Jan-2010 00:00:01 GMT' + 
                ';path=' + (path ? path : '/');
        
        if(domain)
            s += ';domain=' + domain;
         console.log(s) 
        document.cookie = s;
    }
    
    return {
        set: set,
        get: get,
        remove: remove
    };
})();
//  单击图片更换图片验证码
    function reloadcode(){
        document.getElementById("jimg").src="/EmindStoreManager/userAction/captcha?"+  new Date().getTime();
    }