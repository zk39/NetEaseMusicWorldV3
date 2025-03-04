let mode = 2; // 默认值
const title = ['closed', 'normal', 'enhanced'];
//const icon = ['images/grey.svg', 'images/red.svg', 'images/blue.svg'];
const icon = {
	0: {
		path: {
			16: "images/grey16.png"
		}
	},
	1: {
		path: {
			16: "images/red16.png"
		}
	},
	2: {
		path: {
			16: "images/blue16.png"
		}
	}
};
console.log(icon);

// 动态加载规则
const updateRules = async () => {
	const rules = await (await fetch('rules.json')).json();
	await chrome.declarativeNetRequest.updateDynamicRules({
		addRules: mode > 0 ? rules : [],
		removeRuleIds: rules.map(rule => rule.id)
	});
};

 	const sync = async () => {
	await chrome.storage.local.set({
		mode
	});
	//   chrome.action.setIcon({ path: icon[mode] });
	//   console.log(`mode: ${mode}`);

	//   chrome.action.setTitle({ 
	//     title: `${chrome.i18n.getMessage('name')} [${chrome.i18n.getMessage(title[mode])}]`
	//   });
	chrome.action.setIcon(icon[mode]);
	chrome.action.setTitle({
		title: `${chrome.i18n.getMessage('name')} [${chrome.i18n.getMessage(title[mode])}]`
	})
	await updateRules();
};

// 点击事件
chrome.action.onClicked.addListener(() => {
	mode = (mode + 1) % 3;
	sync();
});

// 初始化
chrome.storage.local.get('mode').then(data => {
	mode = data.mode ?? 2;
	sync();
});