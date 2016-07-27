/**
 * Created by Administrator on 2016/5/30.
 */
$(function(){
    /*需求:
     * 1)根据图片张数动态生成导航点
     * 2)实现图片无缝自动轮播
     * 3)导航点随图片自动轮播
     * 4)鼠标悬停时,停止轮播;鼠标移开时,继续轮播;
     * 5)鼠标悬停在左右按钮上,左右按钮更改背景色;
     * 6)实现导航点切换
     * 7)点击左右按钮,切换图片,实现图片的无缝切换
     */

    //html5 获取相应的标签
    var banner=document.querySelector('.banner');
    var $ul=$(banner).find('ul');
    var $ol=$(banner).find('ol');
    var $arrow=$(banner).find('.arrow');

    var $lis=$ul.children();
    var imgWidth=$lis.width();
    //定义一个函数字节流,函数执行完才可以接着执行;
    var flag=true;//防止多次恶意点击

    //1)根据图片张数动态生成导航点
    $lis.each(function(index,dom){
        //动态创建li标签
        var $li=$("<li></li>");
        $ol.append($li);
    });

    //给第一个li标签添加样式
    $ol.children().first().addClass("current");
    //动态添加第一张图片到最后一张之后
    $lis.eq(0).clone(true).insertAfter($lis.eq($lis.length-1));

    //2)实现图片无缝自动轮播(定时器)
    var index=0;
    var pointIndex=0;
    var timer=null;
    autoPlay();
    function autoPlay(){
        timer=setInterval(function(){
            index++;
            pointIndex++;
            play();
        },1000);
    }
    //自动轮播
    function play(){
        //判断导航点索引值
        if(pointIndex>olLis.length-1){
            pointIndex=0;
        }else if(pointIndex<0){
            pointIndex=$lis.length-1;
        }
        //判断图片索引值
        if(index<0){
            index=$lis.length-1;
            $ul.css("left",-(index+1)*imgWidth);
        }else if(index > $lis.length) {
            index = 1;
            $ul.css("left",-(index-1)*imgWidth);
        }
        $ul.animate({"left":-index * imgWidth},"ease",function(){
            flag=true;
        });
        changeStyle(pointIndex);
    }

    var olLis=$ol.children();
    //3)导航点随图片自动轮播
    function changeStyle(index) {
        $(olLis[index]).addClass("current").siblings().removeClass("current");
    }

    //4)鼠标悬停时,停止轮播;鼠标移开时,继续轮播;
    $(banner).mouseenter(function(){
        clearInterval(timer);
    })
    $(banner).mouseleave(function(){
        autoPlay();
    })

    //6)实现导航点切换图片
    $ol.find('li').mouseenter(function(){
        if(flag){
            clearInterval(timer);
            $(this).addClass("current").siblings().removeClass("current");
            $ul.animate({"left":-$(this).index() * imgWidth},"ease",function(){
                flag=true;
            });
        }
        flag=false;
    })

    //7)点击左右按钮,切换图片,实现图片的无缝切换
    $arrow.children().first().click(function(){
        clearInterval(timer);
        if(flag){
            pointIndex--;
            index--;
            play();
        }
        flag=false;
    })

    $arrow.children().last().click(function(){
        clearInterval(timer);
        if(flag){
            pointIndex++;
            index++;
            play();
        }
        flag=false;
    })
})