$(function (){
		// 判断打开页面后加载的是应用管理还是上传个人（企业）信息
	// usertype: u为普通用户并且没有提交过信息
	// usertype: pp为个人用户已经提交过信息
	// usertype: cp为企业用户已经提交过信息
	// usertype: m为管理员（最高权限）
	
		// 统计数据和应用管理标签之间的切换

	$('.l2-menu-yygl').click(function (){
		var typeT = window.sessionStorage.getItem('usertype');
		var datas = '&page=1&pageSize='+itemNum+addString;
		if(typeT == 'm'){
			return;
		}
		$.ajax({
			url: interface_uri + '/EmindStoreManager/appAction/proApps?1=1'+datas,
			type: 'post',
			data: '',
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					var htm = allApps(ret.apps);
					$('#lyygl-list-wrap').html(htm);
					$('#l2-level-li1s .lcount').html(ret.all);
					$('#l2-level-li2s .lcount').html(ret.online);
					$('#l2-level-li3s .lcount').html(ret.audit0);
					$('#l2-level-li4s .lcount').html(ret.audit2);
					$('#l2-level-li5s .lcount').html(ret.offline);
					typeFn(type);

				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
			},
			error:function (errMsg){
				console.log(errMsg);
			}
		})

		statedupdate();
		tagSwitch($('.l2-menu-yygl'));
	});
	function yyglAjaxRrquest(datax){
		$.ajax({
			url: interface_uri + '/EmindStoreManager/appAction/proApps?1=1'+datax,
			type: 'post',
			data: '',
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					var htm = allApps(ret.apps);
					$('#lyygl-list-wrap').html(htm);
				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
			},
			error:function (errMsg){
				console.log(errMsg);
			}
		})
	}

	// 应用管理中全部标签
	var itemNum = 5;//每一页需要展示应用的数目
	var type = 0;//判断应用管理中分页的类型
	var nowPageNum = 0; //公用用的页码变量
	var nowPageNum1 = 0;//全部页码变量
	var nsNum = 0; //公共的最大页码数
	$('#l2-level-li1s').click(function (){
		var datax = '&page=1&pageSize='+itemNum+addString;
		var _this = $(this);
		tagStyle(_this);
		nowPageNum1 = nowPageNum;
		type = 0;
		typeFn(type);
		$.ajax({
			url: interface_uri + '/EmindStoreManager/appAction/proApps?1=1'+datax,
			type: 'post',
			data: '',
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					var htm = allApps(ret.apps);
					$('#lyygl-list-wrap').html(htm);
				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
			},
			error:function (errMsg){
				console.log(errMsg);
			}
		})
	});
	// 应用管理中已上线标签
	var nowPageNum2 = 0;
	$('#l2-level-li2s').click(function (){
		var _this = $(this);
		tagStyle(_this);
		ajaxRequest(1,itemNum,1);
		nowPageNum2 = nowPageNum;
		type = 1;
		typeFn(type);
	});
	// 应用管理中审核中标签
	var nowPageNum3 = 0;
	$('#l2-level-li3s').click(function (){
		var _this = $(this);
		tagStyle(_this);
		ajaxRequest(1,itemNum,2);
		nowPageNum3 = nowPageNum;
		type = 2;
		typeFn(type);
	});
	// 应用管理中审核未通过标签
	var nowPageNum4 = 0;
	$('#l2-level-li4s').click(function (){
		var _this = $(this);
		tagStyle(_this);
		ajaxRequest(1,itemNum,3);
		nowPageNum4 = nowPageNum;
		type = 3;
		typeFn(type);
	});
	// 应用管理中已下线标签
	var nowPageNum5 = 0;
	$('#l2-level-li5s').click(function (){
		var _this = $(this);
		tagStyle(_this);
		ajaxRequest(1,itemNum,4);
		nowPageNum5 = nowPageNum;
		type = 4;
		typeFn(type);
	});
	function tagStyle(elem){
		elem.children().addClass('activeLeft');
		elem.children().children().addClass('activeRight');
		elem.siblings().children().removeClass('activeLeft');
		elem.siblings().children().children().removeClass('activeRight');
	}
	// 请求每一页应用的ajax
	function ajaxRequest(page,pageSize,tabId){
		var datas = '&page='+page+'&pageSize='+pageSize+'&tabId='+tabId+addString;
		$.ajax({
			url: '/EmindStoreManager/appAction/appsByType',
			type: 'post',
			data: datas,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					var htm = allApps(ret.apps);
					$('#lyygl-list-wrap').html(htm);
				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
			},
			error:function(errMsg) {
				console.log(errMsg);
			}
		});
	}
	// 点击页码翻页
		var allAppn = 0;
		var pageNum = 0; //页码
		var numberPages = 5;
		 // 根据类型来判断需要生成几页
		function typeFn(ts){
			if(type ==1){
				allAppn = getPageNum($('#l2-level-li2s'));
			}else if(type ==2){
				allAppn = getPageNum($('#l2-level-li3s'));
			}else if(type == 3){
				allAppn = getPageNum($('#l2-level-li4s'));
			}else if(type == 4){
				allAppn = getPageNum($('#l2-level-li5s'));
			}else if(type == 0){
				allAppn = getPageNum($('#l2-level-li1s'));
			}
			nsNum = Math.ceil(allAppn/itemNum);
			if(nsNum >=numberPages){
				crearPage(1,numberPages+1,nsNum);
			}else if(nsNum>1&&nsNum<numberPages){
				crearPage(1,nsNum,nsNum);
			}else if(nsNum<=1){
				crearPage(1,2,nsNum);
			}
		}
		
		
		//点击页码进入第几页
		$('#lpagen').bind('click',function (ev){
			if(!isNaN(ev.target.innerHTML)){
				pageTag($(ev.target));

				var numnx = Number(ev.target.innerHTML);
				if(type >=1&&type <=4){
					ajaxRequest(numnx,itemNum,type);
				}else if(type == 0){
					var data = '&page='+numnx+'&pageSize='+itemNum+addString;
					yyglAjaxRrquest(data);
				}
			}
		});
			// 输入页码后点击确定调到第几页
		$('#lpageBtn').click(function (){
			if($('#linputPageNum').val() == ''){
				$('#linputPageNum').val($('#linputPageNum')[0].getAttribute('placeholder'));
			}
			pageNum = Number($('#linputPageNum').val());
			if(!isNaN(pageNum)){

				if(pageNum>allAppn){
					return;
				}
				if(type >=1&&type <=4){
					
					if(pageNum>=nsNum){
						return;
					}else if(pageNum+numberPages>nsNum&&pageNum<=nsNum){
						ajaxRequest(pageNum,itemNum,type);
						nowPageNum = pageNum;
						crearPage(nowPageNum,nsNum+1,nsNum);
					}else if(pageNum+numberPages<=nsNum){
						ajaxRequest(pageNum,itemNum,type);
						nowPageNum = pageNum;
						crearPage(nowPageNum,nowPageNum+numberPages,nsNum);
					}
					
				}else if(type == 0){
					var data = '&page='+pageNum+'&pageSize='+itemNum+addString;
					if(nsNum<=nowPageNum){
						return;
					}else if(pageNum+numberPages>nsNum&&pageNum<nsNum){
						yyglAjaxRrquest(data);
						nowPageNum = pageNum;
						crearPage(nowPageNum,nsNum+1,nsNum);
					}else if(pageNum+numberPages<nsNum){
						yyglAjaxRrquest(data);
						nowPageNum = pageNum;
						crearPage(nowPageNum,nowPageNum+numberPages,nsNum);
					}
				}
				
			}
		});

		// 点击两个方向按钮切换页码
		$('#lpagelist').click(function (ev){
			if(ev.target.innerHTML == '&lt;'){
				nowPageNum = Number($('#lpagen').children().eq(0).html());
				if(!isNaN(nowPageNum)){
					if(nowPageNum>1){
						crearPage(nowPageNum-1,nowPageNum+numberPages-1,nsNum);
					}else {
						return;
					}
				}
			}
			if(ev.target.innerHTML == '&gt;'){
				nowPageNum = Number($('#lpagen').children().eq(0).html());
				if(!isNaN(nowPageNum)){
					if(nsNum>nowPageNum+numberPages-1){
						crearPage(nowPageNum+1,nowPageNum+numberPages+1,nsNum);
					}else {
						return;
					}
				}
			}
		});
	// 
	function pageTag(elem){
		elem.addClass('lpageactive');
		elem.siblings().removeClass('lpageactive');
	}
	// 获取应用的数量
	function getPageNum(elem){
		var num = Number(elem.children().eq(1).html());
		return num;
	}
	// 创建页码
	function crearPage(startNum,endNum,pageNum){
		var str = '';
		for(var i = startNum; i < endNum; i++){
			str += '<a href="javascript:;">'+i+'</a>';
		}
		$('#lpagen').html(str);
	}


	// 统计数据和应用管理标签之间的切换
	$('.l2-menu-sjtj').click(function (){
		statedupdate();
		var datas = ''+addString;
		$.ajax({
			url: interface_uri + '/EmindStoreManager/anaAction/downloadAna?1=1'+addString,
			type: 'post',
			data: datas,
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					$('#lanas1').html(creatTjsj(ret));
					$('#lanas2').html(creatTjsj2(ret));
				}else {
					alert(ret.errMsg);
					logintimeout(ret);
				}
				
			},
			error:function (errMsg){
				alert(errMsg);
			}
		});
		tagSwitch($('.l2-menu-sjtj'));
		
	})

	// 统计数据和账户管理标签之间的切换
	$('.l2-menu-zhgl').click(function (){
		var datas = ''+addString;
		$.ajax({
			url: interface_uri + '/EmindStoreManager/proAction/proInfo?1=1',
			type: 'post',
			data: datas,
			success:function (data){
				var ret = JSON.parse(data);
				if(ret.success){
					var state = ret.state;
					var type = ret.type;
					window.sessionStorage.setItem('usertype',type);
					window.sessionStorage.setItem('state',state);
					if(type == 'pp'){
						$('#lperproId').val(ret.info.personDeveloperId);
					}else if(type == 'cp') {
						$('#lproId').val(ret.info.companyDeveloperId);
					}
					
					if(type == 'pp'){
						// window.sessionStorage.setItem('personDeveloperId',ret.personDeveloperId);
						grformFn(ret.info);
						$("#lzhgl-grkfz").show(0);
						$('#lzhgl-qykfz').hide(0);

						if(state == 0){
							$('#lper-nothrough').addClass('lwsh-shz');
							$('#lper-nothrough').html('审核中');
							$('#laccmanager').find('*').attr('disabled',true);
							$('#lfinanciainfo').attr('disabled',false);
							$('#ldevelopinfo').attr('disabled',false);
							$('#gronregist').hide(0);
						}else if(state == 1){
							$('#lper-nothrough').addClass('lyshtg');
							$('#lper-nothrough').html('审核已通过');
							$('#laccmanager').find('*').attr('disabled',false);
							$('#lcpaccount').attr('disabled',true);
							$('#lppaccount').attr('disabled',true);
							$('#gronregist').show(0);
						}else if(state == 2){
							$('#lper-nothrough').addClass('lwsh-shz');
							$('#lper-nothrough').html('审核未通过');
				
							$('#laccmanager').find('*').attr('disabled',false);
							$('#lcpaccount').attr('disabled',true);
							$('#lppaccount').attr('disabled',true);
							$('#gronregist').show(0);
						}
					}else if(type == 'cp'){
						$('#lzhgl-qykfz').html(cpcontent(ret.info));
						$('#lzhgl-qykfz').show(0);
						$("#lzhgl-grkfz").hide(0);
						if(state == 0){
							
							$('#lcp-nothrough').addClass('lwsh-shz');
							$('#lcp-nothrough').html('审核中');
							$('#laccmanager').find('*').attr('disabled',true);
							$('#lfinanciainfo').attr('disabled',false);
							$('#ldevelopinfo').attr('disabled',false);
							$('#onregist').hide(0);
						}else if(state == 1){
							$('#lcp-nothrough').addClass('lyshtg');
							$('#lcp-nothrough').html('审核通过');
							$('#laccmanager').find('*').attr('disabled',false);
							$('#lcpaccount').attr('disabled',true);
							$('#lppaccount').attr('disabled',true);
							$('#onregist').show(0);
						}else if(state == 2){
						
							$('#lcp-nothrough').addClass('lwsh-shz');
							$('#lcp-nothrough').html('审核未通过');
							$('#laccmanager').find('*').attr('disabled',false);
							$('#lcpaccount').attr('disabled',true);
							$('#lppaccount').attr('disabled',true);
							$('#onregist').show(0);
						}
					}

           		}else {
           			alert(ret.errMsg);
           			logintimeout(ret);
           		}
			},
			error:function (errMsg){
				alert(errMsg);
			}
		})
		tagSwitch($('.l2-menu-zhgl'));
		statedupdate();
		
	});
	// 
	$('.l2-menu-zhgl').trigger('click');
	// 财务结算和应用管理标签之间切换l2-menu-cwjs
	$('.l2-menu-cwjs').click(function (){
		tagSwitch($('.l2-menu-cwjs'));
		statedupdate();
	});

	function tagSwitch(elem){
		elem.addClass('lactive');
		elem.siblings().removeClass('lactive');
		var numx = elem.parent().children().index(elem);
		$('#lcontent-wrap').children('div').hide(0);
		$('#lcontent-wrap').children('div').eq(numx).show(0);
	}
	// 固定几个事件发生的时候重新获取state更改开发者的状态
	function statedupdate(){
		$.ajax({
			url: interface_uri + '/EmindStoreManager/proAction/proInfo?1=1'+addString,
			type: 'post',
			data: '',
			success: function (data){
				var ret = JSON.parse(data);
				window.sessionStorage.setItem('state',ret.state);
			},
			error: function (errMsg){
				// alert(errMsg);
			}
		});
	}

	// 在进入管理中心后点击创建新应用
	var usertype = window.sessionStorage.getItem('usertype');
	if(usertype == 'm'){
		return;
	}else {
		$('#creatApp2').show(0);
	}
	$('#creatApp2').click(function (){
		window.sessionStorage.removeItem('resubmitAppid');
		statedupdate()
		if(usertype == 'u'){
			window.open('selecttype.html','_self');
			
		}else if(usertype == 'pp'||usertype == 'cp'){
			var state = sessionStorage.getItem("state");
			if(state == 0){
				// 未审核
				$('#laccmanager').find('*').attr('disabled',true);
				$('#lfinanciainfo').attr('disabled',false);
				$('#ldevelopinfo').attr('disabled',false);
				$('#lviewexm1').attr('disabled',false);
				$('#lviewexm2').attr('disabled',false);
				$('#lviewexm3').attr('disabled',false);
				$('.lcpsubmitbtn').addClass('lcolorF4');
				$('.lppsubmitbtn').addClass('lcolorF4');
			}else if(state == 1){
				// 审核通过
				$('#laccmanager').find('*').attr('disabled',false);
				$('#lcpaccount').attr('disabled',true);
				$('#lppaccount').attr('disabled',true);
				$('.lcpsubmitbtn').removeClass('lcolorF4');
				$('.lppsubmitbtn').removeClass('lcolorF4');

				window.open('personalupload.html','_self');

			}else if(state == 2){
				// 审核不通过
				$('#laccmanager').find('*').attr('disabled',false);
				$('#lppaccount').attr('disabled',true);
				$('#lcpaccount').attr('disabled',true);
				$('.lcpsubmitbtn').removeClass('lcolorF4');
				$('.lppsubmitbtn').removeClass('lcolorF4');
				
			}
		}else if(usertype == 'm'){
			return;
		}
	});
	// 点击查看示例1
	viewInstance($('#lviewexm1'),$('#llookimg2'));
	// 点击查看示例2
	viewInstance($('#lviewexm2'),$('#llookimg6'));
	// 点击查看示例3 lviewexm3
	viewInstance($('#lviewexm3'),$('#llookimg4'));
	// 查看实例
	function viewInstance(btn,elem){
		btn.bind('mouseover',function (){
			elem.show(0);
		});
		btn.bind('mouseout',function (){
			elem.hide(0);
		})
	}

	// 上传营业执照
    var uploaderyyzz = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'file_upload', //选择添加文件的按钮
        container: document.getElementById('lvoxyyzz'), //添加内容显示的地方
        url : '/EmindStoreManager/proAction/uploadBussLicense?1=1'+addString,//上传服务器地址
        flash_swf_url : '../pluploadify/js/Moxie.swf',//flash文件地址
        silverlight_xap_url : '../pluploadify/js/Moxie.xap',
        multi_selection: false,
        multiple_queues: true,
        // headers: {'Access-Control-Allow-Origin':'*'},
        filters : { //选择文件扩展名的过滤器，每个过滤规则中只有title和 ext
            max_file_size : '1mb',
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"},

            ],
            prevent_duplicates : true //不允许上传重复文件
        },

        init: {

            PostInit: function() {
                
            },

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    document.getElementById('filelistzzyy').innerHTML += '<div class="lfilelist" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });
                uploaderyyzz.start();
            },

            UploadProgress: function(up, file) {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = file.percent + "%";
                    if(file.percent == 100){
                        $('#lhide-sendyyzz').hide(0);
                         
                    }
            },
            FileUploaded:function (up,file,res){
                setTimeout(function (){
                    $('.lfilelist').css('opacity',0);
                    $('.lfilelist').css('filter','alpah(opacity=0)');
                    document.getElementById('filelistzzyy').innerHTML ='';
                    }, 1500);
                  var ret = eval('(' + res.response + ')');
                    document.getElementById("imagepath").value=ret.path;
                    var businesslicensesrc = 'http://192.168.30.193/file'+ret.path.split('file')[1];
                     $('#llookimg5').attr('src',businesslicensesrc);
            },

            Error: function(up, err) {
                alert(err.message);
            }
        }
    });

    uploaderyyzz.init();

     // 上传税务登记证
    var uploaderswdjz = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'file_upload2', //选择添加文件的按钮
        container: document.getElementById('lvoxswdjz'), //添加内容显示的地方
        url : '/EmindStoreManager/proAction/uploadTaxLicense?1=1'+addString,//上传服务器地址
        flash_swf_url : '../pluploadify/js/Moxie.swf',//flash文件地址
        silverlight_xap_url : '../pluploadify/js/Moxie.xap',
        multi_selection: false,
        multiple_queues: true,
        // headers: {'Access-Control-Allow-Origin':'*'},
        filters : { //选择文件扩展名的过滤器，每个过滤规则中只有title和 ext
            max_file_size : '1mb',
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"},

            ],
            prevent_duplicates : true //不允许上传重复文件
        },

        init: {

            PostInit: function() {
              
            },

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    document.getElementById('filelistswdjz').innerHTML += '<div class="lfilelist" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });
                uploaderswdjz.start();
            },

            UploadProgress: function(up, file) {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = file.percent + "%";
                    if(file.percent == 100){
                        $('#lhide-sendswdjz').hide(0);
                         
                    }
            },
            FileUploaded:function (up,file,res){
                setTimeout(function (){
                    $('.lfilelist').css('opacity',0);
                    $('.lfilelist').css('filter','alpah(opacity=0)');
                    document.getElementById('filelistswdjz').innerHTML ='';
                    }, 1500);
                 var ret = eval('(' + res.response + ')');
            document.getElementById("imagepath2").value=ret.path;
            var taxregsrc = 'http://192.168.30.193/file'+ret.path.split('file')[1];
             $('#llookimg3').attr('src',taxregsrc);
            },

            Error: function(up, err) {
                alert(err.message);
              
            }
        }
    });

    uploaderswdjz.init();

    $("#onregist").click(function(){
    	if($('#lcp-nothrough').html() == '审核中' ){
    		return;
    	}
        // 点击此事件的具体操作。
        var formData1 = $("#form").serialize();
        var formData2 = $("#formtwo").serialize();
        var formData = formData1+"&"+formData2+addString;
        $.ajax({
            async : true,
            url: interface_uri + "/EmindStoreManager/proAction/addComPro",
            type: "post",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: formData,
            beforeSend: function () {
                // ajax请求前调用，验证输入是否完整/
                if (!(cpbankName()&&computerName()&&computerPayName()&&computerEmail()&&checkPhone()&&computerQq()&&checkTaxNum()&&checkLicenseNum()&&checkBankNum()&&checkFinanceEmail()&&checkFinanceMobile()&&checkFinanceName()&&checkcpwebsite())){
                   if(!(computerPayName()&&cpbankName()&&checkBankNum()&&checkTaxNum()&&checkFinanceName()&&checkFinanceEmail()&&checkFinanceMobile())){
                         $('.menu').children('input').eq(1).trigger('click');
                   }
                    alert("信息不完整，企业信息有两页请补充必填信息！");
                    // 终止请求发出
                    return false;
                }
                if(!$('#lcparree')[0].checked){
                	alert("阅读并同意条款未选");
                	return false;
                }


            },
            success: function (ret) {
                var ret2 = eval("("+ret+")");
                 if(ret2.success){
                 	 // window.sessionStorage.setItem('comproId',ret2.proId);
                 	 $('#lsuccess-tsxx').html("提交提示");
                    $('#lsuccess-tsxx2').html('恭喜你,提交成功！');
                    $('.lshade').show(0);
                    $('.lsuccess').show(0);
                     window.scrollTo(0, 0);
                    setTimeout(function (){
                        $('.lshade').hide(0);
                        $('.lsuccess').hide(0);
                         $('.l2-menu-zhgl').trigger('click');
                    }, 600);
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
	 // 点击开发者信息和企业财务信息切换
    $('.menu').children('input').eq(0).click(function (){
        $('#lkfaxx').show(0);
        $('#lcwxx').hide(0);
        $(this).css('backgroundColor','#3385ff');
        $(this).css('color','#fff');
        $('.menu').children('input').eq(1).css('backgroundColor','#fff');
        $('.menu').children('input').eq(1).css('color','#3385ff');
    });
    $('.menu').children('input').eq(1).click(function (){
        $('#lkfaxx').css({'display':'none'});
         $('#lcwxx').css({'display':'block'});
        $(this).css('backgroundColor','#3385ff');
        $(this).css('color','#fff');
        $('.menu').children('input').eq(0).css('backgroundColor','#fff');
        $('.menu').children('input').eq(0).css('color','#3385ff');
    });
    // 出品人初步验证
    $('#lcpcpr').bind('blur',cppublisher);
    // 验证企业名称
    $('#lcpname').bind('blur',computerName);
    // 验证营业执照号
    $('#lcplicenseNum').bind('blur',checkLicenseNum);
    // 验证电子邮箱
    $('#lcpemail').bind('blur',computerEmail);
    // 验证手机号码
    $('#lcpMobile').bind('blur',checkPhone);
    // 验证qq号
    $('#lcpqqnum').bind('blur',computerQq);
    // 验证开发者网站地址
    $('#lcpwebsite').bind('blur',checkcpwebsite);
    // 验证收款方户名
    $('#lcppayeeName').bind('blur',computerPayName);
    //验证银行名称
    $('#lcpbankName').bind('blur',cpbankName);
    // 验证银行账号
    $('#lcpbankAccount').bind('blur',checkBankNum);
    // 验证税务登记证号
    $('#lcptaxNum').bind('blur',checkTaxNum);
    // 验证财务联系人
    $('#lfinanceContacts').bind('blur',checkFinanceName);
    // 验证财务邮箱
    $('#lfinanceEmail').bind('blur',checkFinanceEmail);
    // 验证财务手机号
    $('#lfinanceMobile').bind('blur',checkFinanceMobile);
    // 验证开户行全称
    $('#lcpopenedBank').bind('blur',checkcpbankFullName);
     // 对企业开发者座机号验证
    $('#lcplandline').bind('blur',function (){
    	checkpplandline($('#lcplandline'));
    });



    // 个人注册信息
    // 上传证件照
    var uploaderzjz = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'grfile_upload', // you can pass an id...//选择添加文件的按钮
        container: document.getElementById('lvoxzjz'), // ... or DOM Element itself//添加内容显示的地方
        url : '/EmindStoreManager/proAction/uploadIDCard?1=1'+addString,//上传服务器地址
        // url: interface_uri +'uploadify.php',
        flash_swf_url : '../pluploadify/js/Moxie.swf',//flash文件地址
        silverlight_xap_url : '../pluploadify/js/Moxie.xap',
        multi_selection: false,
        multiple_queues: true,
        // headers: {'Access-Control-Allow-Origin':'*'},
        filters : { //选择文件扩展名的过滤器，每个过滤规则中只有title和 ext
            max_file_size : '1mb',
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"},

            ],
            prevent_duplicates : true //不允许上传重复文件
        },

        init: {

            PostInit: function() {
               
            },

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    document.getElementById('filelistzjz').innerHTML += '<div class="lfilelist" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });
                uploaderzjz.start();
            },

            UploadProgress: function(up, file) {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = file.percent + "%";
                    if(file.percent == 100){
                        $('#lhide-sendzjz').hide(0);
                         
                    }
            },
            FileUploaded:function (up,file,res){
                setTimeout(function (){
                    $('.lfilelist').css('opacity',0);
                    $('.lfilelist').css('filter','alpah(opacity=0)');
                    document.getElementById('filelistzjz').innerHTML =  '';
                    }, 1500);
                    var ret = eval('(' + res.response + ')');
                    var applogsrc = 'http://192.168.30.193/file/'+ret.path.split('file')[1];
                    $('#llookimg').attr('src',applogsrc);
                    document.getElementById("grimagepath").value=ret.path;
            },

            Error: function(up, err) {
                alert(err.message);
                // document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
            }
        }
    });

    uploaderzjz.init();
    // 个人注册信息提交
    $("#gronregist").click(function(){
        // 点击此事件的具体操作。
    	if($('#lper-nothrough').html() == '审核中' ){
    		return;
    	}
        var formData = $("#grform").serialize()+addString;
        $.ajax({
            async : true,
            url: interface_uri + "/EmindStoreManager/proAction/addPerPro",
            type: "post",
            data: formData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend: function () {
                // ajax请求前调用，验证输入是否完整/
               
                if (!(checkName()&&checkEmail()&&checkCellphone()&&checkId()&&checkQq()&&checkperwebsite())) {
                    alert("信息不完整，请补充必填信息");
                    // 终止请求发出
                    return false;
                }
                if(!$('#lpparree')[0].checked){
                	alert("阅读并同意条款未选");
                	return false;
                }
            },
            success: function (ret) {
                var ret2 = eval("("+ret+")");
                
                if(ret2.success){
                	$('#lsuccess-tsxx').html("提交提示");
                    $('#lsuccess-tsxx2').html('恭喜你,提交成功！');
                    $('.lshade').show(0);
                    $('.lsuccess').show(0);
                    window.scrollTo(0, 0);
                    setTimeout(function (){
                        $('.lshade').hide(0);
                        $('.lsuccess').hide(0);
                        $('.l2-menu-zhgl').trigger('click');
                    }, 600);
                }else {
                    alert(ret2.errMsg);
                }  
            },
            error: function (errMsg) {
                console.log(errMsg)
            }
        });
    });
    // 对姓名的验证
    $('#lppdevname').bind('blur',checkName);
    // 对身份证的验证
    $('#lppcardid').bind('blur',checkId);
    // 对邮箱的验证
    $('#lppemail').bind('blur',checkEmail);
    // 对手机号的验证
    $('#lppmobile').bind('blur',checkCellphone);
    // 对qqh号的验证
    $('#lppqqnum').bind('blur',checkQq);
    // 对开发者网站地址的验证
    $('#lperwebsite').bind('blur',checkperwebsite);
    // // 对开发者座机号验证
    $('#lpplandline').bind('blur',function (){
    	checkpplandline($('#lpplandline'));
    });
    // 点击重新提交跳转到上传App页面重新提交
    $('#lyygl-list-wrap').click(function (ev){
    	statedupdate();
    	var staten = window.sessionStorage.getItem('state');
    	if(staten != 1){
    		return;
    	}
    	if(ev.target.innerHTML == '重新提交'){
    		var resubmitAppid = ev.target.getAttribute('index',2);
    		window.sessionStorage.setItem('resubmitAppid',resubmitAppid);
    		window.open('personalupload.html','_self');
    	}
    	if(ev.target.innerHTML == '版本更新'){
    		var resubmitAppid = ev.target.getAttribute('index',2);
    		window.sessionStorage.setItem('resubmitAppid',resubmitAppid+'&Edition');
    		window.open('personalupload.html','_self');
    	}
    	if(ev.target.innerHTML =='修改应用信息'){
    		var resubmitAppid = ev.target.getAttribute('index',2);
    		window.sessionStorage.setItem('resubmitAppid',resubmitAppid);
    		window.open('personalupload.html','_self');
    	}
    	ev.preventDefault();
    });

});
 // select下拉框
    function creatOption(data,num){
        var str1 = '';
        num = Number(num)-1;
        for(var j = 0; j< data[num].city[0].length;j++){
            str1 += '<div vals="'+data[num].city[0][j]+'">'+data[num].city[1][j]+'</div>';
        }
        return str1;
    }
    function creatOption2(data){
        var stsr = '';
        for(var i = 0; i < data.length;i++){
            stsr +='<div vals="'+data[i].cityCode+'">'+data[i].cityName+'</div>';
        }
        return stsr;
    }
    function creatSelect(name){
        var s = '';
        s+='<input  type="hidden" name="'+name+'" >';
        s+='<div class="licon"><div class="ltriangle"></div></div>';
        s+='<div style="display:none;" class="loption" ></div>';
        s+='<div class="lselect-txt"></div>';
        return s;
    };
    function optionStyle(elem){
        elem.siblings().removeClass('selectColor');
        elem.addClass('selectColor');   
    }
    function selectFn(id,name,func,indexNum,indexNum2){
            id.html(creatSelect(name));
            id.children().eq(2).html(func);
            id.unbind('click').bind('click',function (ev){
                if(id.children().eq(2)[0].style.display == 'none'){
                    id.children().eq(2).show(0);
                }else if(id.children().eq(2)[0].style.display == 'block'){
                    id.children().eq(2).hide(0);
                }
                if(!!ev.target.getAttribute('vals',2)){
                    id.children().eq(2).show(0);
                    id.children().eq(3).html(ev.target.innerHTML);
                    id.children().eq(0).val(ev.target.getAttribute('vals',2));
                    if(ev.target.getAttribute('vals',2).length<=2){
                        var ns = ev.target.getAttribute('vals',2);
                        if(id[0].id == 'lcpregistPro'){
                            selectFn($('#lcpregistCity'),'registCity',creatOption(cityArr,ns),1)();
                        }else if(id[0].id == 'lcpcontactsPro'){
                            selectFn($('#lcpcontactsCity'),'contactsCity',creatOption(cityArr,ns),1)();
                        }else if(id[0].id == 'lcpopenedBankPro'){
                            selectFn($('#lcpopenedBankCity'),'openedBankCity',creatOption(cityArr,ns),1)();
                        }else if(id[0].id == 'lpercity1'){
                        	selectFn($('#lpercity2'),'city',creatOption(cityArr,ns),1)();
                        }
                    }
                    id.children().eq(2).hide(0);        
                }
                ev.originalEvent.cancelBubble = true;
            });
            id.unbind('mouseover').bind('mouseover',function (ev){
                if(!!ev.target.getAttribute('vals',2)&&ev.target.tagName == 'DIV'){
                    optionStyle($(ev.target));
                }
                ev.cancelBubble = true;
            });
            $(document).click(function (){
                id.children().eq(2).hide(0);
            });
            return function (){
                if(!isNaN(indexNum)){
                    indexNum = Number(indexNum)-1;
                    if(indexNum>=0&&indexNum<=id.children().eq(2).children().length){
                    	if(id.children().eq(2).children()[indexNum]){
	                        id.children().eq(2).children()[indexNum].setAttribute('selected', true);
	                        id.children().eq(3).html(id.children().eq(2).children()[indexNum].innerHTML);
	                        id.children().eq(0).val(id.children().eq(2).children()[indexNum].getAttribute('vals',2));
	                        if(id.children().eq(2).children()[indexNum].getAttribute('vals',2).length<=2){
	                            var ns = id.children().eq(2).children()[indexNum].getAttribute('vals',2);
	                            if(id[0].id == 'lcpregistPro'){
	                                selectFn($('#lcpregistCity'),'registCity',creatOption(cityArr,ns),indexNum2)();
	                            }else if(id[0].id == 'lcpcontactsPro'){
	                                selectFn($('#lcpcontactsCity'),'contactsCity',creatOption(cityArr,ns),indexNum2)();
	                            }else if(id[0].id == 'lcpopenedBankPro'){
	                                selectFn($('#lcpopenedBankCity'),'openedBankCity',creatOption(cityArr,ns),indexNum2)();
	                            }else if(id[0].id == 'lpercity1'){
	                            	selectFn($('#lpercity2'),'city',creatOption(cityArr,ns),indexNum2)();
		                        }
	                        }
                        }
                    }
                }
            }        
    }
