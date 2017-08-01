
 var dcolor="black";

function chgBack(){
	
	if(dcolor=="black"){
//		var if1 = $(document).contents().find("#iframe1");
		document.getElementById("pageBody").style.backgroundColor="white";

		document.getElementById("bigbody").style.backgroundColor="white";
		document.getElementById("bigbody2").style.backgroundColor="white";
		$('.bigbody').css("backgroundColor","white");

		$('#navlist li').children('a').removeClass("ablack");
		$('#navlist li').children('a').addClass("awhite");
		
		$('.page').removeClass("blackbackground");
		$('.page').addClass("whitebackground");
		
		$('.whitecolor').addClass("blackcolor");
		$('.whitecolor').removeClass("whitecolor");
changeColor();
		//$(document).contents().find("#iframe1").contentWindow.changebg(dcolor);
		dcolor="white";
	}else{
		document.getElementById("pageBody").style.backgroundColor="black";

		document.getElementById("bigbody").style.backgroundColor="black";
		document.getElementById("bigbody2").style.backgroundColor="black";

		$('.bigbody').css("backgroundColor","black");

		$('#navlist li').children('a').removeClass("awhite");
		$('#navlist li').children('a').addClass("ablack");
		
		$('.page').removeClass("whitebackground");
		$('.page').addClass("blackbackground");

		
		$('.blackcolor').addClass("whitecolor");
		$('.blackcolor').removeClass("blackcolor");
changeColor();
		//$(document).contents().find("#iframe1").contentWindow.changebg(dcolor);
		dcolor="black";
	}
}


var pageTransition = {
    
    currentPageIndex: 0,
    
    pages: [],
    
    transitions: {
        'fromTop': {
            'reverse': 'toTop',
            'oppositeOut': 'toBottom',
            'oppositeIn': 'fromBottom',
        },
        'fromRight': {
            'reverse': 'toRight', 
            'oppositeOut': 'toLeft',
            'oppositeIn': 'fromLeft',
        },
        'fromBottom': {
            'reverse': 'toBottom', 
            'oppositeOut': 'toTop',
            'oppositeIn': 'fromTop',
        },
        'fromLeft': {
            'reverse': 'toLeft', 
            'oppositeOut': 'toRight',
            'oppositeIn': 'fromRight',
        },
    },
    
    transitionEndEventName: {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    },
    
    addPage: function(pageSelector, transitionName) {
        var page = {
            'selector': pageSelector,
            'transitionName': transitionName
        };
        this.pages.push(page);
    },
    
    getCurrentPage: function() {
        return this.pages[this.currentPageIndex] ? this.pages[this.currentPageIndex] : false;
    },
    
    getPreviousPage: function() {
        return this.pages[this.currentPageIndex - 1] ? this.pages[this.currentPageIndex - 1] : false;
    },
    
    getNextPage: function() {
        return this.pages[this.currentPageIndex + 1] ? this.pages[this.currentPageIndex + 1] : false;
    },    
	
	getPage: function(idx) {
        return this.pages[idx] ? this.pages[idx] : false;
    },
    
    first: function() {
        this.transitionEvent = this.transitionEndEventName[Modernizr.prefixed('animation')];
        
        if(!this.getCurrentPage())
            return false;
        
        this.transitionPageIn(this.getCurrentPage(), this.getCurrentPage().transitionName);
    },
    
    next: function() {      
        if(!this.getNextPage())
            return false;
        
        if(this.getCurrentPage()) {
            this.transitionPageOut(this.getCurrentPage(), this.transitions[this.getNextPage().transitionName].oppositeOut);
        }
        
        this.transitionPageIn(this.getNextPage(), this.getNextPage().transitionName);
        this.currentPageIndex++;
    },
    
    previous: function() {
        if(!this.getPreviousPage())
            return false;
        
        this.transitionPageOut(this.getCurrentPage(), this.transitions[this.getCurrentPage().transitionName].reverse);
        this.transitionPageIn(this.getPreviousPage(), this.transitions[this.getCurrentPage().transitionName].oppositeIn);
        this.currentPageIndex--;
    },


    topage: function(idx) {
        if(!this.getPage(idx))
            return false;
        
        if(this.getCurrentPage()) {
            this.transitionPageOut(this.getCurrentPage(), this.transitions[this.getPage(idx).transitionName].oppositeOut);
        }
        
        this.transitionPageIn(this.getPage(idx), this.getPage(idx).transitionName);
        this.currentPageIndex=idx;
    },
    
    transitionPageIn: function(page, pageTransitionName) {
         $(page.selector)
            .removeClass (function (index, css) {
                return (css.match (/(^|\s)page--animation-\S+/g) || []).join(' ');
            })
            .addClass('page--animation-' + pageTransitionName)
            .addClass('page--animation-' + pageTransitionName + '--animate')
            .addClass('page--current');
    },
    
    transitionPageOut: function(page, pageTransitionName) {        
        var context = this;
         $(document).on(this.transitionEvent, page.selector, function() {
            $(document).off(context.transitionEvent);
            $(page.selector)
                .removeClass (function (index, css) {
                    return (css.match (/(^|\s)page--animation-\S+/g) || []).join(' ');
                })
                .removeClass('page--current');
        });

         $(page.selector)
            .removeClass (function (index, css) {
                return (css.match (/(^|\s)page--animation-\S+/g) || []).join(' ');
            })
            .addClass('page--animation-' + pageTransitionName)
            .addClass('page--animation-' + pageTransitionName + '--animate')
            .addClass('page--current');
    }
    
};

