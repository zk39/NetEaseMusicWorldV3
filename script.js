// https://stackoverflow.com/questions/9263671/google-chrome-application-shortcut-how-to-auto-load-javascript/9310273#9310273
// https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script/9517879#9517879

chrome.storage.local.get('mode', function (data) {
	mode = (typeof(data.mode) === "undefined") ? 2 : data.mode
	if (mode == 2) inject()
})

function inject () {
	var script = (document.head || document.documentElement).appendChild(document.createElement('script'))
	script.src = chrome.extension.getURL('inject.js')
	script.onload = function() {
		script.parentNode.removeChild(script)
	}
}

