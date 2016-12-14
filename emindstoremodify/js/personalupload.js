var appClassificationarr;
var ledition;
$(function (){


		var updatas = '';//判断创建信用的审核未空更新应用的时候为1
		
		// 游戏分类请求数据
		$.ajax({
			url: interface_uri + '/EmindStoreManager/appAction/appTypeList',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:function (data){
				var rets = JSON.parse(data);
				// console.log(rets);
				if(rets.success){
					$('#categoryId').html(creatBq(rets));
					$('#subCategoryId').html(creatBq2(rets,$('#categoryId')[0]));
					appClassificationarr = rets;
				}else {
					alert(rets.errMsg);
				}
				//分类请求成功再请求页面数据
				if(window.sessionStorage.getItem('resubmitAppid')){
					// console.log("请求页面数据")
					updatas = '&update=1';
					ledition = window.sessionStorage.getItem('resubmitAppid');
					var datan = 'appId='+ledition.split('&')[0]+addString;
					$.ajax({
						url: '/EmindStoreManager/appAction/appInfo',
						type: 'post',
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						data: datan,
						success:function (data){

							// console.log("页面数据请求成功")
							var retappInfo = JSON.parse(data);
							// console.log(retappInfo)
							if(retappInfo.success){
								// console.log(ret)
								resubmitApp(retappInfo.appInfo);
								if(retappInfo.key1){
									$('#keywords').val(retappInfo.key1);//搜索关键字1
								}
								if(retappInfo.key2){
									$('#keywords2').val(retappInfo.key2);//搜索关键字2
								}
								if(retappInfo.key3){
									$('#keywords3').val(retappInfo.key3);//搜索关键字3
								}
								$('#lfileSize').html(retappInfo.mbSize+'MB')//文件大小
								
							}else {
								alert(retappInfo.errMsg);
								logintimeout(retappInfo);
							}
						},
						error:function (errMsg){
							console.log(errMsg);
						}
					});
				}




			},
			error:function (msgerr){
				console.log(msgerr);
			}
		})

	// 当加载页面的时候检测是否为重新提交应用

		// 选择不同类型的时候切换类型的内容
	$("#categoryId").bind('change',function (){
		$.ajax({
			url: interface_uri + '/EmindStoreManager/appAction/appTypeList',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					// 点击选择分类的时候清除加载页面的时候的内容
					$("#lapplicationcat").html('');
					$("#lapplicationcat").val('');
					$("#lapplicationsub").html('');
					$("#lapplicationsub").val('');
					// $('#categoryId').html(creatBq(ret));
					$('#subCategoryId').html(creatBq2(ret,$('#categoryId')[0]));
				}else {
					alert(ret.errMsg);
					
				}
				
			},
			error:function (msgerr){
				console.log(msgerr);
			}
		})
	});

	// 应用名称必须在20个汉子以内
	$('#lappname').bind('keyup',checkName);
	function checkName(){
		var v = /^[\u4e00-\u9fa5\w]{1,20}$/.test($('#lappname').val());
		if(v){
			$('#lappname-x').addClass('lduigoud');
			$('#lappname-x').removeClass('lduigoux');
			return true;
		}else {
			$('#lappname-x').addClass('lduigoux');
			$('#lappname-x').removeClass('lduigoud');
			return false;
		}
	}
	// 关键字最多4个，多个关键字之间用逗号隔开
	$('#keywords').bind('blur',function (){
		checkKeyword($('#keywords'));
	});
	$('#keywords2').bind('blur',function (){
		checkKeyword($('#keywords2'));
	});

	function checkKeyword(id){
		var s = id.val();
		var v = /^[\u4e00-\u9fa5]{1,4}$/.test(s);
		if(v){
			id.next().addClass('lduigoud');
			id.next().removeClass('lduigoux');
			return true;
		}else {
			id.next().addClass('lduigoux');
			id.next().removeClass('lduigoud');
			return false;
		}
	};
	$('#keywords3').bind('blur',function (){
		checkKeyword($('#keywords3'));
	});
	// 应用简介最少15个 字最多30个字
	$('#introduce').bind('blur',function (){
		checkIns();
	});
	function checkIns(){
		var v=$('#introduce').val().length;
		if(v>=15&&v<=30){
			$('#lintroduce-x').addClass('lduigoud');
			$('#lintroduce-x').removeClass('lduigoux');
			return true;
		}else {
			$('#lintroduce-x').addClass('lduigoux');
			$('#lintroduce-x').removeClass('lduigoud');
			return false;
		}
	}
	// 更新日志最多不能超过500个字
	$('#lupdatalog').bind('blur',cupdataLog);
	function cupdataLog(){
		// var s = /^[\u4e00-\u9fa5\w]{0,500}$/.test($('#lupdatalog').val());
		var updatas = $('#lupdatalog').val().length;
		if(updatas>=0&&updatas<=500){
			$('#lupdatalog').next().addClass('lduigoud');
			$('#lupdatalog').next().removeClass('lduigoux');
		}else {
			$('#lupdatalog').next().addClass('lduigoux');
			$('#lupdatalog').next().removeClass('lduigoud');
		}
	}
	// 匹配在应用描述中输入汉字或字母不能超过500个
	$("#description").bind('blur',function (){
		checkgxrz();
	});
	function checkgxrz(){
		var s = $("#description").val();
		// var v = /^[\u4e00-\u9fa5\w,.`、\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\s]{1,500}$/.test(s);
		var v = s.length;
		if(v<=500&&v >0){
			$('#description').next().addClass('lduigoud');
			$('#description').next().removeClass('lduigoux');
			return true;
		}else {
			$('#description').next().addClass('lduigoux');
			$('#description').next().removeClass('lduigoud');
			return false;
		}
	}

	// 上传APPlog(plupload插件)
	var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : 'file_upload', // you can pass an id...//选择添加文件的按钮
		container: document.getElementById('lvox'), // ... or DOM Element itself//添加内容显示的地方
		url: interface_uri + '/EmindStoreManager/appAction/uploadLogo?1=1'+addString,//上传服务器地址
		// url: interface_uri +'uploadify.php',
		flash_swf_url : '../pluploadify/js/Moxie.swf',//flash文件地址
		silverlight_xap_url : '../pluploadify/js/Moxie.xap',
		multi_selection: false,
		multiple_queues: true,
		resize:{width:512,height: 512},
		// headers: {'Access-Control-Allow-Origin':'*'},
		filters : { //选择文件扩展名的过滤器，每个过滤规则中只有title和 ext
			max_file_size : '100kb',
			mime_types: [
				{title : "Image files", extensions : "jpg,jpeg,png"},

			],
			prevent_duplicates : true //不允许上传重复文件
		},

		init: {

			PostInit: function() {
				
			},

			FilesAdded: function(up, files) {
				plupload.each(files, function(file) {
					document.getElementById('filelist').innerHTML += '<div class="lfilelist" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';

				});
				uploader.start();;
			},

			UploadProgress: function(up, file) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = file.percent + "%";
					if(file.percent == 100){
						$('filelist').hide(0);
						
					}
			},
			FileUploaded:function (up,file,res){
				// console.log(res.response);
				
				var ret = JSON.parse(res.response);
				// console.log(ret)
				setTimeout(function (){
					$('.lfilelist').css('opacity',0);
					$('.lfilelist').css('filter','alpah(opacity=0)');
					document.getElementById('filelist').innerHTML =  '';
					// abPath
					// '/EmindStoreManager/file/'+ret.path.split('file')[1]+''
		            	document.getElementById("imagepath").src= 'http://192.168.30.193/'+ ret.path;
		            }, 1500);
		         document.getElementById("logoPath").value=ret.path;
			},

			Error: function(up, err) {
				alert(err.message);
				// document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
			}
		}
	});

	uploader.init();

	// 上传APP截图plupload插件
	var imgSrc = [];
	var uploaderShot = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		// browse_button : 'file_uploadj1',
		browse_button :['file_uploadj11','imagepathj1','file_uploadj12','file_uploadj13','file_uploadj14'], // you can pass an id...//选择添加文件的按钮
		container: document.getElementById('lvoxj1'), // ... or DOM Element itself//添加内容显示的地方
		url: interface_uri + '/EmindStoreManager/appAction/uploadShot?1=1'+addString,//上传服务器地址
		// url: interface_uri +'uploadify.php',
		flash_swf_url : '../pluploadify/js/Moxie.swf',//flash文件地址
		silverlight_xap_url : '../pluploadify/js/Moxie.xap',
		multi_selection: true,
		multiple_queues: true,
		resize:{width:1920,height: 1080},
		filters : { //选择文件扩展名的过滤器，每个过滤规则中只有title和 ext
			max_file_size : '40mb',
			mime_types: [
				{title : "Image files", extensions : "jpg,png,jpeg"},
			],
		},


		init: {
			PostInit: function() {
				
			},

			FilesAdded: function(up, files) {
				plupload.each(files, function(file) {
					document.getElementById('filelistj1').innerHTML += '<div class="lfilelist" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';

				});
				uploaderShot.start();

			},

			UploadProgress: function(up, file) {
				// console.log(file)
				if(document.getElementById(file.id)){
					document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = file.percent + "%";
				}
				
					if(file.percent == 100){
						$('filelistj1').hide(0);
						
					}
			},
			FileUploaded:function (up,file,res){
				// console.log(res.response);
				
				var ret = JSON.parse(res.response);
				// console.log(ret)

		     	imgSrc.push(ret.path);
		     	if(imgSrc.length >$('#lvoxj1 img').length){
		     		imgSrc.shift();
		     	}

		     	for(var i = 0; i < imgSrc.length; i++){
		     		//  ''+'/EmindStoreManager/file/'+imgSrc[i].split('file')[1]+'';
		           		$('#lvoxj1 img').eq(i)[0].src = 'http://192.168.30.193/file/'+imgSrc[i].split('file')[1];
		        }
		        document.getElementById('imagePath2').value = imgSrc.join(',');
		        setTimeout(function (){
		        	$('.filelistj1').css('opacity',0);
					$('.filelistj1').css('filter','alpah(opacity=0)');
					document.getElementById('filelistj1').innerHTML =  '';

		        }, 1500);
				
			},

			Error: function(up, err) {
				alert(err.message)
				//document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
			}
		}
	});

	uploaderShot.init();


	// 上传App
	var uploaderApp = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button :'fil', // you can pass an id...//选择添加文件的按钮
		container: document.getElementById('lvoxapp'), // ... or DOM Element itself//添加内容显示的地方
		url:'/EmindStoreManager/appAction/uploadApp?1=1'+addString+updatas,//上传服务器地址
		// url: interface_uri +'uploadify.php',
		flash_swf_url : '../pluploadify/js/Moxie.swf',//flash文件地址
		silverlight_xap_url : '../pluploadify/js/Moxie.xap',
		filters : { //选择文件扩展名的过滤器，每个过滤规则中只有title和 ext
			max_file_size : '800mb',
			mime_types: [
				// {title : "Zip files", extensions : "apk,ipa,pxl,deb,sis,sisx,jar,rar"}
			],
			prevent_duplicates : true //不允许上传重复文件

		},
       
		init: {
			PostInit: function() {

			},

			FilesAdded: function(up, files) {
				plupload.each(files, function(file) {
					document.getElementById('filelistapp').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
				});
				uploaderApp.start();
				$('#lpercent-box').show(0);
				// if (navigator.onLine) {
				// 	alert("有网")
				// 	}else{
				// 	alert("没网");
				// 	};
			},
			UploadProgress: function(up, file) {
				$('#lprecentNumid').html(file.percent+'%');
				var leftNum = parseInt(file.percent/100*$('#lprecentbg').width());

				$('#lprecentbg').css('left',leftNum-$('#lprecentbg').width());
				if(file.percent >= 100){
					$('#lpercent-box').hide(0);
					$('#lprecentbg').css('left',-$('#lprecentbg').width());
				}
			},
			FileUploaded:function (up,file,res){
					
					var ret = JSON.parse(res.response);
					// console.log(ret);
					if(ret.success){


						$('#packageName').html(ret.packageName);
				  		$('#lversion').html(ret.versionNum);
				  		$('#lsdkVersion').html(ret.sdkVersion);
				  		$('#luserPermissions').html(ret.userPermissions);
				  		$('#lfileSize').html(ret.mbSize+'MB');
				  		var lsrc = 'http://192.168.30.193/' +ret.apklogo;
					  	document.getElementById("lappImg").src=lsrc;
					  	document.getElementById('lapklogo').value=ret.apklogo;
					  	document.getElementById("lhpackageName").value = ret.packageName;
					  	document.getElementById("lhversion").value = ret.versionNum;
					  	document.getElementById("lhsdkVersion").value = ret.sdkVersion;
					  	document.getElementById("lhfileSize").value = ret.fileSize;
					  	document.getElementById("lhversion2").value = ret.version;
					  	document.getElementById("apkPath").value = ret.path;
					  	document.getElementById('filename').value = ret.fileName;
					  	setTimeout(function (){
					        	$('.filelistapp').css('opacity',0);
								$('.filelistapp').css('filter','alpah(opacity=0)');
								document.getElementById('filelistapp').innerHTML =  '';
					    }, 1500);
			    	}else {
			    		alert(ret.errMsg);
			    		logintimeout(ret);
			    	}
			    
			},

			

			Error: function(up, err) {
				alert(err.message);
				if(err.message == 'HTTP Error.'){
					$('#lpercent-box').hide(0);
					$('#lprecentbg').css('left',-$('#lprecentbg').width());
				}
				
			}
		}
	});

	uploaderApp.init();

	
	
	//提交表单
	$('#lsubmit').click(function (){
		// alert(document);
		var acnt = window.sessionStorage.getItem('name');
		$('#laccount').val(acnt);
		// 判断是上传App还是重新上传
		var laddAppid;
		if(ledition){
			if(ledition.split('&').length>1){
				// 版本更新的时候执行
				laddAppid = '&appId='+ledition.split('&')[0];
				var url1 = '/EmindStoreManager/appAction/upgradeApp?';
				submitFn(url1);
			}else {
				// 重新提交的时候执行
				laddAppid = '&appId='+ledition.split('&')[0];
				var url2 = '/EmindStoreManager/appAction/addAppInfo?save=0';
				submitFn(url2);
			}
			
		}else {
			// 创建新应用的时候执行
			laddAppid = '';
			var url3 = '/EmindStoreManager/appAction/addAppInfo?save=0';
			
			submitFn(url3);
		}
		function submitFn(url){


			var formDate = $('#lapk-formdata').serialize()+addString+laddAppid;
			$.ajax({
				url: interface_uri + url,
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: formDate,
				 beforeSend: function () {
				 	
	                // ajax请求前调用，验证输入是否完整/
	                if (!checkName()||!checkIns()||!checkgxrz()) {
	                    alert("信息不完整，请补充必填信息！");
	                    // 终止请求发出
	                    return false;
	                }
	                if(!checkKeyword($('#keywords'))&&!checkKeyword($('#keywords2'))&&!checkKeyword($('#keywords3'))){
	                	 alert("信息不完整，请补充必填信息！");
	                	 return false;
	                }
	                if(!$('.lcheck')[0].checked&&!$('.lcheck')[1].checked){
	                	alert("信息不完整，请补充必填信息！");
	                	 return false;
	                }
	                if(!$('.lcheck2')[0].checked&&!$('.lcheck2')[1].checked){
	                	alert("信息不完整，请补充必填信息！");
	                	 return false;
	                }
	              
	                // ajax请求前调用，验证是否已经登陆，如果没有登陆调到首页/
	                panduanDl();
	            },
				success: function (data){
					var ret = JSON.parse(data);
					if(ret.success){
						$('#lsuccess-tsxx').html("创建成功");
						$('#lsuccess-tsxx2').html("恭喜您，创建应用成功！");
						$('.lshade').show(0);
						$('.lsuccess').show(0);
						window.scrollTo(0,0);
						setTimeout(function (){
							window.open("ManagementCenter.html","_self");
						}, 1000);
					}else {
						alert(ret.errMsg);
						logintimeout(ret);
					}
					
				},
				error: function (msgerr){
					// alert("sssss");
					console.log(msgerr)
				}
			})
		}
		
	});

	// 重新上传按钮
	$('#lappreupload').click(function (){

		window.location.reload();
	});
	

});
	//应用分类，分类1 
	function creatBq(data){
		var str = '';
		var str2 = '';
		if(data.type1){
			for(var i = 0; i < data.type1.length; i++){
				str+='<option style="color: #000" value="'+data.type1[i].categoryId+'">'+data.type1[i].name+'</option>';
			}
		}
		return str;
	}
		//应用分类，分类12
	function creatBq2(data,elem){
		var str = '';
		// console.log(elem.value)
		if(data.type2){
			for(var i = 0; i < data.type2.length; i++){
				if(data.type2[i].categoryParentId == elem.value){
					str+='<option style="color: #000" value="'+data.type2[i].categoryId+'">'+data.type2[i].name+'</option>';
				}
			}
		}
		return str;
	}
	function panduanDl(){
		var account = window.sessionStorage.getItem("name");
		// console.log(!account)
		if(!account){
			window.open("index.html","_self");
		}
	}
	// 开发者重新提交应用的时候想应用表单插入以前应用的信息
	function resubmitApp(data){
		var appImgsrc = 'http://192.168.30.193/'+data.apklogo;
		$('#lappImg').attr('src',appImgsrc);//app解析图标
		$('#packageName').html(data.versionName);//版本名称
		$('#lversion').html(data.versionNum);//版本号
		$('#lsdkVersion').html(data.sdkVersion)//系统支持
		$('#lappname').val(data.appname);//应用名称
		var types = data.type.split(',');
		$('#lpcyy').attr('checked',false);
		$('#lsjyy').attr('checked',false);
		for(var i = 0 ; i < types.length; i++){
			if(types[i] == 'p'){
				$('#lpcyy').attr('checked',true);//应用类型
			}
			if(types[i] == 'm'){
				$('#lsjyy').attr('checked',true);//应用类型
			}
		}
		var num1 = Number(String(data.categoryId).substring(2,4))-1;
		if(!isNaN(num1)){
			$('#categoryId')[0].children[num1].selected = true;
		}
		$('#subCategoryId').html(creatBq2(appClassificationarr,$('#categoryId')[0]));
		var num2 = Number(String(data.classicid).substring(3,5))-1;
		if(!isNaN(num2)){
			$('#subCategoryId')[0].children[num2].selected = true;
		}
		$('#introduce').val(data.introduce);//应用简介
		$('#description').val(data.description);//应用描述
		$('#lupdatalog').val(data.versionlog);//更新日志
		$('#lmf').attr('checked',false);
		$('#lsf').attr('checked',false);
		if(data.price == 0){
			$('#lmf').attr('checked',true);//收费描述（免费）
		}else {
			$('#lsf').attr('checked',true);//收费描述（收费）
		}

		if(data.existadv){
			$('#lnqgg').attr('checked',true);//广告状态（内嵌广告）

		}else {
			$('#lwgg').attr('checked',true);//广告状态（无广告）
		}
		var lang = data.language.split(',');
		$('#ljtzw').attr('checked',false);
		$('#lyw').attr('checked',false);
		for(var i = 0; i < lang.length; i++){
			if(lang[i] == 'zh_CN'){
				$('#ljtzw').attr('checked',true);//支持语言（中文）
			}
			if(lang[i] == 'us_EN'){
				$('#lyw').attr('checked',true);//支持语言（英文）
			}
		}
		
		if(data.logoUrl){
			var applogosrc = 'http://192.168.30.193/'+data.logoUrl;
			$('#imagepath').attr('src',applogosrc);//应用图标
		}
		
		if(data.imageUrl1){
			var appshotsrc = 'http://192.168.30.193/'+data.imageUrl1;
			$('#imagepathj1').attr('src',appshotsrc);//应用截图
		}
		if(data.imageUrl2){
			var appshotsrc2 = 'http://192.168.30.193/'+data.imageUrl2;
			$('#file_uploadj11').attr('src',appshotsrc2);//应用截图
		}
		if(data.imageUrl3){
			var appshotsrc3 = 'http://192.168.30.193/'+data.imageUrl3;
			$('#file_uploadj12').attr('src',appshotsrc3);//应用截图
		}
		if(data.imageUrl4){
			var appshotsrc4 = 'http://192.168.30.193/'+data.imageUrl4;
			$('#file_uploadj13').attr('src',appshotsrc4);//应用截图
		}
		if(data.imageUrl5){
			var appshotsrc5 = 'http://192.168.30.193/'+data.imageUrl5;
			$('#file_uploadj14').attr('src',appshotsrc5);//应用截图
		}
		// 在提交表单的时候需要隐藏的一部分东西
		$('#lapklogo').val(data.apklogo);
		$('#lhpackageName').val(data.packageName);
		$('#lhversion2').val(data.versionName);
		$('#lhversion').val(data.versionNum);
		$('#lhsdkVersion').val(data.sdkVersion);
		$('#lhfileSize').val(data.size);
		$('#apkPath').val(data.downloadUrl);
		$('#filename').val(data.originalFileName);
		$('#imagePath2').val(data.imageUrl1+','+data.imageUrl2+','+data.imageUrl3+','+data.imageUrl4+','+data.imageUrl5);
		$('#logoPath').val(data.logoUrl);

	}