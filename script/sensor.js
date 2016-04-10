

navigator.geolocation.getCurrentPosition(is_success,is_error);


function is_success(position) {
	var result = '結果';
	result += '経度：' + position.coords.latitude + '<br>';
	result += '緯度：' + position.coords.longitude + '<br>';
	result += '高度：' + position.coords.attitude + '<br>';
	result += '経度・緯度の誤差：' + position.coords.accuracy + '<br>';
	result += '高度の誤差：' + position.coords.altitudeAccuracy + '<br>';
	result += '方角：' + position.coords.heading + '<br>';
	result += '速度：' + position.coords.speed + '<br>';

	document.getElementById('result2').innerHTML = result;
}

function is_error(error) {
	var result = "";
	switch(error.code) {
		case 1:
			result = '位置情報の取得が許可されていません';
		break;
		case 2:
			result = '位置情報の取得に失敗しました';
		break;
		case 3:
			result = 'タイムアウトしました';
		break;
	}
	document.getElementById('result2').innerHTML = result;
}
