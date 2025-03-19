// Connection Status Management
export class ConnectionStatus {
    constructor() {
        this.statusElement = document.getElementById('connection-status');
        this.setupEventListeners();
        this.updateStatus();
    }

    setupEventListeners() {
        window.addEventListener('online', () => this.updateStatus());
        window.addEventListener('offline', () => this.updateStatus());
    }

    updateStatus() {
        if (!this.statusElement) return;
        
        if (navigator.onLine) {
            this.statusElement.innerHTML = "🟢 Online";
            this.statusElement.style.backgroundColor = "#f1fff0";
        } else {
            this.statusElement.innerHTML = "🔴 Offline";
            this.statusElement.style.backgroundColor = "#fff0f0";
        }
    }
} 