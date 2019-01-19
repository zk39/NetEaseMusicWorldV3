var mode

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
	var header = {
		name: 'X-Real-IP',
		value: '118.88.88.88'
	}
	if (mode > 0) details.requestHeaders.push(header)
	return { requestHeaders: details.requestHeaders }
}, { urls: ['*://music.163.com/*'] }, ['blocking', 'requestHeaders'])

// chrome.webRequest.onBeforeRequest.addListener(function (details) {
// 	var redirectUrl = details.url.replace(
// 		/(m\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net'
// 	)
// 	if (redirectUrl != details.url && mode > 1) return { redirectUrl: redirectUrl }
// }, { urls: ['*://*.music.126.net/*'] }, ['blocking'])

chrome.browserAction.onClicked.addListener(function (tab) {
	mode = (mode + 1) % 3
	setMode()
})

chrome.storage.local.get('mode', function (data) {
	mode = (typeof(data.mode) === 'undefined') ? 2 : data.mode
	setMode()
})

function setMode () {
	chrome.storage.local.set({ mode: mode })
	var titles = ['closed', 'normal', 'enhanced']
	var icons = ['images/grey.svg', 'images/red.svg', 'images/blue.svg']
	chrome.browserAction.setIcon({ path: icons[mode] })
	chrome.browserAction.setTitle({ title: chrome.i18n.getMessage('name') + ' ' + '[' + chrome.i18n.getMessage(titles[mode]) + ']' })
}