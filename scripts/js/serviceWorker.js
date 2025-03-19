// Service Worker Registration
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope:', registration.scope);
                    showServiceWorkerStatus('Service Worker registered successfully!');
                })
                .catch(error => {
                    console.error('ServiceWorker registration failed:', error);
                    showServiceWorkerStatus('Service Worker registration failed!', true);
                });
        });
    } else {
        console.log('Service Workers not supported in this browser.');
        showServiceWorkerStatus('Service Workers not supported in this browser.', true);
    }
}

// Status display function
function showServiceWorkerStatus(message, isError = false) {
    let statusElement = document.getElementById('sw-status');
    if (!statusElement) {
        statusElement = document.createElement('div');
        statusElement.id = 'sw-status';
        document.body.appendChild(statusElement);
    }
    statusElement.className = isError ? 'sw-status error' : 'sw-status-success';
    statusElement.textContent = message;
    setTimeout(() => { statusElement.style.opacity = '0'; }, 3000);
} 