let mode

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
	if (details.url.includes('163')) {
		if (mode > 0) details.requestHeaders.push({
			name: 'X-Real-IP',
			value: '118.88.88.88'
		})
	}
	return {requestHeaders: details.requestHeaders}
}, {urls: ['*://music.163.com/*']}, ['blocking', 'requestHeaders'])

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