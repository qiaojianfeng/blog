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
    //ȫ����������
    $('#wrap').fullpage({
        //���ô󱳾���ɫ
        sectionsColor:['#000', '#2AB561', '#DE8910', '#16BA9D', '#0DA5D6'],
        //������ĳһ����Ļص�����
        afterLoad:function(link,index){
            //���� ��current ����һ�����أ���һ����current��������һ����������
            $('.section').removeClass('current');
            //�ö����ӳ�100msִ�У���ҳ����س�ͻ
            setTimeout(function(){
                $('.section').eq(index-1).addClass('current');
            },100);

        }

    });

    $(".result")

})