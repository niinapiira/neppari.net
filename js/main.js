var ua = navigator.userAgent.toLowerCase(),
	isAndroid = ua.indexOf("android") > -1,
	isApple = /iPad|iPhone|iPod/.test(navigator.platform);

if (isAndroid) {
	document.body.className += " android";
}
if (isApple) {
	document.body.className += " apple";
}