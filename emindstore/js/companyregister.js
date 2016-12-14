$(function() {
 

    //当input框聚焦后按回车键会添加文件，在这里阻止默认事件
  

       // 当打开页面后已经注册账号的将不能填写账号lyzczh-name
    var name = window.sessionStorage.getItem('name');
    if(!!name){
        $('#lcpaccount').val(name);
        $('#lcpaccount')[0].disabled = true;
    }





   // 上传营业登记证pluload插件
    
    var uploaderyyzz = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'lfile_upload-a', //选择添加文件的按钮
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

            PostInit: function(ev) {
              
            },

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    document.getElementById('filelistyyzz').innerHTML += '<div class="lfilelist" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });
                 uploaderyyzz.start();
            },

            UploadProgress: function(up, file) {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = file.percent + "%";
                    if(file.percent == 100){
                        $('filelistyyzz').hide(0);
                         
                    }
            },
            FileUploaded:function (up,file,res){
                var ret = JSON.parse(res.response);
                setTimeout(function (){
                    $('.lfilelist').css('opacity',0);
                    $('.lfilelist').css('filter','alpah(opacity=0)');
                    document.getElementById('filelistyyzz').innerHTML =  '';
                    }, 1500);
                    var lsrc ='http://192.168.30.193/file/'+ret.path.split('file')[1];
                 $('#llookimg').attr('src',lsrc);
                  document.getElementById("imagepath").value=ret.path;
            },

            Error: function(up, err) {
                alert(err.message);
            }
        }
    });

    uploaderyyzz.init();



    // plupload插件上传税务登记证
    // 改变插件的样式

    var uploaderssdjz = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'file_upload2', // you can pass an id...//选择添加文件的按钮
        container: document.getElementById('lvoxswdjz'), // ... or DOM Element itself//添加内容显示的地方
        url : '/EmindStoreManager/proAction/uploadTaxLicense?1=1'+addString,//上传服务器地址
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
                    document.getElementById('filelistswddz').innerHTML += '<div class="lfilelist" id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });
                uploaderssdjz.start();
            },

            UploadProgress: function(up, file) {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = file.percent + "%";
                    if(file.percent == 100){
                        $('#lhide-sendswddz').hide(0);
                         
                    }
            },
            FileUploaded:function (up,file,res){
                // console.log(res.response);
                setTimeout(function (){
                    $('.lfilelist').css('opacity',0);
                    $('.lfilelist').css('filter','alpah(opacity=0)');
                    document.getElementById('filelistswddz').innerHTML =  '';
                    }, 1500);
                 var ret = eval('(' + res.response + ')');
                 // console.log(ret)
                 var lsrc='http://192.168.30.193/file/'+ret.path.split('file')[1];
                 $('#llookimg3').attr('src',lsrc);
                document.getElementById("imagepath2").value=ret.path;
            },

            Error: function(up, err) {
                alert(err.message);
                // document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
            }
        }
    });

    uploaderssdjz.init();

    

















    
    $("#onregist").click(function(){
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
               if(!($('#lcpaccount').val()&&$('#lcompanyName').val()&&$('#llicenseNum').val()&&$('#lregistCity').html()&&$('#lcontactsCity').html()&&$('#lemail').val()&&$('#lcontactMobile').val()&&$('#lqqnum').val()&&$('#lwebsite').val()&&$('#lpayeeName').val()&&$('#lbankName').val()&&$('#lopenedBankCity').val()&&$('#lbankAccount').val()&&$('#ltaxNum').val()&&$('#lfinanceContacts').val()&&$('#lfinanceEmail').val()&&$('#lfinanceMobile').val())){
                    if(!($('#lpayeeName').val()&&$('#lbankName').val()&&$('#lopenedBankCity').val()&&$('#lbankAccount').val()&&$('#ltaxNum').val()&&$('#lfinanceContacts').val()&&$('#lfinanceEmail').val()&&$('#lfinanceMobile').val())){
                        $('.menu').children('input').eq(1).trigger('click');
                    }
                    alert('填写信息不完整,企业信息需要填写两页');

                 return false;
               }
               for(var i = 0; i < $('.num1').length;i++){
                    if($('.num1')[i].value ==0||$('.num1')[i].value== ''){
                         alert('填写信息不完整,企业信息需要填写两页');
                        return false;
                    }

               }
                if(!$('#lcparree')[0].checked){
                    alert("阅读并同意条款未选");
                    return false;
                }
                
            },
            success: function (ret) {
                var ret2 = eval("("+ret+")");
                if(ret2.success){
                    $('#lsuccess-tsxx2').html('恭喜你，提交成功！');
                    $('#lsuccess-tsxx').html('提交成功');
                    $('.lshade').show(0);
                    $('.lsuccess').show(0);
                    window.scrollTo(0, 0);
                    setTimeout(function (){
                        $('.lshade').hide(0);
                        $('.lsuccess').hide(0);
                        window.open('ManagementCenter.html','_self');
                    },1000);

                }else {
                    alert(ret2.errMsg);
                    logintimeout(ret2);
                }
                
            },
            error: function (errMsg) {
                // alert(errMsg);
            }
        });
    });
    $('.menu').children('input').eq(0).click(function (){
        $('#lkfaxx').show(0);
         $('#lcwxx').hide(0);
        $(this).css('border-bottom','3px solid #3385ff');
        $(this).css('color','#3385ff');
        $('.menu').children('input').eq(1).css('border-bottom','3px solid #fff');
        $('.menu').children('input').eq(1).css('color','#232323');
    });
    $('.menu').children('input').eq(1).click(function (){
        $('#lkfaxx').hide(0);
         $('#lcwxx').show(0);
        $(this).css('border-bottom','3px solid #3385ff');
        $(this).css('color','#3385ff');
        $('.menu').children('input').eq(0).css('border-bottom','3px solid #fff');
        $('.menu').children('input').eq(0).css('color','#232323');
    });



      // 点击查看实例按钮
   
    $('#lckslbtn').bind('mouseover',function (){
        $('#llookimg2').show(0);
    });
    $('#lckslbtn').bind('mouseout',function (){
        $('#llookimg2').hide(0);
    });
    $('#llookdemo').bind('mouseover',function (){
        $('#llookimg4').show(0);
    });
    $('#llookdemo').bind('mouseout',function (){
        $('#llookimg4').hide(0);
    });

      // 出品人初步验证
    $('#lcpcpr').bind('blur',function (){
        var s = /^[\w\u4e00-\u9fa5]{0,20}$/.test($('#lcpcpr').val());
        if(s){
            $('#lcpcpr').next().addClass('lduigoud');
            $('#lcpcpr').next().removeClass('lduigoux');
        }else {
            $('#lcpcpr').next().addClass('lduigoux');
            $('#lcpcpr').next().removeClass('lduigoud');
        }
    });
    // 验证银行名称
    $('#lbankName').bind('blur',cpbankName);
    // 验证网页地址
    $('#lwebsite').bind('blur',checkcomputerwebsite);
    // 验证座机号
    $('#lcplandline').bind('blur',function (){
        checkcplandline($('#lcplandline'))
    })
});

