//=================================
// 侧边导航切换     编写：李盼山
//=================================
$(function (){
    var oAndc = true;
    $('#sidebarMenuBtn').click(function (){ //导航切换
        if(!oAndc){return false;}
        oAndc = false;
        var nowActive = 0;
        if ($('.openMenu').css('display') == 'block'){
            nowActive = $('.menuItemActive').parent().index();
            $('.sidebar').stop().animate({'width':'70px'},'60',function (){
                $('.openMenu,.retractIcoC').hide(0);
                $('.closeMenu,.retractIcoP').show(0);
                $('.menuItemActive').removeClass('menuItemActive');
                $('.iconMenu').find('a').eq(nowActive).addClass('menuItemActive');
                oAndc = true;
            });
            $('.content').stop().animate({'marginLeft':'70px'},'60');
        } else {
            nowActive = $('.menuItemActive').parent().index();
            $('.openMenu').children('li').eq(nowActive).find('a').addClass('menuItemActive');
            $('.openMenu,.retractIcoC').show(0);
            $('.closeMenu,.retractIcoP').hide(0);
            $('.sidebar').stop().animate({'width':'210px'},'60',function (){oAndc = true;});
            $('.content').stop().animate({'marginLeft':'210px'},'60');
        }
    });
    function hrefFn(elem){                     //页面跳转
        if(!elem.attr('href')){return false;}
        var isHref = /^.*\.html$/g.test(elem.attr('href'));
        if(isHref){
            $('#content').load(''+elem.attr('href'),function (){ //加载页面完成后加载需要的js文件
                $('#content').append('<script src="scripts/popup.js"></script>');
			});
        }
    }
    $('.menuItem').click(function (ev){           //一级菜单选中、打开二级菜单
        $('.menuItemActive').removeClass('menuItemActive');
        $(this).parent().siblings().find('ul').slideUp();
        if($(this).nextAll('ul').css('display') == 'block'){
            $(this).removeClass('menuItemActive');
            $(this).nextAll('ul').slideUp();
        } else {
            $(this).addClass('menuItemActive');
            $(this).nextAll('ul').slideDown();
        }
        hrefFn($(this));
        ev.preventDefault();
    });
    $('.menuItem').eq(0).trigger('click');          //加载首页
    $('.level2Item').find('a').click(function (ev){ //二级菜单选中(打开菜单)
        $(this).toggleClass('level2ItemaActive');
        $(this).parent('li').siblings().children('a').removeClass('level2ItemaActive');
        hrefFn($(this));
        ev.preventDefault();
    });
    $('.iconMenuCont').find('a').click(function (ev){ //二级菜单选中(收起菜单)
        $(this).toggleClass('level2ItemaActive');
        $(this).parent('li').siblings().children('a').removeClass('level2ItemaActive');
        hrefFn($(this));
        ev.preventDefault();
    });

    $('.iconMenu').children('li').mousemove(function (ev){ //移入显示2级菜单
        var top = $('.iconMenu').find('li').height()*$(this).index()+10;
        $('.iconMenuCont').find('.level2menu').hide(0);
        $('.iconMenuCont').hide(0);
        if(!$(this).index()){return false;}
        $('.iconMenuCont').show(0);
        $('.iconMenuCont').find('.level2menu').eq($(this).index()-1).css('marginTop',top+'px');
        $('.iconMenuCont').find('.level2menu').eq($(this).index()-1).show(0);
        ev.stopPropagation();
    });
    $('.iconMenuCont').mousemove(function (ev){
        $('.iconMenuCont').show(0);
        ev.stopPropagation();
    });
    $(document).mousemove(function (){
        $('.iconMenuCont').hide(0);
    });
    
});