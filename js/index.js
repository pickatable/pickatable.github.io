const setupAnalytics = () => {
    if (!window.amplitude) {
        console.warn('Analytics disabled: Required scripts not loaded');
        return;
    }

    const AMPLITUDE_API_KEY = window.AMPLITUDE_API_KEY;
    const SAMPLE_RATE = 0.1;

    try {
        window.amplitude.init(AMPLITUDE_API_KEY);
        window.amplitude.add(window.sessionReplay.plugin({ sampleRate: SAMPLE_RATE }));
        window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());
    } catch (error) {
        console.error('Failed to setup analytics:', error);
    }
};

const incrementCounter = async () => {
    const COUNTER_API_URL = 'https://europe-west1-pickatable-ca962.cloudfunctions.net/incrementCounter';
    
    try {
        const response = await fetch(COUNTER_API_URL);
        if (!response.ok) {
            throw new Error(`Failed to increment counter: ${response.status} ${response.statusText}`);
        }
        console.log('Counter incremented successfully.');
    } catch (error) {
        console.error('Error incrementing counter:', error);
        throw error;
    }
};

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = (error) => reject(new Error(`Failed to load script ${src}: ${error}`));
        document.body.appendChild(script);
    });
};

const init = async () => {
    const SCRIPT_URLS = {
        analytics: 'https://cdn.amplitude.com/libs/analytics-browser-2.6.2-min.js.gz',
        sessionReplay: 'https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.1.9-min.js.gz',
        autocapture: 'https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz'
    };

    try {
        // Load analytics in parallel but don't block page load
        setTimeout(async () => {
            try {
                await Promise.all([
                    loadScript(SCRIPT_URLS.analytics),
                    loadScript(SCRIPT_URLS.sessionReplay),
                    loadScript(SCRIPT_URLS.autocapture)
                ]);
                setupAnalytics();
            } catch (analyticsError) {
                console.warn('Analytics disabled: Script loading failed', analyticsError);
            }
        }, 2000);

        await incrementCounter();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
};

init();