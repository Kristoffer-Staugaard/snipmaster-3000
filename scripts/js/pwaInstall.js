// PWA Installation Management
export class PWAInstallation {
    constructor() {
        this.deferredPrompt = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome from automatically showing the prompt
            e.preventDefault();
            
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;

            // Show the install button
            const installButton = document.getElementById('install-button');
            if (installButton) {
                installButton.style.display = 'block';

                installButton.addEventListener('click', () => {
                    // Show the install prompt
                    this.deferredPrompt.prompt();

                    // Wait for the user to respond to the prompt
                    this.deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the installation');
                            installButton.style.display = 'none';
                        }
                        this.deferredPrompt = null;
                    });
                });
            }
        });

        window.addEventListener('appinstalled', () => {
            console.log('Application installed');
            const installButton = document.getElementById('install-button');
            if (installButton) {
                installButton.style.display = 'none';
            }
        });
    }
} 