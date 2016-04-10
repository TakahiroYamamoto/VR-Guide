

window.addEventListener("deviceorientation", function(event) {
  var orientation = event.webkitCompassHeading;
  var pitch = event.beta;
  var roll= event.gamma;
  var iRoll = 90 + parseInt(pitch.toFixed(1));
  var result=document.getElementById("result");
  result.innerHTML = "方位(°)<br />"+
  "方位（東西南北:0～360）："+ orientation.toFixed(1) +"<br />" +
  "ピッチ（x軸回りの回転角度:-90～90）："+ pitch.toFixed(1) +"<br />" +
  "ロール（y軸回りの回転角度：-90～270）："+ roll.toFixed(1);
  $(".absoluteHoui").css({transform:'rotate(' + (orientation.toFixed(1)) + 'deg)'});
  $(".relative").css({"-webkit-transform":'rotateX(' + (iRoll) + 'deg)'});

});

var watchID = navigator.geolocation.watchPosition(function(position) {
  var myLatitude = 35.55475412985779 - position.coords.latitude;
  var myLongitude = 139.67818632651213 - position.coords.longitude;
  double radian = Math.atan2(myLatitude,myLongitude);
  double degree = (radian * 180d / Math.PI);
  $(".absoluteMuki").css({transform:'rotate(' + degree + 'deg)'});

});
