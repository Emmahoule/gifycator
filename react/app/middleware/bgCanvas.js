import $ from 'jquery';

//Initialisation des variables
$(document).ready(function() { 
  var wWidth = $(window).width();
  var wHeight = $(window).height();
  var canvas = document.getElementById('bg-gradient');
  canvas.width  = wWidth;
  canvas.height = wHeight;
  var ctx = canvas.getContext('2d');
  // var values = {
  //   top:150,
  //   bottom:400
  // }

  function draw() {

    // Gradient gauche
    var grd=ctx.createLinearGradient(0,0,wWidth/2,wHeight/2);
    grd.addColorStop(0,"#ffffff");
    grd.addColorStop(0.5,"#eafed0");
    grd.addColorStop(1,"#87ebd9");
    
    // Gradient droite
    var grd2=ctx.createLinearGradient(0,0,wWidth/2,wHeight*3);
    grd2.addColorStop(0,"#87ebd9");
    grd2.addColorStop(0.5,"#eafed0");
    grd2.addColorStop(1,"#ffffff");
    
    // Forme gauche
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,wHeight);
    ctx.lineTo(2*(wWidth/3),wHeight); 
    ctx.lineTo(wWidth/3,0);
    ctx.fillStyle=grd;
    ctx.fill();
  
    // Forme droite
    ctx.beginPath();
    ctx.moveTo(wWidth/3,0);
    ctx.lineTo(2*(wWidth/3),wHeight);
    ctx.lineTo(wWidth,wHeight);
    ctx.lineTo(wWidth,0);
    ctx.fillStyle=grd2;
    ctx.fill();
  }

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  // Lancement de l'animation
  (function animloop(){
    requestAnimFrame(animloop);
    draw();
  })();

});

      
