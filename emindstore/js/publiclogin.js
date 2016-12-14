var interface_uri = "";
var addString = '&acid='+window.sessionStorage.getItem('name');
$(function (){


	// 根据本地存储是否存在name判断用户是否登陆
	var os = window.sessionStorage.getItem("name");
	if(!os){
		$('.ldl-regtister').show(0);
		$('.ldenglu').hide(0);
	}else {
		$('.llanding-name').html(os)
		$('.ldl-regtister').hide(0);
		$('.ldenglu').show(0);
	}

	// 点击进入密钥中心
    $('#lxgtu-xgbtn').click(function (){
        $('.lshade').show(0);
        $('#lxgma-onoff').show(0);
    });
	// 点击显示和隐藏推出和密钥中心
	$('.ldenglu').click(function (){
		$('.llonding-list').toggleClass('show');
	})

	var ldenglu2 = document.getElementById('ldenglu2');
	var llonding = document.getElementById('llonding-li');
	ldenglu2.onclick = function (ev){
		if(llonding.style.display == 'none'){
			llonding.style.display = 'block';
		}else {
			llonding.style.display = 'none';
		}
		
		ev.cancelBubble = true;
	}
	document.onclick = function (){
		llonding.style.display = 'none';
	}

	// 退出时清空sessionStorage
	$('#tuchu').click(function (){
		$.ajax({
			url: '/EmindStoreManager/userAction/logOut',
			type: 'post',
			data: '',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function (data){
				window.sessionStorage.clear();
				window.open('index.html','_self');
				setTimeout(function (){
					window.location.reload();
				}, 500);
			}
		});
		
		
	});




	// 运营管理 lyygl 只有在登陆我方账号的情况下才可见
		// usertype: u为普通用户并且没有提交过信息
	// usertype: pp为普通用户已经提交过信息
	// usertype: cp为企业用户已经提交过信息
	// usertype: m为管理员（最高权限）
	// 加载页面后没有登陆自动隐藏应用管理按钮
	var usertype = window.sessionStorage.getItem('usertype');
	if(usertype == 'm'){
		$('#lyygl').show(0);
		$('#creatApp').show(0);
		$('#lyygl').click(function (){
			window.open("shenheguanli.html","_self");
		});
	}else {
		$('#lyygl').hide(0);
	}
	// 点击管理控制台如果开发者类型为u则必须注册信息才能进如管理控制台
	// $('#lsy-menu-glgzt').click(function (){
	// 	if(usertype == 'u'){
	// 		window.open("selecttype.html","_self");
	// 	}

	// });
	// 只有在登陆状态下才能点击创建应用 ，然后在分为是否注册信息
	$('#creatApp').click(function (){
		// 没有登陆状态下点击创建应用也是弹出登录按钮
		window.sessionStorage.removeItem('resubmitAppid');
		statedupdate();
		if(!os){
			$('#ldlzc-dlbtn').trigger('click');
		}
		if(usertype == 'm'){
			return;
		}else if(usertype == 'u'){
			$('#lyygl').hide(0);
			window.open('selecttype.html','_self');
			
		}else if(usertype == 'pp'||usertype == 'cp'){
			$('#lyygl').hide(0);
			var state = sessionStorage.getItem("state");
			if(state == 0){
				// 未审核
				$('#laccmanager').find('*').attr('disabled',true);
				$('#lfinanciainfo').attr('disabled',false);
				$('#ldevelopinfo').attr('disabled',false);
			}else if(state == 1){
				// 审核通过
				$('#laccmanager').find('*').attr('disabled',false);
				$('#lcpaccount').attr('disabled',true);
				$('#lppaccount').attr('disabled',true);
				window.open('personalupload.html','_self');
			}else if(state == 2){
				// 审核不通过
				$('#laccmanager').find('*').attr('disabled',false);
				$('#lppaccount').attr('disabled',true);
				$('#lcpaccount').attr('disabled',true);

			}
		}
	});
	// 在没有登陆状态下点击管理控制台会自动跳到登陆页面
	$('#lsy-menu-glgzt').click(function (){
		if(!os){
			$('#ldlzc-dlbtn').trigger('click');
		}else {
			// window.open('ManagementCenter.html','_self');
			if(usertype == 'u'){
				window.open("selecttype.html","_self");
			}else if(usertype == 'm'){
				return;
			}else {
				window.open('ManagementCenter.html','_self');
			}
		}
		
	});
	$('#lsy-tap-glgzt').click(function (){
		$('#lsy-menu-glgzt').trigger('click');
	});
	//遮罩在改变窗口的时候也需要一直有
	$(window).bind('resize scroll', function (){
		// console.log($(window).scrollTop())
		var tHeight = $(window).scrollTop();
		var oHeigt = $(window).height();
		var iHeight = $('.ltjqr').height();
		// 计算在屏幕中剧中时到顶部的距离
		var topNum = ((oHeigt-iHeight)/2)+tHeight;
		$('.lshade').css('top',tHeight);
		$('.ltjqr').css('top',topNum);
	});

	// 点击一铭开放平台的时候更新state的状态
	$('h1').click(function (){
		statedupdate();
	});
	// 点击首页标签或者管理控制台标签、服务等这些标签的时候都需要更新state状态
	$('.lmainmenu').click(function (ev){
		if(ev.target.tagName == 'LI'){
			statedupdate();
		}

	});
	// 修改密码
	$('#lxgmmsubmit').click(function (){
		var act = window.sessionStorage.getItem('name');
				if(!act){
					return ;
				}else {
					$('#lxgmm-account').val(act);
				}
		var formD = $('#xgmmformdata').serialize();
		// console.log(formD)
		$.ajax({
			url: interface_uri + '/EmindStoreManager/userAction/updatePass',
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: formD,
			beforeSend:function (){
				//在提交前确定都已经填写数据，否则不能提交
				if(!verifyNewpassword()||!verifyOldpassword()||!verifySurepassword()){
					alert('填写错误，重新填写');
					return false;
				}
			},
			success:function (data){
					var ret = JSON.parse(data);
					if(ret.success){
						$('#lxgma-onoff').hide(0);
						$('#lsuccess-tsxx').html("修改密码成功！");
						$('#lsuccess-tsxx2').html("修改密码成功！");
						$('.lsuccess').show(0);
						setTimeout(function (){
							$('.lshade').hide(0);
							$('.lsuccess').hide(0);
							$('#loldPassword').val('');
							$('#lnewPassword').val('');
							$('#lnewPassword2').val('');
							verifyOldpassword();
							verifyNewpassword();
							verifySurepassword();

						}, 2000);
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
	$('#loldPassword').bind('blur', verifyOldpassword);
	function verifyOldpassword(){
		// var v = /^\w{6,20}$/g.test($('#loldPassword').val());
		var v = $('#loldPassword').val().length;
		if(v>=6&&v<=18){
			$('#loldPassword').next().addClass('lduigoud');
			$('#loldPassword').next().removeClass('lduigoux');
			return true;
		}else {
			$('#loldPassword').next().addClass('lduigoux');
			$('#loldPassword').next().removeClass('lduigoud');
			return false;
		}
	}
	// newPassword 新密码初级判断格式
	$('#lnewPassword').bind('blur', verifyNewpassword);
	function verifyNewpassword(){
		// var v = /^\w{6,20}$/g.test($('#lnewPassword').val());
		var v = $('#lnewPassword').val().length;
		var oldV = $('#loldPassword').val();
		var newV = $('#lnewPassword').val();
		if(v>=6&&v<=18&& newV!=oldV){
			$('#lnewPassword').next().addClass('lduigoud');
			$('#lnewPassword').next().removeClass('lduigoux');
			return true;
		}else {
			$('#lnewPassword').next().addClass('lduigoux');
			$('#lnewPassword').next().removeClass('lduigoud');
			return false;
		}
	}
	$('#lnewPassword2').bind('blur',verifySurepassword);
	function verifySurepassword(){
		// var v = /^\w{6,20}$/g.test($('#lnewPassword2').val());
		var v = $('#lnewPassword2').val().length;
		var newV1 = $('#lnewPassword').val();
		var newV2 = $('#lnewPassword2').val();
		if(v>=6&&v<=18&&newV1 ==newV2){
			$('#lnewPassword2').next().addClass('lduigoud');
			$('#lnewPassword2').next().removeClass('lduigoux');
			return true;
		}else {
			$('#lnewPassword2').next().addClass('lduigoux');
			$('#lnewPassword2').next().removeClass('lduigoud');
			return false;
		}
	}
	$('.lx-btn').click(function (){
		$(this).parent().hide(0);
		$('.lshade').hide(0);
	});
	
});
// 背景阴影的高度有js控制
$(window).bind('scroll',function (){
		var iTop = window.pageYOffset;
		$('.lshade').css('top',iTop);	
});
function statedupdate(){
			datas = '1=1'+addString;
		$.ajax({
			url: interface_uri + '/EmindStoreManager/proAction/proInfo',
			type: 'post',
			data: datas,
			success: function (data){
				var ret = JSON.parse(data);
				window.sessionStorage.setItem('state',ret.state);
			},
			error: function (errMsg){
				
			}
		});
}
// 用户登录超时执行这个函数
function logintimeout(data){
	if(data.loginStatus == false){
		$('#tuchu').trigger('click');
	}
}
// 将城市的数字解析为具体城市名称
var dataCity = [
	{
		cityName:'北京',
		cityCnt:['东城区', '西城区', '海淀区', '朝阳区', '丰台区', '石景山区', '通州区', '顺义区','房山区', '大兴区', '昌平区', '怀柔区', '平谷区', '门头沟区', '延庆县', '密云县']
	},
	{
		cityName:'深圳',
		cityCnt:['罗湖','福田','南山','盐田','宝安','龙岗']
	},
	{
		cityName:'上海',
		cityCnt:['宝山','金山','南市','长宁','静安','青浦','崇明','卢湾','松江','奉贤','浦东','杨浦','虹口','普陀','闸北','黄浦','闵行','徐汇','嘉定','南汇']
	},
	{
		cityName:'重庆',
		cityCnt:['渝中','江北','沙坪坝','南岸','九龙坡','大渡口']
	},
	{
		cityName:'天津',
		cityCnt:['和平','河北','河西','河东','南开','红桥','塘沽','汉沽','大港','东丽','西青','津南','北辰','武清','滨海']
	},
	{
		cityName:'广东',
		cityCnt:['广州','珠海','中山','佛山','东莞','清远','肇庆','阳江','湛江','韶关','惠州','河源','汕尾','汕头','梅州']
	},
	{
		cityName:'河北',
		cityCnt:['石家庄','唐山','秦皇岛','邯郸','邢台','张家口','承德','廊坊','沧州','保定','衡水']
	},
	{
		cityName:'山西',
		cityCnt:['太原','大同','阳泉','朔州','长治','临汾','晋城']
	},
	{
		cityName:'内蒙古',
		cityCnt:['呼和浩特','包头','乌海','临河','东胜','集宁','锡林浩特','通辽','赤峰','海拉尔','乌兰浩特']
	},
	{
		cityName:'辽宁',
		cityCnt:['沈阳','大连','鞍山','锦州','丹东','盘锦','铁岭','抚顺','营口','辽阳','阜新','本溪','朝阳','葫芦岛']
	},
	{
		cityName:'吉林',
		cityCnt:['长春','吉林','四平','辽源','通化','白山','松原','白城','延边']
	},
	{
		cityName:'黑龙江',
		cityCnt:['哈尔滨','齐齐哈尔','牡丹江','佳木斯','大庆','伊春','黑河','鸡西','鹤岗','双鸭山','七台河','绥化','大兴安岭']
	},
	{
		cityName:'江苏',
		cityCnt:['南京','苏州','无锡','常州','镇江','连云港 ','扬州','徐州 ','南通','盐城','淮阴','泰州','宿迁']
	},
	{
		cityName:'浙江',
		cityCnt:['杭州','湖州','丽水','温州','绍兴','舟山','嘉兴','金华','台州','衢州','宁波']
	},
	{
		cityName:'安徽',
		cityCnt:['合肥  ','芜湖 ','蚌埠 ','滁州 ','安庆 ','六安 ','黄山 ','宣城 ','淮南 ','宿州 ','马鞍山 ','铜陵','淮北 ','阜阳 ','池州 ','巢湖 ','亳州']
	},
	{
		cityName:'福建',
		cityCnt:['福州 ','厦门 ','泉州 ','漳州 ','龙岩 ','南平 ','宁德 ','莆田 ','三明']
	},
	{
		cityName:'江西',
		cityCnt:['南昌','景德镇','九江','萍乡','新余','鹰潭','赣州','宜春','吉安','上饶','抚州']
	},
	{
		cityName:'山东',
		cityCnt:['济南','青岛','淄博','德州','烟台','潍坊','济宁','泰安','临沂','菏泽','威海','枣庄','日照','莱芜','聊城','滨州','东营']
	},
	{
		cityName:'河南',
		cityCnt:['郑州','开封','洛阳','平顶山','安阳','鹤壁','新乡','焦作','濮阳','许昌','漯河','三门峡','南阳','商丘','周口','驻马店','信阳','济源']
	},
	{
		cityName:'湖北',
		cityCnt:['武汉','黄石','十堰','荆州','宜昌','襄樊','鄂州','荆门','孝感','黄冈','咸宁','恩施','随州','仙桃','天门','潜江','神农架']
	},
	{
		cityName:'湖南',
		cityCnt:['长沙','株州','湘潭','衡阳','邵阳','岳阳','常德','郴州','益阳','永州','怀化','娄底','湘西 ']
	},
	{
		cityName:'广西',
		cityCnt:['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','贺州','百色','河池']
	},
	{
		cityName:'海南',
		cityCnt:['海口 ','三亚','通什','琼海','琼山','文昌','万宁','东方','儋州']
	},
	{
		cityName:'四川',
		cityCnt:['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充  ','宜宾','广安','达川','巴中','雅安','眉山  ','阿坝 ','甘孜 ','凉山 ']
	},
	{
		cityName:'贵州',
		cityCnt:['贵阳 ','六盘水','遵义','铜仁','毕节','安顺','黔西南 ','黔东南','黔南']
	},
	{
		cityName:'云南',
		cityCnt:['昆明','东川','曲靖','玉溪','昭通','思茅','临沧','保山','丽江','文山 ','红河 ','西双版纳 ','楚雄 ','大理 ','德宏 ','怒江','迪庆']
	},
	{
		cityName:'西藏',
		cityCnt:['拉萨','那曲','昌都','山南','日喀则','阿里','林芝']
	},
	{
		cityName:'陕西',
		cityCnt:['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','商洛','安康']
	},
	{
		cityName:'甘肃',
		cityCnt:['兰州','金昌','白银','天水','嘉峪关','定西','平凉','庆阳','陇南','武威','张掖','酒泉','甘南 ','临夏']
	},
	{
		cityName:'青海',
		cityCnt:['西宁','海东',' 海北 ','黄南','海南','果洛','玉树','海西']
	},
	{
		cityName:'宁夏',
		cityCnt:['银川','石嘴山','银南','固原']
	},
	{
		cityName:'新疆',
		cityCnt:['乌鲁木齐','克拉玛依','石河子','吐鲁番','哈密','和田','阿克苏','喀什','克孜勒苏','巴音郭楞','昌吉','博尔塔拉','伊犁']
	},
	{
		cityName:'香港',
		cityCnt:[]
	},
	{
		cityName:'澳门',
		cityCnt:[]
	},
	{
		cityName:'台湾',
		cityCnt:[]
	}
	
];