function creatTjsj(index){
	if(!index.anas){
		return ;
	}
	var str = '';
		str+='<li class="lcount-list-li floatl">';
		str+='<h4 class="ljs-num">'+index.anas[0].day1Count+'</h4>';
		str+='<p>累计下载数量</p>';
		str+='</li>';
		str+='<li class="lcount-list-li floatl">';
		str+='<h4 class="ljs-num">'+index.anas[0].day1Earn+'</h4>';
		str+='<p>昨日下载数量</p></li>';
		str+='<li class="lcount-list-li floatl">';
		str+='<h4 class="ljs-num">'+index.anas[0].day7Count+'</h4>';
		str+='<p>最近一周下载数量</p></li>';
		str+='<li class="lcount-list-li floatl">';
		str+='<h4 class="ljs-num">'+index.anas[0].day30Count+'</h4>';
		str+='<p>最近一个月下载数量</p>';
		str+='</li>';
		str+='<li class="lcount-list-li floatl lmarginr">';
		str+='<h4 class="ljs-num">'+index.anas[0].totalCount+'</h4>';
		str+='<p >昨日总收入</p>';
		str+='</li>';
	return str
}
function creatTjsj2(index){
	var str = '';
	if(!index.anas){
		return ;
	}
	for(var i =1;i< index.anas.length; i++){
		str+='<li class="lyym-app-li clearfix">';
		str+='<h4 class="floatl lli-width1"><a href="javascript:;">'+index.anas[i].appName+'</a></h4>';
		str+='<p class="lyym-count floatl lli-width2">'+index.anas[i].day1Count+'</p>';
		str+='<p class="lyym-count floatl lli-width3">'+index.anas[i].day1Earn+'</p>';
		str+='<p class="lyym-count floatl lli-width4">'+index.anas[i].day7Count+'</p>';
		str+='<p class="lyym-count floatl lli-width5">'+index.anas[i].day30Count+'</p>';
		str+='<p class="lyym-count floatl lli-width6">'+index.anas[i].totalCount+'</p>';
		str+='<div class="lbtn floatl">';
		str+='<a href="javascript:;">详情</a>';
		str+='</div></li>';
	}
	return str;
}
// 获取到后台个人信息后生成
function grformFn(data){
	// var str = ''
	if(!data){
		return ;
	}
	// 将城市的编号变为具体城市名称
	var city = data.address;
	var num1 = Number(city.split('/')[0]);
	var num2 = Number(city.substring(5,7));
	if(isNaN(num1)){
		num1 = 1;
	}
	if(isNaN(num2)){
		num2 = 1;
	}
	var name = window.sessionStorage.getItem('name');
	$('#lppaccount').val(name);
	selectFn($('#lpercity1'),'province',creatOption2(cityArr),num1,num2)();
	$('.lgr-address').val(city.split('/')[2]);
	$('.lgr-email').val(data.email);
	$('#lpplandline').val(data.fixedTelephone);
	$('.lgr-idcardnum').val(data.idCardNumber);
	$('.lgr-mobile').val(data.mobile);
	$('.lgr-qq').val(data.qq);
	$('.lgr-realname').val(data.realname);
	$('.lgr-teamname').val(data.teamname);
	$('#lperwebsite').val(data.website);
	var applogsrc = 'http://192.168.30.193/file/'+data.idCardPath.split('file')[1];
	$('#llookimg').attr('src',applogsrc);
	$('#grimagepath').val(data.idCardPath);


}
	// 获取到后台企业信息后生成