// First, add all pages to pageTransition
$('.page').each(function(index) {
    var className = 'number-' + index;
    $(this).addClass(className);
    pageTransition.addPage('.' + className, $(this).data('transition'));
});

pageTransition.first();

 /***********************
 * 函数：判断滚轮滚动方向
 * 作者：walkingp
 * 参数：event
 * 返回：滚轮方向 1：向上 -1：向下
 *************************/
 var scrollFunc=function(e){

if(pageTransition.currentPageIndex!=0 && pageTransition.currentPageIndex!=1){
	return false;
}

     var direct=0;
     e=e || window.event;
    
     if(e.wheelDelta){//IE/Opera/Chrome
         if(e.wheelDelta>0){

if(pageTransition.currentPageIndex==0 ){
	return false;
}

			topreviouspage();
    
		 }else{
			
if(pageTransition.currentPageIndex==1){
	return false;
}

    tonextpage();
		 }
     }else if(e.detail){//Firefox
         if(e.detail>0){
if(pageTransition.currentPageIndex==0){
	return false;
}
			
    topreviouspage();
		 }else{
if(pageTransition.currentPageIndex==1){
	return false;
}			
    tonextpage();
		 }
     }
 }

function topreviouspage(){
	savecurrentCir();
	pageTransition.previous();
	changeCanvas();
}


function tonextpage(){
	savecurrentCir();
	pageTransition.next();
	changeCanvas();
}

function toapage(idx){
	savecurrentCir();
	pageTransition.topage(idx);
	changeCanvas();
}


function savecurrentCir(){

	if(pageTransition.currentPageIndex==2){
		circles3=circles;
	}else if(pageTransition.currentPageIndex==5){
		circles4=circles;
	}else if(pageTransition.currentPageIndex==6){
		circles5=circles;
	}else if(pageTransition.currentPageIndex==5){
		circles6=circles;
	}else{
		circles1 = circles;
	}

}


function changeCanvas(){
	  


	if(pageTransition.currentPageIndex==2){
		canvasid=3;
		circles = circles3;
	}else if(pageTransition.currentPageIndex==5){
		canvasid=4;
		circles = circles4;
	}else if(pageTransition.currentPageIndex==6){
		canvasid=5;
		circles = circles5;
	}else if(pageTransition.currentPageIndex==4){
		canvasid=6;
		circles = circles6;
	}else{
		canvasid='';
		circles = circles1;
	}	

//	circles = [];

	  canvas = document.getElementById("canvas" + canvasid);
      context = canvas.getContext("2d");
 
 if(!canvas.onmousedown){
      canvas.onmousedown = canvasClick;
      canvas.onmouseup = stopDragging;
      canvas.onmouseout = stopDragging;
      canvas.onmousemove = dragCircle;
 }
	  
      drawCircles();
}


 /*注册事件*/
 if(document.addEventListener){
     document.addEventListener('DOMMouseScroll',scrollFunc,false);
 }//W3C

