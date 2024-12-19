let canvas;
let angle = 0;
let angle_to_reference_point = 0;
function main(){
canvas = document.getElementById('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("deviceorientation", onOrientationChange)
document.getElementById('slider').onchange = (e) => {
  document.getElementById('label').innerHTML = "Distance to reference: "+ e.target.value + "m"; 
}

}

function onOrientationChange(e){
  angle = e.alpha
  const offset = -Math.PI/2;
  const fixedAngle = (angle - angle_to_reference_point )*Math.PI/180 + offset
  const radius = Math.min(canvas.width, canvas.height)*0.45;

  const distToRef = document.getElementById('slider').value
  document.getElementById('label').innerHTML = "Distance to reference: "+ distToRef + "m"; 
  let distToTarget = Math.abs(Math.tan(fixedAngle - offset)) * distToRef
  const movingTip = {
    x: canvas.width/2 + Math.cos(fixedAngle) * radius,
    y: canvas.height/2 + Math.sin(fixedAngle) * radius,
  }

  const ctx = canvas.getContext('2d')
  ctx.clearRect(0,0,canvas.width, canvas.height)

  ctx.beginPath()
  ctx.fillStyle = '#47f'
  if(movingTip.y > canvas.height/2){
    ctx.fillStyle = 'red'
    distToTarget = 0 
  }
  if(movingTip.x > canvas.width/2){
    ctx.arc(canvas.width/2, canvas.height/2, radius, offset, fixedAngle)
  }else{
    ctx.arc(canvas.width/2, canvas.height/2, radius, offset, fixedAngle,true)
  }
  
  ctx.lineTo(canvas.width/2, canvas.height/2)
  ctx.fill()

  

  ctx.beginPath();
  ctx.strokeStyle = 'white'
  ctx.moveTo(canvas.width/2, canvas.height/2);
  ctx.lineTo(canvas.width/2, canvas.height/2 - radius)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = '#47f';
  ctx.moveTo(canvas.width/2, canvas.height/2);
 
  ctx.lineTo(movingTip.x, movingTip.y);
  ctx.stroke()

  ctx.beginPath()
  ctx.font = "55px Arial"
  ctx.textAlign = "center"
  ctx.fillText(distToTarget.toFixed(1) + "meters", canvas.width/2, canvas.height * 0.85)

}

function reset(){
angle_to_reference_point = angle;
}