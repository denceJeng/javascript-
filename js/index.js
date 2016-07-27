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
    function Banner(Id){
        this.banner=document.getElementById(Id);
        this.imgBox=this.banner.getElementsByTagName('ul')[0];
        this.pointBox=this.banner.getElementsByTagName('ol')[0];
        this.arrow=this.banner.getElementsByTagName('div')[0];
        this.prev=this.arrow.children[0];
        this.next=this.arrow.children[1];
        this.imgLis=this.imgBox.getElementsByTagName('li');
        this.imgWidth=this.imgLis[0].offsetWidth;
        this.index=0;
        this.pointIndex=0;
        this.timer=null;
    }

    Banner.prototype.init=function(){
        this.addNavPoint();
        //动态添加第一张图片到最后一张之后
        this.imgBox.appendChild(this.imgLis[0].cloneNode(true));
        this.autoPlay();
        this.enter();
        this.leave();
        this.navChange();
        this.prevClick();
        this.nextClick();
    }
    //1)根据图片张数动态生成导航点
    Banner.prototype.addNavPoint=function(){
        var html='';
        for(var i=0;i<this.imgLis.length;i++){
            if(i==0){
                html +="<li class='current'></li>";
            }else{
                html+="<li></li>";
            }
        }
        this.pointBox.innerHTML=html;
        this.points=this.pointBox.getElementsByTagName('li');
    }

    //2)实现图片无缝自动轮播(定时器)
    Banner.prototype.autoPlay=function(){
        var _this=this;
        _this.timer=setInterval(function(){
            _this.index++;
            _this.pointIndex++;
            _this.play();
        },1000);
    }
    //自动轮播
    Banner.prototype.play=function(){
        //判断导航点索引值
        if(this.pointIndex>this.points.length-1){
            this.pointIndex=0;
        }else if(this.pointIndex<0){
            this.pointIndex=this.points.length-1;
        }
        //判断图片索引值
        if(this.index<0){
            this.index=this.imgLis.length-2;
            this.imgBox.style.left=-(this.index+1)*this.imgWidth +"px";
        }else if(this.index > this.imgLis.length-1) {
            this.index = 1;
            this.imgBox.style.left=-(this.index-1)*this.imgWidth +"px";
        }
        animate(this.imgBox,-this.index*this.imgWidth);

        this.changeStyle(this.pointIndex);
    }

    //3)导航点随图片自动轮播
    Banner.prototype.changeStyle=function(index){
        for(var i=0;i<this.points.length;i++){
            this.points[i].className="";
        }
        this.points[index].className="current";
    }
    //4)鼠标悬停时,停止轮播;鼠标移开时,继续轮播;
    Banner.prototype.enter=function(){
        var _this=this;
        this.banner.onmouseenter=function(){
            clearInterval(_this.timer);
        }
    }
    Banner.prototype.leave=function(){
        var _this=this;
        this.banner.onmouseleave=function(){
            _this.autoPlay();
        }
    }
    //6)实现导航点切换图片
    Banner.prototype.navChange=function(){
        var _this=this;
        for(var i=0;i<this.points.length;i++){
            this.points[i].index=i;
            this.points[i].onmouseenter=function(){
                clearInterval(_this.timer);
                _this.changeStyle(this.index);
                animate(_this.imgBox,-this.index * _this.imgWidth );
            }
        }
    }
    //7)点击左右按钮,切换图片,实现图片的无缝切换
    Banner.prototype.prevClick=function(){
        var _this=this;
        this.prev.onclick=function(){
            clearInterval(_this.timer);
            _this.pointIndex--;
            _this.index--;
            _this.play();
        }
    }

    Banner.prototype.nextClick=function(){
        var _this=this;
        this.next.onclick=function(){
            clearInterval(_this.timer);
            _this.pointIndex++;
            _this.index++;
            _this.play();
        }
    }

    function animate(obj,target){
        clearInterval(obj.timer);
        var speed=obj.offsetLeft-target>0?-10:10;
        obj.timer=setInterval(function(){
            var val=obj.offsetLeft-target;
            obj.style.left=obj.offsetLeft+speed+"px";
            if(Math.abs(val)<10){
                clearInterval(obj.timer);
                obj.style.left=target+"px";
            }
        },4);
    }

    var banner=new Banner('banner');
    banner.init();
});