function cpcontent(data){

    var name2 = window.sessionStorage.getItem('name');
   
    $('#lcpaccount').val(name2);
    $('#lcpname').val(data.companyName);
    $('#lcpcpr').val(data.publisher);
     var lsrc1 ='http://192.168.30.193/file/'+data.businessLicencePath.split('file')[1];
    $('#llookimg5').attr('src',lsrc1);
    $('#imagepath').val(data.businessLicencePath);
    $('#lcplicenseNum').val(data.businessRegisteredNumber);
    var rezAdd = data.businessRegisteredAddress;
    var snum1 = Number(rezAdd.substring(0,2));
    var snum2 = Number(rezAdd.substring(4,6));
    if(isNaN(snum1)){
		snum1 = 0;
	}
	if(isNaN(snum2)){
		snum2 = 0;
	}
    selectFn($('#lcpregistPro'),'registPro',creatOption2(cityArr),snum1,snum2)();
    $('#lcpregaddress').val(rezAdd.substring(6,rezAdd.length));
    var bankAdd = data.openedBankArea;
    var bankNum1 =Number(bankAdd.substring(0,2));
    var bankNum2 = Number(bankAdd.substring(4,6));
    if(isNaN(bankNum1)){
		bankNum1 = 0;
	}
	if(isNaN(bankNum2)){
		bankNum2 = 0
	}
	 selectFn($('#lcpopenedBankPro'),'openedBankPro',creatOption2(cityArr),bankNum1,bankNum2)();
    $('#lcpemail').val(data.email);



    var peoAdd = data.contactsAddress;
    var peoNum1 = Number(peoAdd.substring(0,2));
    var peoNum2 = Number(peoAdd.substring(4,6));
    if(isNaN(peoNum1)){
		peoNum1 = 0;
	}
	if(isNaN(peoNum2)){
		peoNum2 = 0;
	}
	selectFn($('#lcpcontactsPro'),'contactsPro',creatOption2(cityArr),peoNum1,peoNum2)();
    $('#lcpcontactsAddress').val(peoAdd.substring(6,peoAdd.length));
   
    $('#lcpMobile').val(data.contactMobile);
    $('#lcplandline').val(data.fixedNumber);
    $('#lcpqqnum').val(data.qq);
    $('#lcpwebsite').val(data.website);
    // $('#lcppayeename').val(data.payeeName);
    // 不清楚为什么设置了却添加不了内容
    $('#lcppayeeName')[0].value = data.payeeName;
    $('#lcpbankName').val(data.bankName);
  
    $('#lcpopenedBank').val(data.openedBankFullname);
    $('#lcpbankAccount').val(data.bankAccount);
     var lsrc2 ='http://192.168.30.193/file/'+data.taxRegistlicensePath.split('file')[1];
    $('#llookimg3').attr('src',lsrc2);
    $('#imagepath2').val(data.taxRegistlicensePath);
    $('#lcptaxNum').val(data.taxRegistrationNumber);
    // 是否开具增值税专用发票
    if(!data.isSpecialInvoice){
        $('#lcpisSpecialInvoicet').attr('checked',false);
        $('#lcpisSpecialInvoicef').attr('checked',true);
    }else {
        $('#lcpisSpecialInvoicef').attr('checked',false);
        $('#lcpisSpecialInvoicet').attr('checked',true);
    }
    
    
    $('#lfinanceContacts').val(data.financeContacts);
    $('#lfinanceEmail').val(data.financeEmail);
     $('#lfinanceMobile').val(data.financeMobile);


}


