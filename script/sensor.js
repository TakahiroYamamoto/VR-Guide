var g_degree = 0.0;
var g_Latitude = 35.55475412985779;
var g_Longitude = 139.67818632651213;

var g_myLatitude = 35.55475412985779;
var g_myLongitude = 139.67818632651213;

window.addEventListener("deviceorientation", function(event) {
  var orientation = 360.0 - event.webkitCompassHeading;
  var pitch = event.beta;
  var roll= event.gamma;
  var iPitch = 90.0 + pitch;
  var result;
  result = 'orientation：'+ orientation + '<br>';
  result += 'roll：' + roll + '<br>';
  result += 'pitch：' + iPitch + '<br>';
  document.getElementById("result").innerHTML = result;
  $(".absoluteHoui").css({transform:'rotate(' + (orientation) + 'deg)'});
  //$(".relative").css({"-webkit-transform":'rotateX(' + (iPitch) + 'deg)'});
  $(".absoluteMuki").css({transform:'rotate(' + (orientation+g_degree) + 'deg)'});
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

  g_myLatitude = position.coords.latitude;
  g_myLongitude = position.coords.longitude;
  document.getElementById('result2').innerHTML = result;
  var radian = Math.atan2(g_Latitude - g_myLatitude,g_Longitude - g_myLongitude);
  g_degree = (radian * 180.0 / Math.PI);
  document.getElementById('distanceText').innerHTML = calc_distance(g_Latitude,g_Longitude,g_myLatitude,g_myLongitude);
  $(".absoluteText1").html(calc_distance(g_Latitude,g_Longitude,g_myLatitude,g_myLongitude));
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

// 距離計算関数
// 参考サイト：http://www.mk-mode.com/octopress/2013/07/12/google-maps-api-calc-distance/
function calc_distance(lat_1, lng_1, lat_2, lng_2) {
  // 測地系定数
  // GRS80 ( 世界測地系 ) <- 現在の日本での標準
  const RX = 6378137.000000  // 赤道半径
  const RY = 6356752.314140  // 極半径
  // ベッセル楕円体 ( 旧日本測地系 ) <- 以前の日本での標準
  //const RX = 6377397.155000  // 赤道半径
  //const RY = 6356079.000000  // 極半径
  // WGS84 ( GPS ) <- Google はこの測地系
  //const RX = 6378137.000000  // 赤道半径
  //const RY = 6356752.314245  // 極半径

  // 2点の経度の差を計算 ( ラジアン )
  var a_x = lng_1 * Math.PI / 180 - lng_2 * Math.PI / 180;

  // 2点の緯度の差を計算 ( ラジアン )
  var a_y = lat_1 * Math.PI / 180 - lat_2 * Math.PI / 180;

  // 2点の緯度の平均を計算
  var p = (lat_1 * Math.PI / 180 + lat_2 * Math.PI / 180) / 2;

  // 離心率を計算
  var e = Math.sqrt((RX * RX - RY * RY) / (RX * RX));

  // 子午線・卯酉線曲率半径の分母Wを計算
  var w = Math.sqrt(1 - e * e * Math.sin(p) * Math.sin(p));

  // 子午線曲率半径を計算
  var m = RX * (1 - e * e) / (w * w * w);

  // 卯酉線曲率半径を計算
  var n = RX / w;

  // 距離を計算
  var d  = Math.pow(a_y * m, 2) + Math.pow(a_x * n * Math.cos(p), 2);
  d = Math.round(Math.sqrt(d)) / 1000;

  return d;
}

function updateValue(){
  var radian = Math.atan2(g_Latitude - g_myLatitude,g_Longitude - g_myLongitude);
  g_degree = (radian * 180.0 / Math.PI);
  document.getElementById('distanceText').innerHTML = calc_distance(g_Latitude,g_Longitude,g_myLatitude,g_myLongitude);
  $(".absoluteText1").html(calc_distance(g_Latitude,g_Longitude,g_myLatitude,g_myLongitude));
}

$(function() {
  $('#myHouse').click(function(){
    g_Latitude = 35.55475412985779;
    g_Longitude = 139.67818632651213;
    updateValue();
  });

  $('#Shinagawa').click(function(){
    g_Latitude = 35.6288;
    g_Longitude = 139.7388;
    updateValue();
  });

  $('#Yokohama').click(function(){
    g_Latitude = 35.4650968;
    g_Longitude = 139.6202978;
    updateValue();
  });

  $('#Shinkawasaki').click(function(){
    g_Latitude = 35.551696;
    g_Longitude = 139.671529;
    updateValue();
  });

  $('#Musashikosugi').click(function(){
    g_Latitude = 35.5758809;
    g_Longitude = 139.659688;
    updateValue();
  });

  $('#Nishiohi').click(function(){
    g_Latitude = 35.6017919;
    g_Longitude = 139.7218021;
    updateValue();
  });
});
