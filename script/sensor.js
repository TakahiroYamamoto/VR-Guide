window.addEventListener("deviceorientation", function(event) {
  var orientation = event.alpha;
  var pitch = event.beta;
  var roll= event.gamma;
  var result=document.getElementById("result");
  result.innerHTML = "方位(°)<br />"+
  "方位（東西南北:0～360）："+ orientation.toFixed(1) +"<br />" +
  "ピッチ（x軸回りの回転角度:-90～90）："+ pitch.toFixed(1) +"<br />" +
  "ロール（y軸回りの回転角度：-90～270）："+ roll.toFixed(1);
  $("div").css({transform:'rotate(' + orientation.toFixed(1) + 'deg)'}));
});
