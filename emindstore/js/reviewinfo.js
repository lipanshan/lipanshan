$(function() {


    // 禁用所有的input 和select
    $('#lgrkfxx2').find('*').attr('disabled',true);
    $('#lqykazxx2').find('*').attr("disabled",true);
    $('#lpersub').attr('disabled',false);
     $('#lpersubmit').attr('disabled',false);
     $('#onregist').attr('disabled',false);
     $('#lcpsub').attr('disabled',false);
    // 登陆后自动检测用户类型然后判断出现个人信息或者企业信息
    var proId = window.sessionStorage.getItem('proId');
    var proType = window.sessionStorage.getItem('proType');
    var name = window.sessionStorage.getItem('name');
    if(!!proId && !!proType){
        var datas = 'proId='+proId+'&proType='+proType+addString;
        // 
        // console.log(datas)
        $.ajax({
            url: interface_uri + '/EmindStoreManager/managerAction/proInfo',
            type: 'post',
            data: datas,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success:function (data){

                var ret = JSON.parse(data);
                if(ret.success){
                    if(proType == 'cp'){
                        $('#lgrkfxx2').hide(0);
                        $('#lqykazxx2').show(0);
                        cpcontent(ret.info);
                        $('#lcpaccount').val(ret.account);
                    }else if(proType == 'pp'){
                        $('#lgrkfxx2').show(0);
                        $('#lqykazxx2').hide(0);
                        // 向表单1中插入取出来的内容
                        percontent(ret.info);
                        $('#lperaccount').val(ret.account);

                    }else {
                        return;
                    }
                }else {
                    alert(ret.errMsg);
                    logintimeout(ret);
                }
            },
            error:function (errMsg){
                // console.log(errMsg);
                alert(errMsg);
            }
        });
        //当审核通过后提交数据

      
        
    }
      // 点击后开发者信息和财务信息切换
    $('#lkfzxxsh').click(function (){
        $('#lkfzxxsh-cnt').show(0);
        $('#lcwxxsh-cnt').hide(0);
    });
    $('#lcwxxsh').click(function (){
        $('#lkfzxxsh-cnt').hide(0);
        $('#lcwxxsh-cnt').show(0);
    });




    // // 测试个人开发者或者企业开发者结束

    // 点击审核确认按钮弹出确认框
    $('#lpersubmit').click(function (){
        $('.lshade').show(0);
        $('.ltjqr').show(0);
        window.scrollTo(0,0);
    });

    // 点击x推出弹窗
    $('#lxbtn2').click(function (){
        $('.lshade').hide(0);
        $('.ltjqr').hide(0);
    });
    // 点击取消按钮一样退出弹窗
    $('#lcancel').click(function (){
        $('#lxbtn2').trigger('click');
    });
    // 点击确定按钮审核通过
    $('#lsure').click(function (){

        var datan = 'proId='+proId+'&proType='+proType+'&pass=1'+addString;
        // ajax开始
        $.ajax({
            url: interface_uri + '/EmindStoreManager/managerAction/auditProvider',
            type: 'post',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: datan,
            success:function (data){
                var ret = JSON.parse(data);
                // console.log(ret)
                if(ret.success){
                    $('.ltjqr').hide(0);
                    $('#lsuccess-tsxx').html('提交提醒');
                    $('#lsuccess-tsxx2').html('恭喜您！您审核通过了！');
                    $('.lsuccess').show(0);
                    $('.lshade').show(0);
                    setTimeout(function (){
                         window.open('shenheguanli.html','_self');
                     }, 500);
                   
                }else {
                    alert(ret.errMsg);
                    logintimeout(ret);
                    return false;
                }
            },
            error:function (errMsg){
                console.log(errMsg);
            }
        });
       
    });
    //企业开发者中点击确认审核通过后提交
    $('#onregist').click(function (){
       $('#lpersubmit').trigger('click');
    }) ;
    // 企业开发者中点击审核有问题
    $('#lcpsub').click(function (){
         // $('#lpersub').trigger('click');
        var type = 'cp';
        ajaxFn(type);
    });
   
    // 点击审核由问题后啊弹出问题窗口
    $('#lpersub').click(function (){
        // $('#lshenheform input').attr('disabled',false);
        // $('.lshade').show(0);
        // $('.lshywt').show(0);
        // window.scrollTo(0,0);
        var type = 'pp';
        ajaxFn(type);
    });
    // 审核不通过提交
    $('#lsure2').click(function (){
        var datas = $('#lshenheform').serialize()+'&'+'proId='+proId+'&proType='+proType+'&pass=0'+addString;
        // ajax开始
        $.ajax({
            url: interface_uri + '/EmindStoreManager/managerAction/auditProvider',
            type: 'post',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: datas,
            beforeSend:function (){
                if(proType == 'cp'){
                    if(!($('#litem0')[0].checked||$('#litem1')[0].checked||$('#litem2')[0].checked||$('#litem3')[0].checked)){
                        alert("必须选择注册失败原因");
                        return false;
                    }
                }else if(proType == 'pp') {
                     if(!($('#litem0')[0].checked||$('#litem1')[0].checked)){
                        alert("必须选择注册失败原因");
                        return false;
                    }
                }

            },
            success:function (data){
                var ret = JSON.parse(data);
                if(ret.success){
                    $('.lshywt').hide(0);
                    $('#lsuccess-tsxx').html('提交提醒');
                    $('#lsuccess-tsxx2').html('审核未通过！')
                    $('.lsuccess').show(0);
                    $('.lshade').show(0);
                    setTimeout(function (){
                         window.open('shenheguanli.html','_self');
                    }, 500);
                   
                }else {
                    alert(ret.errMsg)
                }
            },
            error: function (errMsg){
                console.log(errMsg);
            }
        });
    });
    // 点击X后关闭当前弹窗
    $('#lxbtn3').click(function (){
        $('.lshade').hide(0);
        $('.lshywt').hide(0);
    });
    $('#lcancel2').click(function (){
         $('#lxbtn3').trigger('click');
    });





});
// 关闭当前窗口
function closewin(){
        self.opener=null;
        self.close();
}
// 个人开发者信息
function percontent(data){

    
    $('#lpername').val(data.realname);
    $('#lperteamn').val(data.teamname);
    var lsrc='http://192.168.30.193/file/'+data.idCardPath.split('file')[1];
    $('#lperimagepath').attr('src',lsrc);
    $('#lpercardid').val(data.idCardNumber);
    var num1 = Number(data.address.split('/')[0]) -1;
    var num2 = Number(data.address.split('/')[1].substring(2,4)) -1;
    // 将城市数字还原为城市名字
    if(isNaN(num1)){
        num1 = 0;
    }
    if(isNaN(num2)){
        num2 = 0;
    }
    $('#lperselectp').html(dataCity[num1].cityName);
    $('#lperselecct').html(dataCity[num1].cityCnt[num2]);
    $('#lperaddress').val(data.address.split('/')[2]);
    $('#lperemail').val(data.email);
    $('#lpermobile').val(data.mobile);
    $('#lpertelephone').val(data.fixedTelephone);
    $('#lperqqnum').val(data.qq);
    $('#lperwebsite').val(data.website);



}
// 企业开发者信息
function cpcontent(data){
    
    $('#lcpcpname').val(data.companyName);
    $('#lcppublisher').val(data.publisher);
     var lsrc1 ='http://192.168.30.193/file/'+data.businessLicencePath.split('file')[1];
    $('#imagepath1').attr('src',lsrc1);
    $('#lcplicenseNum').val(data.businessRegisteredNumber);
    $('#lcpregistCity').val();
    var rezAdd = data.businessRegisteredAddress;
    var snum1 = Number(rezAdd.substring(0,2)) -1;
    var snum2 = Number(rezAdd.substring(4,6)) -1;
    if(isNaN(snum1)){
        snum1 = 0;
    }
    if(isNaN(snum2)){
        snum2 = 0;
    }
    $('#lcpregistPro').html(dataCity[snum1].cityName);
    $('#lcpregistCity').html(dataCity[snum1].cityCnt[snum2]);
    $('#lcpregaddress').val(rezAdd.substring(6,rezAdd.length));


    var bankAdd = data.openedBankArea;
    var bankNum1 =Number(bankAdd.substring(0,2)) -1;
    var bankNum2 = Number(bankAdd.substring(4,6)) -1;
    if(isNaN(bankNum1)){
        bankNum1 = 0;
    }
    if(isNaN(bankNum2)){
        bankNum2 = 0;
    }
    $('#lcpopenedBankPro').html(dataCity[bankNum1].cityName);
    $('#lcpopenedBankCity').html(dataCity[bankNum1].cityCnt[bankNum2]);



    var peoAdd = data.contactsAddress;
    var peoNum1 = Number(peoAdd.substring(0,2)) -1;
    var peoNum2 = Number(peoAdd.substring(4,6)) -1;
    if(isNaN(peoNum1)){
        peoNum1 = 0;
    }
    if(isNaN(peoNum2)){
        peoNum2 = 0;
    }
    $('#lcpshenfen').html(dataCity[peoNum1].cityName);
    $('#lcpcity').html(dataCity[peoNum1].cityCnt[peoNum2]);
    $('#lcpcontactsAddress').val(peoAdd.substring(6,peoAdd.length));
    $('#lcpemail').val(data.email);
    $('#lcpcontactmobile').val(data.contactMobile);
    $('#lcplandline').val(data.fixedNumber);
    $('#lcpqqnum').val(data.qq);
    $('#lcpwebsite').val(data.website);
    $('#lcppayeename').val(data.payeeName);
    $('#lcpbankName').val(data.bankName);
    $('#lcpopenedBankPro').val(data.openedBankArea);
  
    $('#lcpopenedBank').val(data.openedBankFullname);
    $('#lcpbankAccount').val(data.bankAccount);
     var lsrc2 ='http://192.168.30.193/file/'+data.taxRegistlicensePath.split('file')[1];
    $('#limagepath2').attr('src',lsrc2);
    $('#lcptaxNum').val(data.taxRegistrationNumber);
    // 是否开具增值税专用发票
    if(!data.isSpecialInvoice){
        $('#lcpisSpecialInvoicet').attr('checked',false);
        $('#lcpisSpecialInvoicef').attr('checked',true);
    }else {
        $('#lcpisSpecialInvoicef').attr('checked',false);
        $('#lcpisSpecialInvoicet').attr('checked',true);
    }
    
    
    $('#lcpfinanceContacts').val(data.financeContacts);
    $('#lcpfinanceEmail').val(data.financeEmail);
     $('#lcpfinanceMobile').val(data.financeMobile);


}
// 向审核问题表单中插入信息
function auditProblems(data){
    // $('#lshenheform').
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