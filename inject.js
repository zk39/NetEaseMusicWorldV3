// https://greasyfork.org/zh-CN/scripts/10582-%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E9%AB%98%E9%9F%B3%E8%B4%A8%E6%94%AF%E6%8C%81/code
// https://stackoverflow.com/questions/18310484/modify-http-responses-from-a-chrome-extension/51594799#51594799

var _asrsea
var asrsea_ = function () {
	var data = JSON.parse(arguments[0])
	if (data.br && data.br === 128000) {
		data.br = 320000
		arguments[0] = JSON.stringify(data)
	}
	return _asrsea.apply(window, arguments)
}
if (window.asrsea) {
	_asrsea = window.asrsea
	window.asrsea = asrsea_
}
else {
	Object.defineProperty(window, 'asrsea', {
		get: function () {
			return asrsea_
		},
		set: function (value) {
			_asrsea = value
		}
	})
}

var _open = XMLHttpRequest.prototype.open
window.XMLHttpRequest.prototype.open = function (method, url) {
	var _onreadystatechange = this.onreadystatechange, _this = this
	_this.onreadystatechange = function () {
		if (_this.readyState === 4 && _this.status === 200 && url.startsWith('/weapi/song/enhance/player/url')) {
			try {
				var data = JSON.parse(_this.responseText)
				data.data.forEach(song => song.url = song.url.replace(/(m\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net').replace('http://', 'https://'))
				Object.defineProperty(_this, 'responseText', {value: JSON.stringify(data)})
			} catch (e) {}
		}
		if (_onreadystatechange) _onreadystatechange.apply(this, arguments)
	}

	Object.defineProperty(this, 'onreadystatechange', {
		get: function () {
			return _onreadystatechange
		},
		set: function (value) {
			_onreadystatechange = value
		}
	})
	return _open.apply(_this, arguments)
}