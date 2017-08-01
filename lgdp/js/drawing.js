var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var imageObj = new Image();

imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
      };

$("#clearCanvas").click(function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imageObj, 0, 0);
  clickX = []; 
  clickY= [];
  clickDrag =[];
});


$('#myCanvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
    
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#myCanvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#myCanvas').mouseup(function(e){
  paint = false;
});

//creates new arrays - performance better than new Array();
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){

  context.strokeStyle = "#ffffff";
  context.lineJoin = "round";
  context.lineWidth = 20;
  		
  for(var i=0; i < clickX.length; i++)
  {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}