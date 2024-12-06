function main(){
  window.addEventListener('deviceorientation', onOrientationChange)
  navigator.mediaDevices.getUserMedia({video: {
    facingMode: "environment",
  }

  }).then(function(signal){
    const video = document.getElementById('myVideo');
    video.srcObject = signal;
    video.play()

  }).catch(err => {
    alert(err)
  })
  document.getElementById('slider').onchange = (e) => {
    console.log(e);
    
    document.getElementById('distVal').innerHTML= "Distance: " + e.target.value + "meters"
  }
}

function onOrientationChange(event){
    let angle = event.beta - 90;
    if(angle<0){
        angle = 0
    }
    const horizontalDist = document.getElementById('slider').value
    document.getElementById('distVal').innerHTML= "Distance: " + horizontalDist + "meters"
    // simple tan angle formula
    // here tan expects angle in radians
    const height = Math.tan(angle * Math.PI/ 180) * horizontalDist ;

    document.getElementById('height').innerHTML = height.toFixed(1) + "m (" + angle.toFixed(1)+ "&deg;)"
     
   

}