// 点击引用管理后出现已经上传的App
// 开发者全部应用列表（点击线上管理后显示开发者所有的App）
// 审核状态（creditState）： 0未审核; 1审核通过;2审核未通过
// 发布状态（publishState）：0未上架，1发布，2暂停，3下架
var arrysx2 = [];
var arrwsh2 = [];
var arrshz2 = [];
var offLineArr = []; //存放已经下线的App
function allApps(index){
	var lstr = '';
	arrysx2.length = 0;
	arrwsh2.length = 0;
	arrshz2.length = 0;
	offLineArr.length = 0;
	if(!index){
		return ;
	}
	for(var i=0; i< index.length; i++){
		if(index[i].creditState == 1&&index[i].publishState == 1){
			var str1 = '';
			str1+='<li class="lli-box clearfix">';
			str1+='<a class="limgwrap floatl" href="javascript:;">';
			str1+='<img src="http://192.168.30.193/'+index[i].logoUrl+'" alt="">';
			str1+='</a>';
			str1+='<p class="lgame-name floatl">';
			str1+='<a class="lname" href="javascript:;">';
			str1+=''+index[i].appname+'';
			str1+='</a>';
			str1+='<a class="lgame-version" href="javascript:;">';
			str1+='应用版本：'+index[i].versionName+'';
			str1+='</a>';
			str1+='</p>';
			str1+='<div class="lgame-state floatl">';
			str1+='<p>';
			str1+='<a class="lysx" href="javascript:;">';
			str1+='已上线';
			str1+='</a>';
			str1+='</p>';
			str1+='</div>';
			str1+='<div class="lappxq">';
			str1+='<a index="'+index[i].appid+'" class="lupdate" href="javascript:;">';
			str1+='版本更新';
			str1+='</a>';
			str1+='<a index="'+index[i].appid+'" class="lamend" href="javascript:;">';
			str1+='修改应用信息';
			str1+='</a>';
			str1+='</div>';
			str1+='</li>';
			arrysx2.push(str1);
		}else if(index[i].creditState == 0){
			var str2 = '';
			str2+='<li class="lli-box clearfix">';
			str2+='<a class="limgwrap floatl" href="javascript:;">';
			str2+='<img src="http://192.168.30.193/'+index[i].logoUrl+'" alt="">';
			str2+='</a>';
			str2+='<p class="lgame-name floatl">';
			str2+='<a class="lname" href="javascript:;">';
			str2+=''+index[i].appname+'';
			str2+='</a>';
			str2+='<a class="lgame-version" href="javascript:;">';
			str2+='应用版本：'+index[i].versionName+'';
			str2+='</a>';
			str2+='</p>';
			str2+='<div class="lgame-state floatl">';

			str2+='<p>';
			str2+='<a class="lysx lshz" href="javascript:;">';
			str2+='审核中';
			str2+='</a>';
			str2+='</p>';
			str2+='</div>';
			str2+='<div class="lappxq">';
			str2+='</div>';
			str2+='</li>';
			arrshz2.push(str2);

		}else if(index[i].creditState == 2){
			var str3 = '';
			str3+='<li class="lli-box clearfix">';
			str3+='<a class="limgwrap floatl" href="javascript:;">';
			str3+='<img src="http://192.168.30.193/'+index[i].logoUrl+'" alt="">';
			str3+='</a>';
			str3+='<p class="lgame-name floatl">';
			str3+='<a class="lname" href="javascript:;">';
			str3+=''+index[i].appname+'';
			str3+='</a>';
			str3+='<a class="lgame-version" href="javascript:;">';
			str3+='应用版本：'+index[i].versionName+'';
			str3+='</a>';
			str3+='</p>';
			str3+='<div class="lgame-state floatl">';
			str3+='<p>';
			str3+='<a class="lysx lshwtg" href="javascript:;">';
			str3+='审核未通过';
			str3+='</a>';
			str3+='</p>';
			str3+='<p class="lckyy clearfix">';
			str3+='<a class="floatl" href="javascript:;">查看问题原因/</a>';
			str3+='<a class="floatl" href="javascript:;">重新发布</a>';
			str3+='</p>';
			str3+='</div>';
			str3+='<div class="lappxq">';
			str3+='<a index="'+index[i].appid+'" class="lupdate" href="javascript:;">';
			str3+='重新提交</a>';
			str3+='</div>';
			str3+='</li>';
			arrwsh2.push(str3);
		
		}else if(index[i].creditState == 1&&index[i].publishState == 3){
			var str4 = '';

			str4+='<li class="lli-box clearfix">';
			str4+='<a class="limgwrap floatl" href="javascript:;">';
			str4+='<img src="http://192.168.30.193/'+index[i].logoUrl+'" alt="">';
			str4+='</a>';
			str4+='<p class="lgame-name floatl">';
			str4+='<a class="lname" href="javascript:;">';
			str4+=''+index[i].appname+'';
			str4+='</a>';;
			str4+='<a class="lgame-version" href="javascript:;">';
			str4+='应用版本：'+index[i].versionName+'';
			str4+='</a>';
			str4+='</p>';
			str4+='<div class="lgame-state floatl">';
			str4+='<p>';
			str4+='<a class="lysx" href="javascript:;">';
			str4+='已下线';
			str4+='</a>';
			str4+='</p>';
			str4+='</div>';
			str4+='<div class="lappxq">';
			// str4+='<a index="'+index[i].appid+'" class="lupdate" href="javascript:;">';
			// str4+='版本更新';
			// str4+='</a>';
			str4+='<a index="'+index[i].appid+'" class="lamend" href="javascript:;">';
			str4+='修改应用信息';
			str4+='</a>';
			str4+='</div>';
			str4+='</li>';
			offLineArr.push(str4);

		}
	}
	var lstr = offLineArr.join('')+arrwsh2.join('')+arrshz2.join('')+arrysx2.join('');
	return lstr;
	
}

