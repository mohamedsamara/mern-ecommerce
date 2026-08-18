(function (window) {
    window.__ENV = window.__ENV || {};

    const host = (window.location && window.location.host) || '';
    const protocol = (window.location && window.location.protocol) || 'https:';

    const MAPPINGS = [
        {
            match: 'frontend-route-demo-app-dev',
            api: 'https://backend-route-demo-app-dev.apps.okd-test.home.lab/api',
            socket: 'https://backend-route-demo-app-dev.apps.okd-test.home.lab'
        },
        {
            match: 'frontend-route-demo-app',
            api: 'https://backend-route-demo-app.apps.okd-test.home.lab/api',
            socket: 'https://backend-route-demo-app.apps.okd-test.home.lab'
        }
    ];

    const found = MAPPINGS.find(m => host.indexOf(m.match) >= 0);

    if (!window.__ENV.API_URL) {
        window.__ENV.API_URL = found ? found.api : 'http://localhost:3000/api';
    }

    if (!window.__ENV.SOCKET_URL) {
        window.__ENV.SOCKET_URL = found
            ? found.socket
            : host.indexOf('localhost') >= 0
                ? 'http://127.0.0.1:3000'
                : `${protocol}//${host}`;
    }
})(this);