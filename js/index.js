// Analytics setup
const setupAnalytics = () => {
    window.amplitude.init('b7be85869a78669cddcda5e56b25c362');
    window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
    window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());
};

// Counter increment
const incrementCounter = async () => {
    try {
        const response = await fetch('https://europe-west1-pickatable-ca962.cloudfunctions.net/incrementCounter');
        if (!response.ok) {
            throw new Error('Failed to increment counter');
        }
        console.log('Counter incremented successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
};

// Load analytics scripts dynamically
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

// Initialize everything
const init = async () => {
    try {
        // Load analytics scripts
        await Promise.all([
            loadScript('https://cdn.amplitude.com/libs/analytics-browser-2.6.2-min.js.gz'),
            loadScript('https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.1.9-min.js.gz'),
            loadScript('https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz')
        ]);

        setupAnalytics();
        incrementCounter();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
};

init();