var g_orientation = 0.0;
window.addEventListener("deviceorientation", function(event) {
  g_orientation = 360.0 - event.webkitCompassHeading;
  var pitch = event.beta;
  var roll= event.gamma;
  var iPitch = 90.0 + pitch;
  var result;
  result = 'orientation：'+ g_orientation + '<br>';
  result += 'roll：' + roll + '<br>';
	result += 'pitch：' + iPitch + '<br>';
  document.getElementById("result").innerHTML = result;
  $(".absoluteHoui").css({transform:'rotate(' + (g_orientation) + 'deg)'});
  //$(".relative").css({"-webkit-transform":'rotateX(' + (iPitch) + 'deg)'});

});

option = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};
navigator.geolocation.watchPosition(success, error, option);

function success(position) {
	var result = '結果';
	result += '経度：' + position.coords.latitude + '<br>';
	result += '緯度：' + position.coords.longitude + '<br>';
	result += '高度：' + position.coords.attitude + '<br>';
	result += '経度・緯度の誤差：' + position.coords.accuracy + '<br>';
	result += '高度の誤差：' + position.coords.altitudeAccuracy + '<br>';
	result += '方角：' + position.coords.heading + '<br>';
	result += '速度：' + position.coords.speed + '<br>';

	document.getElementById('result2').innerHTML = result;
  var myLatitude = 35.55475412985779 - position.coords.latitude;
  var myLongitude = 139.67818632651213 - position.coords.longitude;
  var radian = Math.atan2(myLatitude,myLongitude);
  var degree = (radian * 180.0 / Math.PI);
  $(".absoluteMuki").css({transform:'rotate(' + (degree + g_orientation) + 'deg)'});
}

// 位置情報の取得に失敗した場合の処理
function error(error){
 var e = "";
 if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
  e = "位置情報が許可されてません";
 }
 if (error.code == 2) { //2＝現在地を特定できない
  e = "現在位置を特定できません";
 }
 if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
  e = "位置情報を取得する前にタイムアウトになりました";
 }
}