document.onmousewheel=null;
document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari


 var scrollFunc2=function(e){
    e = e||window.event;
    if (e.stopPropagation) {//这是取消冒泡
        e.stopPropagation();
    } else{
        e.cancelBubble = true;
    };
//    if (e.preventDefault) {//这是取消默认行为，要弄清楚取消默认行为和冒泡不是一回事
//        e.preventDefault();
 //   } else{
//        e.returnValue = false;
//    };
 }

if(document.getElementById("bigbody").addEventListener){
	document.getElementById("bigbody").addEventListener('DOMMouseScroll',scrollFunc2,false);
}


if(document.getElementById("bigbody3").addEventListener){
	document.getElementById("bigbody3").addEventListener('DOMMouseScroll',scrollFunc2,false);
}

document.getElementById("bigbody").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody3").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody0").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody4").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody5").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody6").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody7").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody8").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari
document.getElementById("bigbody9").onmousewheel=scrollFunc2;//IE/Opera/Chrome/Safari



function changebg(dcolor){

	if(dcolor=="black"){
		document.getElementById("ifbody").style.backgroundColor="white";

		$('#navlist li').children('a').removeClass("ablack");
		$('#navlist li').children('a').addClass("awhite");

	}else{
		document.getElementById("ifbody").style.backgroundColor="black";
		$('#navlist li').children('a').removeClass("awhite");
		$('#navlist li').children('a').addClass("ablack");
	}

}



    // 这个方法用来储存每个圆圈对象
    function Circle(x, y, radius, color,t) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.isSelected = false;
	  this.t=t;
    }
 
    // 保存画布上所有的圆圈
    var circles = [];
    var circles1 = [];
    var circles3 = [];
    var circles4 = [];
    var circles5 = [];
    var circles6 = [];
    var circles9 = [];
	var t='c';
    var canvas;
    var context;
	var canvasid='';
	var repeflag=false;
 
    window.onload = function() {
      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");
 
      canvas.onmousedown = canvasClick;
      canvas.onmouseup = stopDragging;
      canvas.onmouseout = stopDragging;
      canvas.onmousemove = dragCircle;
	  
		changeColor();
    };
 
    function addRandomCircle(t) {


if(canvasid==3&&circles.length>0){
	return;
}




      var x = randomFromTo(0, canvas.width);
      var y = randomFromTo(0, canvas.height);

      // 为圆圈计算一个随机大小和位置
	        var radius = randomFromTo(10, 140);

			if(canvasid==4){
				radius = randomFromTo(5, 40);
			}else if(canvasid == 5 && mode5=='tangent'){

		if(circles.length>0){
			radius=10000;
		}
      for(var i=0; i<circles.length; i++) {
        var circle = circles[i];
			//使用勾股定理计算这个点与圆心之间的距离
			var distanceFromCenter = Math.sqrt(Math.pow(circle.x - x, 2)
				+ Math.pow(circle.y - y, 2));

			if(distanceFromCenter>circle.radius){
				if (radius>distanceFromCenter-circle.radius){
					radius=distanceFromCenter-circle.radius;
				}
			}else{
				if (radius>circle.radius-distanceFromCenter){
					radius=circle.radius-distanceFromCenter;
				}
			}
	  }
		
	}

if(repeflag && canvasid==''){
	radius=30;
}

 
      // 为圆圈计算一个随机颜色
      var colors = ["black"];
      var color = "black";
 
      // 创建一个新圆圈
      var circle = new Circle(x, y, radius, color,t);

	   if(canvasid == 5 && mode5=='tangent'){
			circle.t='c';
	   }
 
      // 把它保存在数组中
      circles.push(circle);
 
      // 重新绘制画布
      drawCircles();
    }

// js 利用sort进行排序
function CirSort(cirs) {
    return cirs.sort(function(a, b) {
        return b.radius - a.radius;
    });
 }

// function CirSort(arr){
 //   var i=arr.length-1;  //初始时,最后位置保持不变
