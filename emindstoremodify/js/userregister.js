$(function() {

    // 当打开页面后已经注册账号的将不能填写账号lyzczh-name
    var name = window.sessionStorage.getItem('name');
    if(!!name){
        $('#lyzczh-name').val(name);
        $('#lyzczh-name')[0].disabled = true;
    }
   
    // 上传证件照pluload插件
    var uploaderzjz = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'file_upload', //选择添加文件的按钮
        container: document.getElementById('lvoxzjz'), //添加内容显示的地方
        url : '/EmindStoreManager/proAction/uploadIDCard?1=1'+addString,//上传服务器地址
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
                        $('filelistzjz').hide(0);
                         
                    }
            },
            FileUploaded:function (up,file,res){
                var ret = JSON.parse(res.response);
                setTimeout(function (){
                    $('.lfilelist').css('opacity',0);
                    $('.lfilelist').css('filter','alpah(opacity=0)');
                    document.getElementById('filelistzjz').innerHTML =  '';
                    }, 1500);
                document.getElementById("llookimg").src= 'http://192.168.30.193/file/'+ret.path.split('file')[1]+'';
                // ret.path.split('file')[1]
                document.getElementById('imagepath').value = ret.path;
            },

            Error: function(up, err) {
               alert(err.message);
            }
        }
    });

    uploaderzjz.init();

    $("#onregist").click(function(){
        // 点击此事件的具体操作。
        var formData = $("#form").serialize()+addString;
        console.log(formData)
        $.ajax({
            async : true,
            url: interface_uri + "/EmindStoreManager/proAction/addPerPro",
            type: "post",
            data: formData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend: function () {
                // ajax请求前调用，验证输入是否完整/

                if(!checkppwebsite()||!checkName()||!checkQq()||!checkCellphone()||!checkEmail()||!checkId()){
                    alert("信息不完整，请补充必填信息");
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
                    $('#lsuccess-tsxx').html('提交提示')
                    $('#lsuccess-tsxx2').html('恭喜你,提交成功！');
                    $('.lshade').show(0);
                    $('.lsuccess').show(0);
                    window.scrollTo(0, 0);
                    setTimeout(function (){
                        $('.lshade').hide(0);
                        $('.lsuccess').hide(0);
                        window.open('ManagementCenter.html','_self');
                    }, 1000);
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
    // 点击查看实例按钮
    $('#lckslbtn').click(function (ev){
        $('#llookimg2').show(0);
        ev.originalEvent.cancelBubble=true;
    });
    $(document).click(function (){
        $('#llookimg2').hide(0);
    });
    // 验证开发者网站地址
    $('#lppwebsite').bind('blur',checkppwebsite);
    // 验证身份证号
    $('#lppcardid').bind('blur',checkId);
    // 验证电子邮箱
    $('#lppemail').bind('blur',checkEmail);
    // 验证手机号
    $('#lppmobile').bind('blur',checkCellphone);
    // 验证qq号
    $('#lppqqnum').bind('blur',checkQq);
    // 验证姓名
    $('#lpprealname').bind('blur',checkName);
    // 验证座机号码
    $('#lpplandline').bind('blur',function (){
        checkpplandline($('#lpplandline'));
    });

         // select
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
                        selectFn($('#lpercity'),'city',creatOption(cityArr,ns),1)();
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
                        if(id.children().eq(2).children()[0]){
                            id.children().eq(2).children()[indexNum].setAttribute('selected', true);
                            id.children().eq(3).html(id.children().eq(2).children()[indexNum].innerHTML);
                            id.children().eq(0).val(id.children().eq(2).children()[indexNum].getAttribute('vals',2));
                            if(id.children().eq(2).children()[indexNum].getAttribute('vals',2).length<=2){
                                var ns = id.children().eq(2).children()[indexNum].getAttribute('vals',2);
                                selectFn($('#lpercity'),'city',creatOption(cityArr,ns),indexNum2)();
                            }
                        }
                    }
                }
            }
            
        }
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

        selectFn($('#lperprovince'),'province',creatOption2(cityArr),1,1)();
        






















});
function checkName()

{
    //对姓名的验证
    var myreg = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!myreg.test($(".realName").val()))
    {
        $('#eee').addClass('lduigoux');
        $('#eee').removeClass('lduigoud');
        return false;
    }
    else
    {
        $('#eee').addClass('lduigoud');
        $('#eee').removeClass('lduigoux');
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

function checkId()
{
    //对身份证号码的验证
    var myreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}[0-9xX]$/;
    if (!myreg.test($(".id").val()))
    {
        $('#ddd').addClass('lduigoux');
        $('#ddd').removeClass('lduigoud');
        return false;
    }
    else
    {
         $('#ddd').addClass('lduigoud');
        $('#ddd').removeClass('lduigoux');
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
function checkppwebsite(){
    // 对企业网站地址验证
    var s = $('#lppwebsite').val();
    var reg = /^\w+.\w+.\w+(\.\w{1,})$/.test(s);
    if(!reg){
        $('#lppwebsite').next().addClass('lduigoux');
        $('#lppwebsite').next().removeClass('lduigoud');
        return false;
    }else {
        $('#lppwebsite').next().addClass('lduigoud');
        $('#lppwebsite').next().removeClass('lduigoux');
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