function cpbankName (){
    var v =  $('#lcpbankName').val();
    var s = /^[\u4e00-\u9fa5]{4,64}$/.test(v);
    if(s){
        $('#lcpbankName').next().addClass('lduigoud');
        $('#lcpbankName').next().removeClass('lduigoux');
        return true;
    }else {
        $('#lcpbankName').next().addClass('lduigoux');
        $('#lcpbankName').next().removeClass('lduigoud');
        return false;
    }
}
function cppublisher(){
    // 出品人的验证
        var v =  $('#lcpcpr').val();
        var s = /^[\w\u4e00-\u9fa5]{0,20}$/.test(v);
        if(s){
            $('#lcpcpr').next().addClass('lduigoud');
            $('#lcpcpr').next().removeClass('lduigoux');
        }else {
            $('#lcpcpr').next().addClass('lduigoux');
            $('#lcpcpr').next().removeClass('lduigoud');
        }
}
function computerName (){
    //对企业名的验证
    var myreg = /^[\u4e00-\u9fa5]{4,64}$/;
    if (!myreg.test($("#lcpname").val()))
    {
        $('#fff').addClass('lduigoux');
        $('#fff').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#fff').addClass('lduigoud');
        $('#fff').removeClass('lduigoux');
        return true;
    }
}
function computerPayName (){
    //对收款户名的验证
    var myreg = /^[\u4e00-\u9fa5]{1,64}$/;
    if (!myreg.test($("#lcppayeeName").val()))
    {
        $('#kkk').addClass('lduigoux');
        $('#kkk').removeClass('lduigoud');
        return false ;
    }
    else
    {
         $('#kkk').addClass('lduigoud');
        $('#kkk').removeClass('lduigoux');
        return true;
    }
}