//    while(i>0){
 //       varpos=0;//每趟开始时,无记录交换
  //      for(var j=0;j<i;j++){
 //           if(arr[j].radius < arr[j+1].radius){
   //             pos=j;//记录交换的位置
  //              vartmp=arr[j];
	//			arr[j]=arr[j+1];
//				arr[j+1]=tmp;
 //           }
//		}
//        i=pos;//为下一趟排序作准备
//    }
//    return arr;
//}



    function addCircle(x,y,radius,ttype) {
      // 为圆圈计算一个随机大小和位置
 //     var radius = randomFromTo(10, 140);
 //     var x = randomFromTo(0, canvas.width);
 //     var y = randomFromTo(0, canvas.height);


if(canvasid==3&&circles.length>0){
	return;
}

 
      // 为圆圈计算一个随机颜色
      var colors = ["black"];
      var color = "black";
 
      // 创建一个新圆圈
      var circle = new Circle(x, y, radius, color,ttype);
 
      // 把它保存在数组中
      circles.push(circle);
 
      // 重新绘制画布
      drawCircles();
    }

 
    function clearCanvas() {
      // 去除所有圆圈
      circles = [];
 
      // 重新绘制画布.
      drawCircles();
    }
 

//画圆
function drawCir(ctx,cir){
        ctx.arc(cir.x, cir.y, cir.radius, 0, Math.PI*2);
}

function drawTri(ctx,cir){
	var h=cir.radius*Math.sin(Math.PI/3);
	ctx.moveTo(cir.x,cir.y-h*2/3);
	ctx.lineTo(cir.x-cir.radius/2,cir.y+h/3);
	ctx.lineTo(cir.x+cir.radius/2,cir.y+h/3); 
	ctx.lineTo(cir.x,cir.y-h*2/3); 
}


function drawSqu(ctx,cir){
	ctx.moveTo(cir.x-cir.radius/2,cir.y-cir.radius/2);
	ctx.lineTo(cir.x+cir.radius/2,cir.y-cir.radius/2);
	ctx.lineTo(cir.x+cir.radius/2,cir.y+cir.radius/2);
	ctx.lineTo(cir.x-cir.radius/2,cir.y+cir.radius/2);
	ctx.lineTo(cir.x-cir.radius/2,cir.y-cir.radius/2);
}


 var dflag=false;
    function drawCircles() {
      // 清除画布，准备绘制
      context.clearRect(0, 0, canvas.width, canvas.height);
 
      // 遍历所有圆圈
      for(var i=0; i<circles.length; i++) {
        var circle = circles[i];
 
        // 绘制圆圈
        context.globalAlpha = 1;
      context.beginPath();
 //       context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
if(circle.t=='c'){
	drawCir(context,circle);
}else if(circle.t=='t'){
	drawTri(context,circle);
}else if(circle.t=='s'){
	drawSqu(context,circle);
}


        context.fillStyle = dcolor2;

if(dflag){
        context.strokeStyle = "black";
}else{
        context.strokeStyle = dcolor2;
}

if(canvasid==5 && mode5=='overlap'){
	context.globalCompositeOperation="xor";
}else{
context.globalCompositeOperation="source-over";
}


// zoom(circle.x, circle.y, circle.color, 1) ;
        if (circle.isSelected) {
          context.lineWidth = 1;
        }
        else {
          context.lineWidth = 0;
        }
        context.fill();
        context.stroke();
      }
    }
 
    var previousSelectedCircle;
 
var drawFalg;
var r;
var clickX;
var clickY;
var timer;
    var mode = 'symmetry';
	var mode5 = "overlap";


    var inverse_clickX;
    var inverse_clickY;

