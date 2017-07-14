/**
 * Created by Administrator on 2016/10/21 0021.
 */

+(function($){
    'use strict';
    var mCarousel=function(ele,opt){
        this.defaults={
            elenext:'',
            eleprev:'',
            //图片数量
            imgcount:$(ele).find(".item").length,
            intervaltime:3000,
            durationtime:500

        }
        this.options= $.extend({},this.defaults,opt);
        this.$element=$(ele).find(".item");
        //移动的宽度
        this.moveWidth=$(ele).width();
        //父容器
        this.$contentele=$(ele);
        //计时器
        this.interval=null;
        //imageNow
        this.imageNow=0;
        //防止快速点击按钮
        this.couldRun=true;
    };

    mCarousel.prototype={

        //程序初始化函数
        init:function(){
            var that=this;
            //console.log(this.defaults.imgcount);
            //绑定右按钮事件
            $(that.options.elenext).on('click',function(){
                //console.log(that.imageNow);
                if(that.couldRun){
                    that.couldRun=false;
                    that.mover();
                    setTimeout(function(){
                        that.couldRun=true;
                    },that.options.durationtime)
                }

            });
            //绑定左按钮事件
            $(that.options.eleprev).on('click',function(){
                if(that.couldRun){
                    that.couldRun=false;
                    that.movel();
                    setTimeout(function(){
                        that.couldRun=true;
                    },that.options.durationtime)
                }
            });
            //给第一张除外的图片样式，这样才会形成一进一出的效果
            $.each(that.$element,function(i){
                if(i!=0){
                    that.$element.eq(i).css({
                        left:that.moveWidth+"px"
                    });
                }
            })
            //设置定时器
            this.interval=setInterval(function(){
                that.mover()
            },that.options.intervaltime);
            //当鼠标移入容器时清除定时器
            $(that.$contentele).on("mouseover",function(){
                clearInterval(that.interval);
            });

            //当鼠标移开容器时设置定时器
            $(that.$contentele).on("mouseleave",function(){
                that.interval=setInterval(function(){
                    that.mover()
                },that.options.intervaltime);
            });
        },
        /*向左移动 右按钮*/
        mover:function(){
            this.$element.eq(this.imageNow).animate({
                "left":-(this.moveWidth)
            },500);
            var count=this.options.imgcount;
            this.imageNow=(this.imageNow+1)%count;
            this.$element.eq(this.imageNow).css({
                "left":this.moveWidth+"px"
            });
            this.$element.eq(this.imageNow).animate({
                "left":0
            },500)
        },

        /*向右移动 左按钮*/
        movel:function(){
            this.$element.eq(this.imageNow).animate({
                "left":this.moveWidth
            },500);
            var count=this.options.imgcount;
            this.imageNow=(this.imageNow+ count -1)%count;
            this.$element.eq(this.imageNow).css({
                "left":-(this.moveWidth)+"px"
            });
            this.$element.eq(this.imageNow).animate({
                "left":0
            },500)
        },

    }
    /*把对象引入到jquery中*/
    $.fn.mCol=function(opt){
        var mcarousel=new mCarousel(this,opt);
        mcarousel.init();
        return this;
    }
})(jQuery)
