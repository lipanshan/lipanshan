$(function () {

	// 加载页面加载App信息
	var appId = window.sessionStorage.getItem('proIdApp');
	
	var datas = 'appId='+appId+addString;
	$.ajax({
		url: interface_uri + '/EmindStoreManager/appAction/appInfo',
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: datas,
		success: function (data){
			var ret = JSON.parse(data);
			if(ret.success){
				addInfo(ret.appInfo,ret);
			}else {
				alert(ret.errMsg);
				logintimeout(ret);
			}
		},
		error: function (errMsg){
			alert(errMsg);
		}
	});
	// 加载页面的时候请求App下载借口




    //禁用所有
    $('#lapk-formdata').find('*').attr('disabled',true);
	
	//提交可用
	$('#submit').removeAttr("disabled", true);
	$('#lreasonsub').attr('disabled',false);
	$('#lappDownload').attr('disabled',false);
	
	$('#submit').click(function (){
		$('.jbg').show(0);
		$('.jtk').show(0);

		var initDiv = function () {
			$(".jqx").mouseover(function () {
				$(".jqx").css("background", "#3285ff");
			})
			$(".jqx").mouseout(function () {
					$(".jqx").css("background", "#9f9fa7");
				});
			$(".jqr").mouseover(function () {
				$(".jqr").css("background", "#3285ff");
			});
			$(".jqr").mouseout(function () {
					$(".jqr").css("background", "#9f9fa7");
				});
		};
		initDiv();
		//窗口回到顶部
		//$("html,body").animate({scrollTop:0}, 500);
	});
	//单击取消，回到提交前
	$('.jqx').click(function(){
		$('.jbg').hide(0);
		$('.jtk').hide(0);
	})
	$('.jx').click(function(){
		$('.jbg').hide(0);
		$('.jtk').hide(0);
	})
	$('.jx2').click(function(){
		$('.jbg').hide(0);
		$('.jtk2').hide(0);
	})
	$('.jx3').click(function(){
		$('.jbg').hide(0);
		$('.jtk3').css('display','block');
	})

	//蒙版背景全屏
	$(document).bind('scroll',function (){
		var iTop = window.pageYOffset;
		$('.jbg').css('top',iTop);
	});









	//单击确认提交
	$('#lsure').click(function (){

		var proId = window.sessionStorage.getItem('proIdApp');
		var proType = window.sessionStorage.getItem('proType');
		var datan = 'appId='+appId+'&pass=1'+addString;

		// ajax开始
		$.ajax({
			url: interface_uri + '/EmindStoreManager/managerAction/auditApp',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: datan,
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					$('.jtk').hide(0);
					$('.jtk2').show(0);
					window.open('shenheguanli.html','_self');
				}else {
					//alert('提交失败')
					$('.jtk3').show(0);
					alert(ret.errMsg);
					logintimeout(ret);
				}
			},
			error:function (errMsg){
				console.log(errMsg);
			}
		});
	});
	// 点击审核有问题弹出问题表单

	$('#lreasonsub').click(function (){
		var type = 'app';
		ajaxFn(type);
		
	});
	// 点击差杠关闭当前弹窗
	$('#lxbtn3').click(function (){
		$('.lshywt').hide(0);
		$('.jbg').hide(0);
	});
	//点击取消按钮后关闭当前窗口
	$('#lcancel2').click(function (){
		$('#lxbtn3').trigger('click');
	});
	$('#lsure2').click(function (){
        var datas = $('#lshenheform').serialize()+'&'+'appId='+appId+'&pass=0'+addString;
        // ajax开始
        $.ajax({
            url: interface_uri + '/EmindStoreManager/managerAction/auditApp',
            type: 'post',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: datas,
            beforeSend:function (){
                if(!($('#litem0')[0].checked||$('#litem1')[0].checked||$('#litem2')[0].checked)){
                    alert("必须选择注册失败原因");
                    return false;
                }

            },
            success:function (data){
                var ret = JSON.parse(data);
                if(ret.success){
                	$('#lshts').html('提交成功！');
                	$('#lshtstext').html('提交成功！')
   					$('.lshywt').hide(0);
					$('.jtk2').show(0);
					window.open('shenheguanli.html','_self');
                }else {
                	alert(ret.errMsg);
                	logintimeout(ret);
                }
            },
            error: function (errMsg){
                console.log(errMsg);
            }
        });
    });
	




});
// 关闭当前窗口
function closewin(){
	// var s = window.na
	// if()
		self.opener=null;
		self.close();
}
	// App信息