function inTrig(cx, cy , cir) {

	var h=cir.radius*Math.sin(Math.PI/3);

  var a = new Object();
  a.x = cir.x;
  a.y = cir.y-h*2/3

  var b = new Object();
  b.x = cir.x-cir.radius/2;
  b.y = cir.y+h/3

  var c = new Object();
  c.x = cir.x+cir.radius/2;
  c.y = cir.y+h/3

  var signOfTrig = (b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x);
  var signOfAB = (b.x - a.x)*(cy - a.y) - (b.y - a.y)*(cx - a.x);
  var signOfCA = (a.x - c.x)*(cy - c.y) - (a.y - c.y)*(cx - c.x);
  var signOfBC = (c.x - b.x)*(cy - c.y) - (c.y - b.y)*(cx - c.x);

  var d1 = (signOfAB * signOfTrig > 0);
  var d2 = (signOfCA * signOfTrig > 0);
  var d3 = (signOfBC * signOfTrig > 0);

  return d1 && d2 && d3;
}

    function canvasClick(e) {

	r=5;

	var contop = document.getElementById('bigbody' + canvasid).scrollTop;

      // 取得画布上被单击的点
      clickX = e.pageX - canvas.offsetLeft-445;
      clickY = e.pageY - canvas.offsetTop+contop-162;

	  
if(canvasid==6 ){
      if (mode == 'symmetry') {
        inverse_clickX = canvas.width - (e.pageX - canvas.offsetLeft-445);
        inverse_clickY = e.pageY - canvas.offsetTop+contop-162;
      }
      else {
        addRandomCircle(t, clickX);
      }
}
 


      // 查找被单击的圆圈
      for(var i=circles.length-1; i>=0; i--) {
        var circle = circles[i];

		var selectflag=false;

		if(circle.t=='c'){
			//使用勾股定理计算这个点与圆心之间的距离
			var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2)
				+ Math.pow(circle.y - clickY, 2));
			if(distanceFromCenter <= circle.radius){
				selectflag=true;
			}
		}else if(circle.t=='s'){
			if(	clickX>=circle.x-circle.radius/2 && clickX<=circle.x+circle.radius/2 && clickY>=circle.y-circle.radius/2 && clickY<=circle.y+circle.radius/2){
				selectflag=true;
			}
		}else if(circle.t=='t'){
			if(inTrig(clickX,clickY,circle)){
				selectflag=true;
			}
		}
        // 判断这个点是否在圆圈中
        if (selectflag) {
          // 清除之前选择的圆圈
          if (previousSelectedCircle != null) {
			previousSelectedCircle.isSelected = false;
		  }
          previousSelectedCircle = circle;
           
          //选择新圆圈
          circle.isSelected = true;
 
          // 使圆圈允许拖拽
          isDragging = true;
 
          //更新显示
          drawCircles();
 
          //停止搜索
          return;
        }
      }



	if(canvasid == 5 && mode5=='tangent'){

		if(circles.length>0){
			r=10000;
		}
      for(var i=0; i<circles.length; i++) {
        var circle = circles[i];
			//使用勾股定理计算这个点与圆心之间的距离
			var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2)
				+ Math.pow(circle.y - clickY, 2));

			if(distanceFromCenter>circle.radius){
				if (r>distanceFromCenter-circle.radius){
					r=distanceFromCenter-circle.radius;
				}
			}else{
				if (r>circle.radius-distanceFromCenter){
					r=circle.radius-distanceFromCenter;
				}
			}
	  }
		
	}



if(repeflag && canvasid==''){
	addCircle(clickX,clickY,30,t);
}else  if(canvasid == 5 && mode5=='tangent'){
	addCircle(clickX,clickY,r,'c');
}else{
	addCircle(clickX,clickY,r,t);
}

if(canvasid==6 ){

      if (mode == 'symmetry') {
        addCircle(inverse_clickX, inverse_clickY, r, t);
      }
}

	  if(timer){
		clearInterval(timer);
	  }

