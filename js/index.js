/**
 * Created by QIAO on 2016/12/19.
 */
$(document).ready(function(){

    var native_width = 0;
    var native_height = 0;


    $(".avatar").mousemove(function(e){

        if(!native_width && !native_height)
        {
            var image_object = new Image();
            image_object.src = $(".small").attr("src");
            native_width = image_object.width;
            native_height = image_object.height;
        }
        else
        {
            var magnify_offset = $(this).offset();
            var mx = e.pageX - magnify_offset.left;
            var my = e.pageY - magnify_offset.top;

            if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
            {
                $(".large").fadeIn(100);
            }
            else
            {
                $(".large").fadeOut(100);
            }
            if($(".large").is(":visible"))
            {
                var rx = Math.round(mx/$(".small").width()*native_width - $(".large").width()/2)*-1;
                var ry = Math.round(my/$(".small").height()*native_height - $(".large").height()/2)*-1;
                var bgp = rx + "px " + ry + "px";

                var px = mx - $(".large").width()/2;
                var py = my - $(".large").height()/2;
                $(".large").css({left: px, top: py, backgroundPosition: bgp});
            }
        }
    })


    $(".avatar").mouseleave(function(){
        $(".large").hide();
    })
    //全屏滚动部分
    $('#wrap').fullpage({
        //设置大背景颜色
        sectionsColor:['#000', '#2AB561', '#DE8910', '#16BA9D', '#0DA5D6'],
        //滚动到某一屏后的回调函数
        afterLoad:function(link,index){
            //排他 把current 当做一个开关，那一屏有current类名，这一屏就做动画
            $('.section').removeClass('current');
            //让动画延迟100ms执行，和页面加载冲突
            setTimeout(function(){
                $('.section').eq(index-1).addClass('current');
            },100);

        }

    });

    $(".result")

})