function computerEmail (){
    //对电子邮件的验证
    var myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (!myreg.test($("#lcpemail").val()))
    {
        $('#bbb').addClass('lduigoux');
        $('#bbb').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#bbb').addClass('lduigoud');
        $('#bbb').removeClass('lduigoux');
        return true;
    }
}

function checkPhone (){
    //对手机号码的验证
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test($("#lcpMobile").val()))
    {
        $('#aaa').addClass('lduigoux');
        $('#aaa').removeClass('lduigoud');
        return false;
    }
    else
    {
        $('#aaa').addClass('lduigoud');
        $('#aaa').removeClass('lduigoux');
        return true;
    }
}

function computerQq (){
    //对QQ号码的验证
    var myreg = /^\s*[.0-9]{5,11}\s*$/;
    if (!myreg.test($("#lcpqqnum").val()))
    {
        $('#ccc').addClass('lduigoux');
        $('#ccc').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#ccc').addClass('lduigoud');
        $('#ccc').removeClass('lduigoux');
        return true;
    }
}
function checkTaxNum (){
    //对税务号码的验证
    var myreg = /^\s*[.0-9]{15}\s*$/;
    if (!myreg.test($("#lcptaxNum").val()))
    {
        $('#hhh').addClass('lduigoux');
        $('#hhh').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#hhh').addClass('lduigoud');
        $('#hhh').removeClass('lduigoux');
        return true;
    }
}
function checkLicenseNum (){
    //对营业执照号的验证
    var myreg = /^\s*[.0-9]{15}\s*$/;
    if (!myreg.test($("#lcplicenseNum").val()))
    {
        $('#iii').addClass('lduigoux');
        $('#iii').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#iii').addClass('lduigoud');
        $('#iii').removeClass('lduigoux');
        return true;
    }
}
function checkBankNum (){
    //对银行账号的验证
    var myreg = /^(\d{16}|\d{19})$/;
    if (!myreg.test($("#lcpbankAccount").val()))
    {
        $('#jjj').addClass('lduigoux');
        $('#jjj').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#jjj').addClass('lduigoud');
        $('#jjj').removeClass('lduigoux');
        return true;
    }
}
function checkFinanceEmail (){
    //对财务邮箱的验证
    var myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (!myreg.test($("#lfinanceEmail").val()))
    {
        $("#lfinanceEmail").next().addClass('lduigoux');
        $("#lfinanceEmail").next().removeClass('lduigoud');
        return false;
    }
    else
    {
         $("#lfinanceEmail").next().addClass('lduigoud');
        $("#lfinanceEmail").next().removeClass('lduigoux');
        return true;
    }
}