if((!repeflag || canvasid!='') && (canvasid != 5 || mode5!='tangent' || circles.length==1)){
	timer = setInterval(function(){
		  changeCircleRadius() 
		}, 100);
}

    }
 
 function changeCircleRadius(){
 
	for(var i=circles.length-1; i>=0; i--) {
		var circle = circles[i];
		if(circle.x==clickX && circle.y==clickY){
			circle.radius = circle.radius+2;
			if(canvasid==4&&circle.radius>40){
				circle.radius=50;
			}

		}
			
		if(canvasid==6 ){
			if (mode == 'symmetry' && circle.x == inverse_clickX && circle.y == inverse_clickY) {
			  circle.radius = circle.radius + 2;
			}
		}
	}
	drawCircles();
 
 }


 function sortCir(){


	var souttype = $('#repeAndrhythm4').text();

	if(souttype=='grid'){

		circles = CirSort(circles);

		var maxR=circles[0].radius;

		var cx = canvas.width/2;
		var cy = canvas.height/2;

		var i=0;

		circles[i].x=cx;
		circles[i].y=cy;
		var bc1 = circles[i].radius+5;
		var bc2 = circles[i].radius+5;



		i++


		while(i<circles.length){

			circles[i].y=cy;

			if(i%2==0){
				
				circles[i].x=cx  - bc1 - circles[i].radius;
				bc1 = bc1 + circles[i].radius*2+5;

			}else{
			
				
				circles[i].x=cx + bc2 + circles[i].radius;
				bc2 = bc2 + circles[i].radius*2+5;

			}

			i++;

		}

		$('#repeAndrhythm4').text('diffusion');

	}else{
	
		

			var dddf = 1;

		for(var i=0;i<circles.length;i++){


	        var mx = randomFromTo(0, 15);
	        var my = randomFromTo(0, 9);

				while (true){
					var nsf = true;
					for(var j=0;j<i;j++){
						if(circles[j].x == mx * 60 && circles[j].y == my * 60){
							nsf = false;
						}
					}
					if(nsf){
						break;
					}

					if(dddf%2==0){
						mx += 1;
					}else{
						my += 1;
					}
					dddf++;
				}

				circles[i].x = mx*60;
				circles[i].y = my*60;
			}

			
		$('#repeAndrhythm4').text('grid');
	
	}

	
	drawCircles();


 
 }


    //在某个范围内生成随机数
    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }
 
    var isDragging = false;
 
    function stopDragging() {
      isDragging = false;
	  if(timer){
		clearInterval(timer);
	  }
    }
 
    function dragCircle(e) {
      // 判断圆圈是否开始拖拽
      if (isDragging == true) {
        // 判断拖拽对象是否存在
        if (previousSelectedCircle != null) {
          // 取得鼠标位置

	var contop = document.getElementById('bigbody'+canvasid).scrollTop;

          var x = e.pageX - canvas.offsetLeft-445;
          var y = e.pageY - canvas.offsetTop+contop-162;
 
          // 将圆圈移动到鼠标位置
          previousSelectedCircle.x = x;
          previousSelectedCircle.y = y;
 
         // 更新画布
         drawCircles();
        }
      }
    }

var dcolor2="black";
var docBodyColor="white";

