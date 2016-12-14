$(function (){
	// 跳转到这个页面后自动加载几条审核管理的数据
	var account = 'account=account'+addString;
		$.ajax({
			url: interface_uri + '/EmindStoreManager/managerAction/noCertified',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data:account,
			success:function (data){
				var ret = JSON.parse(data);
				// console.log(ret);
				if(ret.success){
					$('#lshgg-wtg').html(ret.count);
					creatshgg(ret.pros);
					var str = perDevelop.join('')+cpDevelop.join('');
					$('#lshgl-list').html(str);
				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
				
			},
			error:function (errMsg){
				console.log(errMsg)
			}
	});
	
	// 点击审核管理切换至审核管理标签
	$('#lscgl-btn').click(function (){
		$(this).addClass('lactive');
		$(this).children().children().addClass('lactive-color');
		$(this).siblings('li').removeClass('lactive');
		$(this).siblings('li').children().children().removeClass('lactive-color');
		$('#lscgl-cnt').show(0);
		$('#lscgl-cnt').siblings('div').hide(0);
		var account = 'account=account'+addString;
		// ajax开始
		$.ajax({
			url: interface_uri + '/EmindStoreManager/managerAction/noCertified',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data:account,
			success:function (data){
				var ret = JSON.parse(data);
				// console.log(ret);
				if(ret.success){
					creatshgg(ret.pros);
					$('#lshgg-wtg').html(ret.count);
					$('#lshgl-list').html(perDevelop.join('')+cpDevelop.join(''));
				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
				
			},
			error:function (errMsg){
				console.log(errMsg)
			}
		});
		
	});



	// 点击应用管理切换至应用管理标签
	$('#lyygl-btn').click(function (){
		$(this).addClass('lactive');
		$(this).children().children().addClass('lactive-color');
		$(this).siblings('li').removeClass('lactive');
		$(this).siblings('li').children().children().removeClass('lactive-color');
		$('#lyygl-cnt').show(0);
		$('#lyygl-cnt').siblings('div').hide(0);

		
		// ajax开始
		var account = 'account=account'+addString;
		$.ajax({
			url: interface_uri + '/EmindStoreManager/managerAction/formalPros',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: account,
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					$('#lyygl-list').html(creatyygl(ret.devs));
				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
				
				
			},
			error:function (errMsg){
				console.log(errMsg)
			}
		});

	});
		// 点击线上管理跳到线上管理界面
		$('#lyygl-list').click(function (ev){
			// console.log(ev.target.innerHTML)
			if(ev.target.innerHTML == '线上管理'){
				$('#lappxsgl-cnt').parent().show(0);
				$('#lappxsgl-cnt').show(0);
				$('#lyygl-cnt').hide(0);
				var index = ev.target.getAttribute("lindex",2);
				// ajax请求数据开始
				var datas = 'proId='+index.split('&')[0]+'&type='+index.split('&')[1]+addString;
				// console.log(datas)
				$.ajax({
					url: interface_uri + '/EmindStoreManager/managerAction/proApps',
					type: 'post',
					data: datas,
					success:function (data){
						var ret = JSON.parse(data);
						// console.log(ret);
						if(ret.success){


							allApp(ret.apps);
							var s = ysxArr.join('')+yxxArr.join('')+ddshArr.join('')+shtgArr.join('')+shwtgArr.join('');;
							$('#lxsgl-applist').html(s);
							var addNum = ysxArr.length+ yxxArr.length+ddshArr.length +shtgArr.length+shwtgArr.length;
							$('#lyygl-qbnum').html(addNum);
							$('#lyygl-ysx').children('span').html(ysxArr.length);
							$('#lyygl-shtg').children('span').html(shtgArr.length);
							$('#lyygl-yxx').children('span').html(yxxArr.length);
							$('#lyygl-ddsh').children('span').html(ddshArr.length);
							$('#lyygl-shwtg').children('span').html(shwtgArr.length);
						}else {
							alert(ret.errMsg);
							logintimeout(ret);
						}
						
					},
					error:function (errMsg){
						alert(errMsg);
					}
				});
			

			}else {
				return;
			}
			
		});
		// 点击应用状态张的标签筛选类型
		$('#lyyzt-list').children().bind('click',function (){
			$(this).addClass('lactiveb');
			$(this).siblings().removeClass('lactiveb');

		});
		// 点击全部按钮显示全部应用
		$('#lyygl-qb').click(function (){
			var str = ysxArr.join('')+shtgArr.join('')+yxxArr.join('')+ddshArr.join('')+shwtgArr.join('');;
			$('#lxsgl-applist').html(str);
		});

		// 点击已上线标签
		$('#lyygl-ysx').click(function (){
			var str = '';
			str = ysxArr.join('');
			$('#lxsgl-applist').html(str);
			$('#lyygl-ysx').children('span').html(ysxArr.length);
		});
		// 点击审核通过的标签
		$('#lyygl-shtg').click(function (){
			var str = '';
			
			str = shtgArr.join('');
			$('#lxsgl-applist').html(str);
			$('#lyygl-shtg').children('span').html(shtgArr.length);
		});
		// 点击已下线标签
		$('#lyygl-yxx').click(function (){
			var str = '';
			
			str = yxxArr.join('');
			$('#lxsgl-applist').html(str);
			$('#lyygl-yxx').children('span').html(yxxArr.length);
		});
		// 点击等待审核标签
		$('#lyygl-ddsh').click(function (){
			var str = '';
			
			str = ddshArr.join('');
			$('#lxsgl-applist').html(str);
			$('#lyygl-ddsh').children('span').html(ddshArr.length);
		});
		// 点击审核未通过标签
		$('#lyygl-shwtg').click(function (){
			var str = '';
			str = shwtgArr.join('');
			$('#lxsgl-applist').html(str);
			$('#lyygl-shwtg').children('span').html(shwtgArr.length);
		});
		// 点击审核开发者跳转
		$('#lshgl-list').click(function (ev){
			// 点击审核开发者跳转到审核看网页
			if(ev.target.innerHTML == '开发者审核'|| ev.target.innerHTML == '企业开发者审核'){
				var inf = ev.target.getAttribute('indexp',2);
				window.sessionStorage.setItem('proId',inf.split('&')[0]);
				window.sessionStorage.setItem('proType',inf.split('&')[1])
				setTimeout(function (){
					window.open('reviewinfo.html',"_self");
				}, 200);
				
			}
			// 点击审核应用跳转到审核应用网页
			if(ev.target.innerHTML == '应用审核'){
				var index = ev.target.getAttribute('indexa',2);
				window.sessionStorage.setItem('proIdApp',index);
				setTimeout(function (){
						window.open('reviewapp.html',"_self");
					}, 200);
				}
		});
		// 看到某个用户的全部APP后点击去审核这个应用
		// 全局变量
		var appidn ;
		var setlineapp;
		var btntype;
		$('#lxsgl-applist').click(function (ev){

			if(ev.target.innerHTML == '去审核'){
				
				var btnonoff = ev.target.getAttribute('onoff',2);
				if(btnonoff == 'true'){
					var appid = ev.target.getAttribute('index',2);
					window.sessionStorage.setItem('proIdApp',appid);
					window.sessionStorage.setItem('onoff',btnonoff);
					window.open('reviewapp.html','_self');
				}
				
			}
			// 点击删除应用
			if(ev.target.innerHTML == '删除应用'){
				var btnonoffn = ev.target.getAttribute('onoff',2);
				if(btnonoffn == 'true'){
					appidn = ev.target.getAttribute('index',2);
					ajaxFn('app');
					$('#form-wrap').show(0);
					$('.lshade').show(0);
					btntype = 'deleteApp';
				}
				
			}else if(ev.target.innerHTML == '设置下线'){
				// 点击设置下线
				var setline = ev.target.getAttribute('onoff',2);
				if(setline == 'true'){
					setlineapp = ev.target.getAttribute('index',2);
					ajaxFn('app');
					$('#form-wrap').show(0);
					$('.lshade').show(0);
					btntype = 'offline';
				}
			}
			// 点击设置上线
			// if(ev.target.innerHTML == '设置上线'){
			// 	var btnonoff4 = ev.target.getAttribute('onoff',2);
			// 	if(btnonoff3 == 'true'){
			// 		var appid2 = ev.target.getAttribute('index',2);
			// 			
			// 
			// 	}
			// }
		});
		// 删除应用提交表单
		$('#lsure').click(function (){
			
			if(btntype == 'deleteApp'){
				delelApp();
			}else if(btntype == 'offline'){
				offLineSet();
			}
		
		});
		function delelApp(){
			var formdata = $('#deleteappform').serialize()+'&appId='+appidn+addString;
			$.ajax({
				url: '/EmindStoreManager/managerAction/deleteApp',
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: formdata,
				beforesend:function (){
					if($('#litem1')[0].checked =="false"||$('#litem2')[0].checked == 'false'||$('#litem3')[0].checked == 'false'){

						alert('必须选择删除原因');
						return false;
					}
					
				},
				success:function (data){
					var ret = JSON.parse(data);
					if(ret.success){
						$('#form-wrap').hide(0);
						$('#lsuccess-tsxx').html('提交提示');
						$('#lsuccess-tsxx2').html('删除应用成功！');
						$('.lsuccess').show(0);
						$('.lshade').show(0);
						setTimeout(function (){
							$('.lsuccess').hide(0);
							$('.lshade').hide(0);
							window.location.reload();
						}, 800);
					}else {
						alert(ret.errMsg);
						logintimeout(ret);
					}
				},
				error:function (errMsg){
					alert(errMsg);
				}
			});
		}
		function offLineSet(){
			var formdata = $('#deleteappform').serialize()+'&appId='+setlineapp+addString;
			$.ajax({
				url: '/EmindStoreManager/managerAction/offlineApp',
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: formdata,
				beforesend:function (){
					if($('#litem1')[0].checked =="false"||$('#litem2')[0].checked == 'false'||$('#litem3')[0].checked == 'false'){

						alert('必须选择下线原因');
						return false;
					}
					
				},
				success:function (data){
					var ret = JSON.parse(data);
					if(ret.success){
						$('#form-wrap').hide(0);
						$('#lsuccess-tsxx').html('提交提示');
						$('#lsuccess-tsxx2').html('该应用已设置为下线');
						$('.lsuccess').show(0);
						$('.lshade').show(0);
						setTimeout(function (){
							$('.lsuccess').hide(0);
							$('.lshade').hide(0);
							window.location.reload();
						}, 800);
					}else {
						alert(ret.errMsg);
						logintimeout(ret);
					}
				},
				error:function (errMsg){
					alert(errMsg);
				}
			});
		}
		// 点击取消按钮关闭删除应用弹窗
		$('#lcance').click(function (){
			$('#form-wrap').hide(0);
			$('.lshade').hide(0);
		});
		// 点击取消按钮关闭删除应用弹窗
		$('#lxbtn3').click(function (){
			$('#lcance').trigger('click');

		});

	// 点击开发者类型的时候可以筛选（筛选功能为实现）
	$('#lkfz-type-onoff').click(function (ev){
		$('#lkfz-type-onoff').children('dd').show(0);
		if(ev.target.innerHTML =='企业开发者'){
			var str = '';
			$('#lshgg-wtg').html(cpDevelop.length);
			
			str = cpDevelop.join('');
			$('#lshgl-list').html(str);
		}else if(ev.target.innerHTML =='个人开发者'){
			var str = '';
			$('#lshgg-wtg').html(perDevelop.length);
			
			str = perDevelop.join('');
			$('#lshgl-list').html(str);
		}
		ev.originalEvent.cancelBubble = true;
	});
	$(document).click(function (){
		$('#lkfz-type-onoff').children('dd').hide(0);
	});






});
var perDevelop = [];
var cpDevelop = [];
function creatshgg(data){
	perDevelop.length = 0;
	cpDevelop.length = 0;

	if(!data){
		return;
	}
	for(var i = 0; i < data.length; i++){
	
		if(data[i].proType == 'pp'){
			var str1 = '';
			str1+='<li class="lapp-li clearfix">'
			str1+='<h3 class="">'
			str1+='<a href="javascript:;">'
			str1+=''+data[i].proName+''
			str1+='</a>'
			str1+='</h3>'
			str1+='<p class="lkfzlx">个人开发者</p>';
			if(!data[i].apps.length){
				str1+='<div class="lshkfz clearfix" >'
				str1+='<time class="floatl ltime">'
				str1+=''+data[i].regDate+'</time>'
				str1+='<p class="lappName">暂无应用</p>'
				str1+='<div class="floatl lstartbtn">'
				str1+='<a indexp="'+data[i].proId+'&'+data[i].proType+'" class="" href="javascript:;">开发者审核</a>'
				str1+='</div>'
				str1+='</div>'
			}else {
				str1+='<ul class="lyyshz" >'
				for(var j = 0; j < data[i].apps.length; j++){
					str1+='<li class="lyysh-zli clearfix">'
					str1+='<time class="floatl ltime">'+data[i].apps[j].submitDate+'</time>'
					str1+='<p class="lkfz-yymc floatl">'+data[i].apps[j].appName+'</p>'
					str1+='<div class="floatl lstartbtn">'
					str1+='<a indexa="'+data[i].apps[j].appId+'" class="" href="javascript:;">应用审核</a>'
					str1+='</div>'
					str1+='</li>'
				}
			}
			str1+='</ul>'
			str1+='</li>';
			perDevelop.push(str1);

		}else if(data[i].proType == 'cp'){
			var str2 = '';
			str2+='<li class="lapp-li clearfix">'
			str2+='<h3 class="">'
			str2+='<a href="javascript:;">'
			str2+=''+data[i].proName+''
			str2+='</a>'
			str2+='</h3>'
			str2+='<p class="lkfzlx">企业开发者</p>';
			if(!data[i].apps.length){
				str2+='<div class="lshkfz clearfix" >'
				str2+='<time class="floatl ltime">'
				str2+=''+data[i].regDate+'</time>'
				str2+='<p class="lappName">暂无应用</p>'
				str2+='<div class="floatl lstartbtn">'
				str2+='<a indexp="'+data[i].proId+'&'+data[i].proType+'" class="" href="javascript:;">企业开发者审核</a>'
				str2+='</div>'
				str2+='</div>'
			}else {
				str2+='<ul class="lyyshz" >'
				for(var j = 0; j < data[i].apps.length; j++){
					str2+='<li class="lyysh-zli clearfix">'
					str2+='<time class="floatl ltime">'+data[i].apps[j].submitDate+'</time>'
					str2+='<p class="lkfz-yymc floatl">'+data[i].apps[j].appName+'</p>'
					str2+='<div class="floatl lstartbtn">'
					str2+='<a indexa="'+data[i].apps[j].appId+'" class="" href="javascript:;">应用审核</a>'
					str2+='</div>'
					str2+='</li>'
				}
			}
			str2+='</ul>'
			str2+='</li>';
			cpDevelop.push(str2);
		}
	}

};
// o 未审核
// 1审核通过
// 2审核未公过


function creatyygl(data){
	var str = '';
	if(!data){
		return;
	}
	for(var i=0; i< data.length; i++){


		str+='<li class="lapp-list2-li clearfix">';
		str+='<h3 class="floatl">';
		str+='<a href="javascript:;">';
		str+=''+data[i].proName+'</a></h3>';
		str+='<div class="lyy-num floatl"><p>'+data[i].appCount+'';
		str+='</p></div>';
		str+='<div class="floatl ldown-addnum">';
		str+='<p>'+data[i].downloads+'</p></div>';
		str+='<div class="floatl lls-acount">';
		str+='<p >'+data[i].payCount+'</p></div>';
		str+='<div class="floatl lcz"><div>';
		str+='<a lindex="'+data[i].proId+'&'+data[i].proType+'" href="javascript:;">';
		str+='线上管理</a></div><div>';
		str+='<a href="javascript:;">';
		str+='统计数据</a></div><div><a href="javascript:;">';
		str+='财务管理</a></div></div></li>';
	}
	return str;
}

// 开发者全部应用列表（点击线上管理后显示开发者所有的App）
// 审核状态（creditState）： 0未审核; 1审核通过;2审核未通过
// 发布状态（publishState）：0未上架，1发布，2暂停，3下架
// 

var ysxArr = []; //已上线数组
var yxxArr = []; //已下线数组
var ddshArr = [];//等待审核数组
var shtgArr = []; //审核通过数组
var shwtgArr = [];//审核未通过
function allApp(index){
	if(!index){
		return;
	}
	//每次向数组里放东西的时候要先清空
	ysxArr.length = 0;
	yxxArr.length = 0;
	ddshArr.length = 0;
	shtgArr.length = 0;
	shwtgArr.length = 0;
	for(var i= 0; i < index.length; i++){
		if(index[i].creditState == 1&&index[i].publishState == 1){
			var str1 = '';
			str1+='<li class="lli-box clearfix">';
			str1+='<a class="limgwrap floatl" href="javascript:;">';
			var lapplogosrc1 =  'http://192.168.30.193/file/'+ index[i].logoUrl.split('file')[1]+'';
			str1+='<img src="'+lapplogosrc1+'" alt="">';
			str1+='</a><p class="lgame-name floatl">';
			str1+='<a class="lname" href="javascript:;">';
			str1+=''+index[i].appname+'</a>';
			str1+='<a class="lgame-version" href="javascript:;">';
			str1+='应用版本：'+index[i].versionName+'</a></p>';
			str1+='<div class="lgame-state floatl"><p>';
			str1+='<a class="lysx" href="javascript:;">';
			str1+='已上线</a>';
			str1+='</p></div><div class="lapp-manager">';
			str1+='<a onoff="true" index="'+index[i].appid+'" class="lapp-manager-btn" href="javascript:;">设置下线</a>';
			str1+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">去审核</a>';
			str1+='<a onoff="true" class="lapp-manager-btn" href="javascript:;">应用推广</a>';
			str1+='<a onoff="false" index="'+index[i].appid+'" class="lapp-manager-btn ldisbale" href="javascript:;">删除应用</a>';
			str1+='</div></li>';
			ysxArr.push(str1);
		}else if(index[i].creditState == 1&&index[i].publishState == 3){
			var str2 = '';
			str2+='<li class="lli-box clearfix">';
			str2+='<a class="limgwrap floatl" href="javascript:;">';
			var lapplogosrc2 =  'http://192.168.30.193/file/'+ index[i].logoUrl.split('file')[1]+'';
			str2+='<img src="'+lapplogosrc2+'" alt="">';
			str2+='</a><p class="lgame-name floatl">';
			str2+='<a class="lname" href="javascript:;">';
			str2+=''+index[i].appname+'</a>';
			str2+='<a class="lgame-version" href="javascript:;">';
			str2+='应用版本：'+index[i].versionName+'</a></p>';
			str2+='<div class="lgame-state floatl"><p>';
			str2+='<a class="lysx lyxx" href="javascript:;">';
			str2+='已下线</a>';
			str2+='</p></div><div class="lapp-manager">';
			str2+='<a onoff="true" index="'+index[i].appid+'" class="lapp-manager-btn " href="javascript:;">设置上线</a>';
			str2+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">去审核</a>';
			str2+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">应用推广</a>';
			str2+='<a onoff="true" index="'+index[i].appid+'" class="lapp-manager-btn " href="javascript:;">删除应用</a>';
			str2+='</div></li>';
			yxxArr.push(str2);
		}else if(index[i].creditState == 1){
			var str3 = '';
			str3+='<li class="lli-box clearfix">';
			str3+='<a class="limgwrap floatl" href="javascript:;">';
			var lapplogosrc3 =  'http://192.168.30.193/file/'+ index[i].logoUrl.split('file')[1]+'';
			str3+='<img src="'+lapplogosrc3+'" alt="">';
			str3+='</a><p class="lgame-name floatl">';
			str3+='<a class="lname" href="javascript:;">';
			str3+=''+index[i].appname+'</a>';
			str3+='<a class="lgame-version" href="javascript:;">';
			str3+='应用版本：'+index[i].versionName+'</a></p>';
			str3+='<div class="lgame-state floatl"><p>';
			str3+='<a class="lysx lshtg" href="javascript:;">';
			str3+='审核通过</a>';
			str3+='</p></div><div class="lapp-manager">';
			str3+='<a onoff="true" index="'+index[i].appid+'" class="lapp-manager-btn " href="javascript:;">设置上线</a>';
			str3+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">去审核</a>';
			str3+='<a onoff="true" class="lapp-manager-btn " href="javascript:;">应用推广</a>';
			str3+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">删除应用</a>';
			str3+='</div></li>';
			shtgArr.push(str3);
			
		}else if(index[i].creditState == 0){
			var str4 = '';
			str4+='<li class="lli-box clearfix">';
			str4+='<a class="limgwrap floatl" href="javascript:;">';
			var lapplogosrc4 =  'http://192.168.30.193/file/'+ index[i].logoUrl.split('file')[1]+'';
			str4+='<img src="'+lapplogosrc4+'" alt="">';
			str4+='</a><p class="lgame-name floatl">';
			str4+='<a class="lname" href="javascript:;">';
			str4+=''+index[i].appname+'</a>';
			str4+='<a class="lgame-version" href="javascript:;">';
			str4+='应用版本：'+index[i].versionName+'</a></p>';
			str4+='<div class="lgame-state floatl"><p>';
			str4+='<a class="lysx lddsh" href="javascript:;">';
			str4+='等待审核</a>';
			str4+='</p></div><div class="lapp-manager">';
			str4+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">设置上线</a>';
			str4+='<a onoff="true" index="'+index[i].appid+'" class="lapp-manager-btn " href="javascript:;">去审核</a>';
			str4+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">应用推广</a>';
			str4+='<a onoff="false" index="'+index[i].appid+'" class="lapp-manager-btn ldisbale" href="javascript:;">删除应用</a>';
			str4+='</div></li>';
			ddshArr.push(str4);
		}else if(index[i].creditState == 2){
			var str5 = '';

			str5+='<li class="lli-box clearfix">';
			str5+='<a class="limgwrap floatl" href="javascript:;">';
			var lapplogosrc5 =  'http://192.168.30.193/file/'+ index[i].logoUrl.split('file')[1]+'';
			str5+='<img src="'+lapplogosrc5+'" alt="">';
			str5+='</a><p class="lgame-name floatl">';
			str5+='<a class="lname" href="javascript:;">';
			str5+=''+index[i].appname+'</a>';
			str5+='<a class="lgame-version" href="javascript:;">';
			str5+='应用版本：'+index[i].versionName+'</a></p>';
			str5+='<div class="lgame-state floatl"><p>';
			str5+='<a class="lysx lyxx" href="javascript:;">';
			str5+='审核未通过</a>';
			str5+='</p></div><div class="lapp-manager">';
			str5+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">设置上线</a>';
			str5+='<a onoff="false" index="'+index[i].appid+'"  class="lapp-manager-btn ldisbale" href="javascript:;">去审核</a>';
			str5+='<a onoff="false" class="lapp-manager-btn ldisbale" href="javascript:;">应用推广</a>';
			str5+='<a onoff="false" index="'+index[i].appid+'" class="lapp-manager-btn ldisbale" href="javascript:;">删除应用</a>';
			str5+='</div></li>';
			shwtgArr.push(str5);
		}
	}

}
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
// 点击审核由问题弹出问题表单
function ajaxFn(types){
    var datas = 'type='+types+addString;
        $.ajax({
            url: '/EmindStoreManager/managerAction/failMessage',
            type: 'post',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: datas,
            success:function (data){
                var ret = JSON.parse(data);
                if(ret.success){
                    auditProblems(ret);
                    $('#lshenheform input').attr('disabled',false);
                    $('.lshade').show(0);
                    $('.lshywt').show(0);
                    window.scrollTo(0,0);
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