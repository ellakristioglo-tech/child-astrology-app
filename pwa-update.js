(function setupAutomaticAppUpdates() {
    'use strict';

    const CURRENT_BUILD = '__APP_BUILD_VERSION__';
    const IS_DEPLOYED_BUILD = !CURRENT_BUILD.startsWith('__APP_');
    const CHECK_INTERVAL_MS = 30 * 1000;
    let checkInProgress = false;
    let reloadStarted = false;
    let registration = null;
    const hadControllerAtStartup = Boolean(
        'serviceWorker' in navigator && navigator.serviceWorker.controller
    );

    function loadCurrentSupportCenter() {
        const existing = document.querySelector('script[data-support-center-loader]');
        if (existing) return;
        const script = document.createElement('script');
        script.src = './support-center.js?v=' + encodeURIComponent(CURRENT_BUILD);
        script.async = false;
        script.dataset.supportCenterLoader = '1';
        document.body.appendChild(script);
    }

    function reloadOnce() {
        if (reloadStarted) return;
        reloadStarted = true;
        window.location.reload();
    }

    async function readPublishedVersion() {
        const url = new URL('./version.json', window.location.href);
        url.searchParams.set('check', Date.now().toString());
        const response = await fetch(url.href, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
        });
        if (!response.ok) return null;
        const data = await response.json();
        return typeof data.version === 'string' ? data.version.trim() : null;
    }

    async function checkForUpdate() {
        if (!IS_DEPLOYED_BUILD || checkInProgress || reloadStarted || !navigator.onLine) return;
        checkInProgress = true;
        try {
            const publishedVersion = await readPublishedVersion();
            if (!publishedVersion || publishedVersion === CURRENT_BUILD) return;
            if (registration) {
                await registration.update().catch(function ignoreUpdateError() {});
            }
            reloadOnce();
        } catch (error) {
        } finally {
            checkInProgress = false;
        }
    }

    async function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        try {
            registration = await navigator.serviceWorker.register(
                './sw.js?v=' + encodeURIComponent(CURRENT_BUILD),
                { scope: './', updateViaCache: 'none' }
            );
            await registration.update().catch(function ignoreUpdateError() {});
        } catch (error) {
        }
    }

    loadCurrentSupportCenter();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', function onControllerChange() {
            if (hadControllerAtStartup) reloadOnce();
        });
    }

    window.addEventListener('load', function onLoad() {
        registerServiceWorker().finally(checkForUpdate);
    });
    window.addEventListener('pageshow', checkForUpdate);
    window.addEventListener('focus', checkForUpdate);
    window.addEventListener('online', checkForUpdate);
    document.addEventListener('visibilitychange', function onVisibilityChange() {
        if (document.visibilityState === 'visible') checkForUpdate();
    });
    window.setInterval(checkForUpdate, CHECK_INTERVAL_MS);
})();
