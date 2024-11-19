console.log('Redirect.js loaded');

function loadAmplitudeSDK() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.amplitude.com/libs/analytics-browser-2.9.3-min.js.gz';
        script.integrity = 'sha384-BWw9N39aN+4SdxZuwmRR0StXCLA+Bre4jR6bJt+pM1IqONNALC5rf25NkWMTyta5';
        script.crossOrigin = 'anonymous';
        script.onload = () => {
            console.log('Amplitude SDK loaded');
            resolve();
        };
        script.onerror = () => {
            console.log('Failed to load Amplitude SDK');
            reject();
        };
        document.head.appendChild(script);
    });
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function redirect(platform, url) {
    console.log('Redirecting to:', platform, url);
    window.location.href = url;
}

function trackEvent(eventName, eventProperties) {
    if (typeof amplitude !== 'undefined') {
        amplitude.track(eventName, eventProperties);
    } else {
        console.log('Analytics disabled:', eventName, eventProperties);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded');
    
    try {
        await loadAmplitudeSDK();
        amplitude.init("b7be85869a78669cddcda5e56b25c362");
        trackEvent('Page Viewed', { page: 'Redirect Page' });
    } catch (e) {
        console.log('Analytics will be disabled');
    }

    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const source = getQueryParam('source');
    console.log('UserAgent:', userAgent);
    console.log('Source:', source);

    if (/android/i.test(userAgent) || (source && source.includes('android'))) {
        trackEvent('Redirect Click', { platform: 'Android' });
        redirect('Android', 'https://play.google.com/store/apps/details?id=fi.pickatable.app');
    } else if (/iPad|iPhone|iPod/.test(userAgent) || (source && source.includes('ios'))) {
        trackEvent('Redirect Click', { platform: 'iOS' });
        redirect('iOS', 'https://apps.apple.com/fi/app/pickatable/id1663970460');
    } else {
        trackEvent('Redirect Click', { platform: 'pc' });
        redirect('pc', 'https://apps.apple.com/fi/app/pickatable/id1663970460');
    }
});