let mode

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
	if (details.url.includes('music.163.com')) {
		if (mode > 0) details.requestHeaders.push({
			name: 'X-Real-IP',
			value: '118.88.88.88'
		})
	}
	else if (details.url.includes('music.126.net')) {
		if (/m\d+c/.test(details.url)) details.requestHeaders.push({
			name: 'Cache-Control',
			value: 'no-cache'
		})
	}
	return {requestHeaders: details.requestHeaders}
}, {urls: ['*://music.163.com/*', '*://*.music.126.net/*']}, ['blocking', 'requestHeaders'])

chrome.browserAction.onClicked.addListener(() => {
	mode = (mode + 1) % 3
	sync()
})

chrome.storage.local.get('mode', data => {
	mode = data.mode == null ? 2 : data.mode
	sync()
})

const sync = () => {
	chrome.storage.local.set({mode: mode})
	const title = ['closed', 'normal', 'enhanced']
	const icon = ['images/grey.svg', 'images/red.svg', 'images/blue.svg']
	chrome.browserAction.setIcon({path: icon[mode]})
	chrome.browserAction.setTitle({title: `${chrome.i18n.getMessage('name')} [${chrome.i18n.getMessage(title[mode])}]`})
}