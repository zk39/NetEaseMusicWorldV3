let mode

// hook request headers
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  const header = {
    name: 'X-Real-IP',
    value: '118.88.88.88'
  }
  if (mode > 0) details.requestHeaders.push(header)
  return { requestHeaders: details.requestHeaders }
}, { urls: ['*://music.163.com/*'] }, ['blocking', 'requestHeaders'])

// redirect cdn access
chrome.webRequest.onBeforeRequest.addListener(function (details) {
  const redirectUrl = details.url.replace(
    /(m\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net'
  )
  if (mode > 1) return { redirectUrl: redirectUrl }
}, { urls: ['*://*.music.126.net/*'] }, ['blocking'])

// mode switch
chrome.browserAction.onClicked.addListener(function (tab) {
  mode = (mode + 1) % 3
  chrome.storage.local.set({ mode: mode })
  setModeIcon()
})

// initialize
chrome.storage.local.get('mode', function (data) {
  mode = (typeof(data.mode) === "undefined") ? 2 : data.mode
  chrome.storage.local.set({ mode: mode })
  setModeIcon()
})

// sync ui status
function setModeIcon(){
  if (mode == 0) chrome.browserAction.setIcon({ path: 'images/grey.svg'})
  else if (mode == 1) chrome.browserAction.setIcon({ path: 'images/red.svg'})
  else if (mode == 2) chrome.browserAction.setIcon({ path: 'images/blue.svg'})
}