function addInfo(data,data2){

 	$('#pack').html(data.packageName);//包名
 	$('#packageName').html(data.versionName);//版本名称
 	$('#lversion').html(data.versionNum);//版本号
 	$('#lsdkVersion').html(data.sdkVersion);//系统支持
 	$('#lappId').html(data.appId);//AppID：
 	$('#lappKey').html(data.appKey);//AppKey
 	$('#lappSecret').html(data.appsecret);//AppSecret
 	$('#lappname').val(data.appname);//应用名称
 	//把下载地址放入A标签
 	var appIds = window.sessionStorage.getItem('proIdApp');
	var ds = 'appId='+appIds;
 	var h = '/EmindStoreManager/appAction/downloadApp?'+ds+addString;
 	$('#lappDownload').attr('href',h);
 	var appLogSrc = 'http://192.168.30.193/file/'+data.apklogo.split('file')[1];
 	$('#lappImg').attr('src',appLogSrc);//applog截图
 	// pc 和手机应用
 	$('#lpcyy').attr('checked',false);
 	$('#lsjyy').attr('checked',false);
 	var type = data.type.split(',');
 	for(var i = 0; i < type.length; i++){
 		if(type[i] == 'p'){
 			$('#lpcyy').attr('checked',true);//应用类型 Pc应用
 		}
 		if(type[i] == 'm'){
 			$('#lsjyy').attr('checked',true);//应用类型 手机应用
 		}
 	}
 	 // 应用分类
 	$('#categoryId').html(data2.type1);//应用分类
 	$('#subCategoryId').html(data2.type2);//应用分类

 	// 关键字
 	$('#keywords').val(data2.key1);//关键字1
 	$('#keywords2').val(data2.key2);//关键字1
 	$('#keywords3').val(data2.key3);//关键字1

 	$('#introduce').val(data.introduce);//应用简介
 	$('#description').val(data.description);//应用描述
 	$('#lupdata').val(data.versionlog);//更新日志
 	// 收费描述
 	if(data.price){
 		$('#lsf').attr('checked',true);//收费
 	}else {
 		$('#lmf').attr('checked',true);//免费
 	}
 	
 
 	// 广告状态（单选框）
 	if(data.existadv){
 		$('#lnqgg').attr('checked',true);//内嵌广告
 	}else{
 		$('#lwgg').attr('checked',true);//无广告
 	}
 	
 	
 	//支持语言 "zh_CN,us_EN"
 	$('#ljtzw').attr('checked',false);
 	$('#lyw').attr('checked',false);
 	var language = data.language.split(',');
 	for(var i = 0; i < language.length; i++){
 		if(language[i] == 'zh_CN'){
 			$('#ljtzw').attr('checked',true);//简体中文
 		}
 		if(language[i] == 'us_EN'){
 			$('#lyw').attr('checked',true);//英文
 		}
 	}
 	if(!!data.logoUrl){
 		var llogSrc =  'http://192.168.30.193/file/'+data.logoUrl.split('file')[1];
 		$('#imagepath').attr('src',llogSrc);//应用图标
 	}
 	
 	if(!!data.imageUrl1){
	 	var lshotPic1 = 'http://192.168.30.193/file/'+data.imageUrl1.split('file')[1];
	 	$('#imagepathj1').attr('src',lshotPic1);//应用截图1
 	}
 	if(!!data.imageUrl2){
 		var lshotPic2 = 'http://192.168.30.193/file/'+data.imageUrl2.split('file')[1];
 		$('#imagepathj2').attr('src',lshotPic2);//应用截图2
 	}
 	if(!!data.imageUrl3){
 		var lshotPic3 = 'http://192.168.30.193/file/'+data.imageUrl3.split('file')[1];
 		$('#imagepathj3').attr('src',lshotPic3);//应用截图3
 	}
 	if(!!data.imageUrl4){
 		var lshotPic4 = 'http://192.168.30.193/file/'+data.imageUrl4.split('file')[1];
 		$('#imagepathj4').attr('src',lshotPic4);//应用截图3
 	}
 	if(!!data.imageUrl5){
 		var lshotPic5 = 'http://192.168.30.193/file/'+data.imageUrl5.split('file')[1];
 		$('#imagepathj5').attr('src',lshotPic5);//应用截图3
	}





 }
 // 点击审核由问题弹出问题表单
function ajaxFn(type){
    var datas = 'type='+type+addString;
        $.ajax({
            url: '/EmindStoreManager/managerAction/failMessage',
            type: 'post',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: datas,
            success:function (data){
                var ret = JSON.parse(data);
                if(ret.success){
                	 auditProblems(ret);
                    $('.lshywt').show(0);
					$('.jbg').show(0);
					$('#lshenheform').find('*').attr('disabled',false);
					window.scrollTo(0, 0);          
                }else {
                	alert(ret.errMsg);
                	logintimeout(ret);
                }
            },
            error:function (errMsg){
                console.log(errMsg);
            }
        });

}
// 向审核问题表单中插入信息
function auditProblems(data){
    var str = '';
    for(var i= 0; i< data.messages.length; i++){
        str+='<div class="litem-wrap clearfix">'
        str+='<input name="reason" value="'+data.messages[i].id+'" class="floatl litem" id="litem'+i+'" type="checkbox" >'
        str+='<label class="floatl" for="litem'+i+'">'
        str+='<span class="llabel-span floatl">item</span>'
        str+='<span class="llabel-span floatl">'+data.messages[i].id+'</span>'
        str+='</label>'
        str+='</div>'
    }
    $('#lreason-list').html(str);

}