function detectMobileDevices() {
    var ua = navigator.userAgent.toLowerCase(),
        isAndroid = ua.indexOf("android") > -1,
        isIOs = /iPad|iPhone|iPod/.test(navigator.platform);

    if (isAndroid) {
        document.body.className = document.body.className
            .replace("not-ios-or-android", "android");
    } else if (isIOs) {
        document.body.className = document.body.className
            .replace("not-ios-or-android", "ios");
    }
}

(function(){
    detectMobileDevices();
})();