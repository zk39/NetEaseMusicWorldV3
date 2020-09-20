let mode
const title = ['closed', 'normal', 'enhanced']
const icon = ['images/grey.svg', 'images/red.svg', 'images/blue.svg']

chrome.webRequest.onBeforeSendHeaders.addListener(
	details => {
		const { url, requestHeaders } = details
		if (url.includes('music.163.com')) {
			if (mode > 0) requestHeaders.push({
				name: 'X-Real-IP',
				value: '211.161.244.70'
			})
		} else if (url.includes('music.126.net')) {
			if (/m\d+c/.test(url)) requestHeaders.push({
				name: 'Cache-Control',
				value: 'no-cache'
			})
		}
		return { requestHeaders }
	},
	{ urls: ['*://music.163.com/*', '*://*.music.126.net/*'] },
	['blocking', 'requestHeaders']
)

const sync = () => {
	chrome.storage.local.set({ mode })
	chrome.browserAction.setIcon({ path: icon[mode] })
	chrome.browserAction.setTitle({ title: `${chrome.i18n.getMessage('name')} [${chrome.i18n.getMessage(title[mode])}]` })
}

chrome.storage.local.get('mode', data => {
	mode = data.mode == null ? 2 : data.mode
	sync()
})

chrome.browserAction.onClicked.addListener(() => {
	mode = (mode + 1) % 3
	sync()
})
