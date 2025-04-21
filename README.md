# NetEaseMusicWorld+

解锁网易云音乐网页版海外限制

## 安装
直接导入本地extension即可

## 使用

- 普通模式: 同 [acgotaku/NetEaseMusicWorld](https://github.com/acgotaku/NetEaseMusicWorld) 原版功能

- 增强模式: "重定向"解决海外 CDN 分发问题, 无需写入 hosts

## 说明
首次加载可能需要重启Chrome浏览器

因云村网页版播放器改为 XHR (fetch) 实现, 发出的 OPTIONS 请求被重定向后返回非 2XX 状态码导致预检失败, 此异常会导致歌曲播放进度记录出现问题 (下一首歌不从头开始播放 [#1](https://github.com/nondanee/NetEaseMusicWorldPlus/issues/1)), 不重定向 OPTIONS 请求又会因 DNS 解析失败而报错, 引发相同问题, 进退两难 (onBeforeRequest 无法直接返回 response, 只能重定向)。

故放弃通过 webRequest API 来重定向，采用 inject script 的方式拦截 AJAX 返回数据, 修改 url 达到重定向效果，因此切换模式后需要刷新页面，重新注入脚本，才会生效。