function changeColor(){

	if(docBodyColor=="white"){
		docBodyColor="black";
		document.getElementById("pageBody").style.backgroundColor="black";
		document.getElementById("canvas").style.borderColor="white";
		document.getElementById("canvas3").style.borderColor="white";
		$('.canvas').css("borderColor","white");
		$('.Scrollaspan').css("borderColor","white");
		$('.Scroll').css("color","white");
		$('.wrap1').css("background-color","white");
		//$('.block').css("background-image","-webkit-radial-gradient(center center, circle , #fff 72px, transparent 0)");
		$('.block').addClass("blockWhite");
		$('.block').removeClass("blockBlack");
		$('.wrapDiv').css("border","1px solid white");
		dcolor2="white";
	}else{
		docBodyColor="white";
		document.getElementById("pageBody").style.backgroundColor="white";
		document.getElementById("canvas").style.borderColor="black";
		document.getElementById("canvas3").style.borderColor="black";
		$('.canvas').css("borderColor","black");
		$('.Scroll').css("color","black");
		$('.Scrollaspan').css("borderColor","black");
		//$('.block').css("background-image","-webkit-radial-gradient(center center, circle , #000 72px, transparent 0)");
		$('.block').removeClass("blockWhite");
		$('.block').addClass("blockBlack");
		$('.wrapDiv').css("border","1px solid black");
		$('.wrap1').css("background-color","black");
		dcolor2="black";
	}

	if(docBodyColor=="white"){
		if(t=='t'){
			$('.changeshapeBtn').addClass("tribtn");
			$('.changeshapeBtn').removeClass("sqbtn");
			$('.changeshapeBtn').removeClass("cirbtn");
			$('.changeshapeDiv').addClass("changeshapeDivTri");
			$('.changeshapeDiv').removeClass("changeshapeDiv");
		}else if(t=='c'){
			$('.changeshapeBtn').removeClass("tribtn");
			$('.changeshapeBtn').removeClass("sqbtn");
			$('.changeshapeBtn').addClass("cirbtn");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}else if(t=='s'){
			$('.changeshapeBtn').removeClass("tribtn");
			$('.changeshapeBtn').addClass("sqbtn");
			$('.changeshapeBtn').removeClass("cirbtn");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}
		$('.changeshapeBtn').removeClass("tribtnWhite");
		$('.changeshapeBtn').removeClass("sqbtnWhite");
		$('.changeshapeBtn').removeClass("cirbtnWhite");
	}else{
		if(t=='t'){
			$('.changeshapeBtn').addClass("tribtnWhite");
			$('.changeshapeBtn').removeClass("sqbtnWhite");
			$('.changeshapeBtn').removeClass("cirbtnWhite");
			$('.changeshapeDiv').addClass("changeshapeDivTri");
			$('.changeshapeDiv').removeClass("changeshapeDiv");
		}else if(t=='c'){
			$('.changeshapeBtn').removeClass("tribtnWhite");
			$('.changeshapeBtn').removeClass("sqbtnWhite");
			$('.changeshapeBtn').addClass("cirbtnWhite");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}else if(t=='s'){
			$('.changeshapeBtn').removeClass("tribtnWhite");
			$('.changeshapeBtn').addClass("sqbtnWhite");
			$('.changeshapeBtn').removeClass("cirbtnWhite");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}
		$('.changeshapeBtn').removeClass("tribtn");
		$('.changeshapeBtn').removeClass("sqbtnW");
		$('.changeshapeBtn').removeClass("cirbtn");
	}
	
         // 更新画布
         drawCircles();
		 redraw();
}

function print1(){

//		$('.canvas').removeClass("print");
//		$('.canvas').addClass("screen");
		
//		$('#canvas').addClass("print");


//dflag=true;
//drawCircles();
window.print();
//dflag=false;
//drawCircles();
}

var shapes=new Array(3);
shapes[0]="c";
shapes[1]="t";
shapes[2]="s";
var shapeindex=1;

function changeshape(){
	t = shapes[shapeindex++];
	if(shapeindex>=shapes.length){
		shapeindex=0;
	}

	if(docBodyColor=="white"){
		if(t=='t'){
			$('.changeshapeBtn').addClass("tribtn");
			$('.changeshapeBtn').removeClass("sqbtn");
			$('.changeshapeBtn').removeClass("cirbtn");
			$('.changeshapeDiv').addClass("changeshapeDivTri");
			$('.changeshapeDiv').removeClass("changeshapeDiv");
		}else if(t=='c'){
			$('.changeshapeBtn').removeClass("tribtn");
			$('.changeshapeBtn').removeClass("sqbtn");
			$('.changeshapeBtn').addClass("cirbtn");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}else if(t=='s'){
			$('.changeshapeBtn').removeClass("tribtn");
			$('.changeshapeBtn').addClass("sqbtn");
			$('.changeshapeBtn').removeClass("cirbtn");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}
		$('.changeshapeBtn').removeClass("tribtnWhite");
		$('.changeshapeBtn').removeClass("sqbtnWhite");
		$('.changeshapeBtn').removeClass("cirbtnWhite");
	}else{
		if(t=='t'){
			$('.changeshapeBtn').addClass("tribtnWhite");
			$('.changeshapeBtn').removeClass("sqbtnWhite");
			$('.changeshapeBtn').removeClass("cirbtnWhite");
			$('.changeshapeDiv').addClass("changeshapeDivTri");
			$('.changeshapeDiv').removeClass("changeshapeDiv");
		}else if(t=='c'){
			$('.changeshapeBtn').removeClass("tribtnWhite");
			$('.changeshapeBtn').removeClass("sqbtnWhite");
			$('.changeshapeBtn').addClass("cirbtnWhite");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}else if(t=='s'){
			$('.changeshapeBtn').removeClass("tribtnWhite");
			$('.changeshapeBtn').addClass("sqbtnWhite");
			$('.changeshapeBtn').removeClass("cirbtnWhite");
			$('.changeshapeDiv').removeClass("changeshapeDivTri");
			$('.changeshapeDiv').addClass("changeshapeDiv");
		}
		$('.changeshapeBtn').removeClass("tribtn");
		$('.changeshapeBtn').removeClass("sqbtnW");
		$('.changeshapeBtn').removeClass("cirbtn");
	}
}