//验证银行名称
function cpbankName(){
    var myreg = /^[\u4e00-\u9fa5]{4,64}$/;
    var s = myreg.test($('#lbankName').val());
    if(!s){
        $('#lbankName').next().addClass('lduigoux');
        $('#lbankName').next().removeClass('lduigoud');
    }else {
         $('#lbankName').next().addClass('lduigoud');
        $('#lbankName').next().removeClass('lduigoux');
    }
}
function checkName()
{
    //对企业名的验证
    var myreg = /^[\w\u4e00-\u9fa5]{4,64}$/;
    if (!myreg.test($(".realName").val()))
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
function checkPayName()
{
    //对收款户名的验证
    var myreg = /^[\u4e00-\u9fa5]{4,64}$/;
    if (!myreg.test($(".payName").val()))
    {
         $('#kkk').addClass('lduigoux');
        $('#kkk').removeClass('lduigoud');
        return false;
    }
    else
    {
        $('#kkk').addClass('lduigoud');
        $('#kkk').removeClass('lduigoux');
        return true;
    }
}
function checkOpenedBankName()
{
    //对开户行名称的验证
    var myreg = /^[\w\u4e00-\u9fa5]{1,64}$/;
    if (!myreg.test($(".openedBankName").val()))
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
function checkEmail()
{
    //对电子邮件的验证
    var myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (!myreg.test($(".email").val()))
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

function checkCellphone()
{
    //对手机号码的验证
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test($(".mobile").val()))
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

function checkQq()
{
    //对QQ号码的验证
    var myreg = /^\s*[.0-9]{5,15}\s*$/;
    if (!myreg.test($(".qq").val()))
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
function checkTaxNum()
{
    //对税务号码的验证
    var myreg = /^\s*[.0-9]{15,19}\s*$/;
    if (!myreg.test($(".taxNum").val()))
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
function checkLicenseNum()
{
    //对营业执照号的验证
    var myreg = /^\s*[.0-9]{15}\s*$/;
    if (!myreg.test($(".licenseNum").val()))
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
function checkBankNum()
{
    //对银行账号的验证
    var myreg = /^(\d{16}|\d{19})$/;
    if (!myreg.test($("#lbankAccount").val()))
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
function checkFinanceEmail()
{
    //对财务邮箱的验证
    var myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (!myreg.test($(".financeEmail").val()))
    {
         $('#zzz').addClass('lduigoux');
        $('#zzz').removeClass('lduigoud');
        return false;
    }
    else
    {
        $('#zzz').addClass('lduigoud');
        $('#zzz').removeClass('lduigoux');
        return true;
    }
}

function checkFinanceMobile()
{
    //对手机号码的验证
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test($(".financeMobile").val()))
    {
        $('#yyy').addClass('lduigoux');
        $('#yyy').removeClass('lduigoud');
        return false;
    }
    else
    {
        $('#yyy').addClass('lduigoud');
        $('#yyy').removeClass('lduigoux');
        return true;
    }
}

function checkFinanceName()
{
    //对财务联系人姓名的验证
    var myreg = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!myreg.test($(".financeName").val()))
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
function checkcomputerwebsite(){
    var s = $('#lwebsite').val();
    var reg = /^\w+.\w+.\w+(\.\w{1,})$/.test(s);
    if(!reg){
        $('#lwebsite').next().addClass('lduigoux');
        $('#lwebsite').next().removeClass('lduigoud');
        return false;
    }else {
        $('#lwebsite').next().addClass('lduigoud');
        $('#lwebsite').next().removeClass('lduigoux');
        return true;
    }
}
function checkcplandline(ids){
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