function checkFinanceMobile (){
    //对手机号码的验证
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test($("#lfinanceMobile").val()))
    {
        $("#lfinanceMobile").next().addClass('lduigoux');
        $("#lfinanceMobile").next().removeClass('lduigoud');
        return false;
    }
    else
    {
         $("#lfinanceMobile").next().addClass('lduigoud');
        $("#lfinanceMobile").next().removeClass('lduigoux');
        return true;
    }
}

function checkFinanceName (){
    //对财务联系人姓名的验证
    var myreg = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!myreg.test($("#lfinanceContacts").val()))
    {
        $('#xxx').addClass('lduigoux');
        $('#xxx').removeClass('lduigoud');
        return false;

    }
    else
    {
         $('#xxx').addClass('lduigoud');
        $('#xxx').removeClass('lduigoux');
        return true;
    }
}
function checkName (){
    //对姓名的验证
    var myreg = /^[\u4e00-\u9fa5]{2,6}$/;
    if (!myreg.test($("#lppdevname").val()))
    {
        $('#greee').addClass('lduigoux');
        $('#greee').removeClass('lduigoud');
        return false;
    }
    else
    {
        $('#greee').addClass('lduigoud');
        $('#greee').removeClass('lduigoux');
        return true;
    }
}
function checkEmail (){
        //对电子邮件的验证
        var myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!myreg.test($("#lppemail").val()))
        {
            $('#grbbb').addClass('lduigoux');
            $('#grbbb').removeClass('lduigoud');
            return false
        }
        else
        {
             $('#grbbb').addClass('lduigoud');
            $('#grbbb').removeClass('lduigoux');
            return true;
        }
    }