function swichrhythmandrepe(obj){
	if(repeflag){
		repeflag=false;
		$('#repeAndrhythm').text("rhythm");
	}else{
		repeflag=true;
		$('#repeAndrhythm').text("repetition");
	}

}


function swichrhythmandrepe6(obj){
	if(mode == 'symmetry'){
		$('#repeAndrhythm6').text("asymmetry");
		mode = 'asymmetry';
	}else{
		$('#repeAndrhythm6').text("symmetry");
		mode = 'symmetry';
	}

}




function swichrhythmandrepe5(obj){
	if(mode5 == 'overlap'){
		$('#repeAndrhythm5').text("tangent");
		mode5 = 'tangent';
	}else{
		$('#repeAndrhythm5').text("overlap");
		mode5 = 'overlap';
	}

}



var innerHTML = ''
for (var j = 0; j < 3; j++) {
  for (var i = 0; i < 3; i++) {
    innerHTML += '<div class="block blockWhite bblock'+ i + j +'" onclick="hide(this);"> </div>'
  }
}
$('.wrap').html(innerHTML)

function hide(obj) {
  obj.style.visibility = "hidden"
}

function reset1(obj){
	$('.block').css('visibility','visible');
}


function reset2(obj){
	$('.wrap1').css('visibility','visible');
}








var canvas9 = document.getElementById('canvas9');
var context9 = canvas9.getContext('2d');

function clearCanvas9(){
  context9.clearRect(0, 0, canvas9.width, canvas9.height);
  clickX9 = [];
  clickY9= [];
  inverse_clickX9 = [];
  inverse_clickY9 = [];
  clickDrag9 =[];
}


$('#canvas9').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
	var contop = document.getElementById('bigbody9').scrollTop;
  addClick(e.pageX - this.offsetLeft-445, e.pageY - this.offsetTop-162+contop);
  redraw();
});

$('#canvas9').mousemove(function(e){
  if(paint){
	var contop = document.getElementById('bigbody9').scrollTop;
    addClick(e.pageX - this.offsetLeft-445, e.pageY - this.offsetTop-162+contop, true);
    redraw();
  }
});

$('#canvas9').mouseup(function(e){
  paint = false;
});

//creates new arrays - performance better than new Array();
var clickX9 = [];
var clickY9 = [];
var inverse_clickX9 = [];
var inverse_clickY9 = [];

var clickDrag9 = [];
var paint;

function addClick(x, y, dragging)
{
  clickX9.push(x);
  clickY9.push(y);
  inverse_clickX9.push(850 - x);
  inverse_clickY9.push(y);
  clickDrag9.push(dragging);
}

function redraw(){
  context9.strokeStyle = dcolor2;
  context9.lineJoin = "round";
  context9.lineWidth = 5;

  for(var i=0; i < clickX9.length; i++)
  {
    context9.beginPath();
    if(clickDrag9[i] && i){
      context9.moveTo(clickX9[i-1], clickY9[i-1]);
     }else{
       context9.moveTo(clickX9[i]-1, clickY9[i]);
     }
     context9.lineTo(clickX9[i], clickY9[i]);
     context9.closePath();
     context9.stroke();
  }

  for(var i=0; i < inverse_clickY9.length; i++)
  {
    context9.beginPath();
    if(clickDrag9[i] && i){
      context9.moveTo(inverse_clickX9[i-1], inverse_clickY9[i-1]);
     }else{
       context9.moveTo(inverse_clickX9[i]-1, inverse_clickY9[i]);
     }
     context9.lineTo(inverse_clickX9[i], inverse_clickY9[i]);
     context9.closePath();
     context9.stroke();
  }
}