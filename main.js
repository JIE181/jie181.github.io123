var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

function randomColor() {
    return 'rgb(' +
           random(0, 255) + ', ' +
           random(0, 255) + ', ' +
           random(0, 255) + ')';
}

function Ball(x,y,velX,velY,color,size) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.color = color
  this.size = size
}

Ball.prototype.draw = function(){
  ctx.beginPath()
  ctx.fillStyle = this.color; //用小球自己的color填充颜色
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI) //绘制的位置,从0到2π
  ctx.fill()
}

Ball.prototype.update = function(){
  if((this.x+this.size)>=width){  //如果小球的碰到了屏幕的边缘，则给一个反向的速度，最右边
    this.velX = -(this.velX);
  }
  if((this.x - this.size)<=0){ //最左边
    this.velX = -(this.velX);
  }

  if((this.y+this.size)>=height){ //最上面
    this.velY = -(this.velY);
  }
  if((this.y - this.size)<=0){ //最下面
    this.velY = -(this.velY);
  }

  this.x += this.velX
  this.y += this.velY
}

Ball.prototype.collisionDetect =function(){
  for(let j = 0; j<balls.length;j++){
    let curBall = balls[j]
    if(!(this==curBall)){
      var dx =this.x - curBall.x;
      var dy =this.y - curBall.y;
      var distanc =Math.sqrt(dx*dx + dy*dy)

      if(distanc < this.size+ curBall.size){
        curBall.color = this.color = randomColor()
      }
    }
  }
}

let balls = []

function loop(){
   //对画布进行刷新，有拖影计算0.25，可能会有前一次的残留影像
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while(balls.length<25){
    let ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      randomColor(),
      random(10,20)
      )
      balls.push(ball)
  }
  

  for(let i=0;i<balls.length;i++){
    let ball = balls[i]
    ball.draw()
    ball.update()
    ball.collisionDetect()
  }
  
  requestAnimationFrame(loop)
}

loop()