function checkCellphone(){
    //对手机号码的验证
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test($("#lppmobile").val()))
    {
        $('#graaa').addClass('lduigoux');
        $('#graaa').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#graaa').addClass('lduigoud');
        $('#graaa').removeClass('lduigoux');
        return true;
    }
}

function checkId (){
    //对身份证号码的验证
    var myreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}[0-9xX]$/;
    if (!myreg.test($("#lppcardid").val()))
    {
        $('#grddd').addClass('lduigoux');
        $('#grddd').removeClass('lduigoud');
        return false 
    }
    else
    {
         $('#grddd').addClass('lduigoud');
        $('#grddd').removeClass('lduigoux');
        return true;
    }
}
function checkQq (){
    //对QQ号码的验证
    var myreg = /^\s*[.0-9]{5,11}\s*$/;
    if (!myreg.test($("#lppqqnum").val()))
    {
        $('#grccc').addClass('lduigoux');
        $('#grccc').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#grccc').addClass('lduigoud');
        $('#grccc').removeClass('lduigoux');
        return true;
    }
}
function checkcpbankFullName(){
	// 开户银行全称验证
	 var myreg = /^[\w\u4e00-\u9fa5]{1,64}$/;
    if (!myreg.test($("#lcpopenedBank").val()))
    {
        $('#lll').addClass('lduigoux');
        $('#lll').removeClass('lduigoud');
        return false;
    }
    else
    {
        $('#lll').addClass('lduigoud');
        $('#lll').removeClass('lduigoux');
        return true;
    }
}
function checkcpwebsite(){
	// 对企业网站地址验证
    var s = $('#lcpwebsite').val();
    var reg = /^\w+.\w+.\w+(\.\w{1,})$/.test(s);
    if(!reg){
        $('#lcpwebsite').next().addClass('lduigoux');
        $('#lcpwebsite').next().removeClass('lduigoud');
        return false;
    }else {
        $('#lcpwebsite').next().addClass('lduigoud');
        $('#lcpwebsite').next().removeClass('lduigoux');
        return true;
    }
}
function checkperwebsite(){
	// 对企业网站地址验证
    var s = $('#lperwebsite').val();
    var reg = /^\w+.\w+.\w+(\.\w{1,})$/.test(s);
    if(!reg){
        $('#lperwebsite').next().addClass('lduigoux');
        $('#lperwebsite').next().removeClass('lduigoud');
        return false;
    }else {
        $('#lperwebsite').next().addClass('lduigoud');
        $('#lperwebsite').next().removeClass('lduigoux');
        return true;
    }
}
function checkpplandline(ids){
	// var val = ids.val();
	var val = ids.val();


	var v = /0\d{2,4}-\d{6,8}$/.test(val);
	if(v||val == ''){
		ids.next().addClass('lduigoud');
        ids.next().removeClass('lduigoux');
		return true;
	}else {
		ids.next().addClass('lduigoux');
        ids.next().removeClass('lduigoud');
		return false;
	}
}