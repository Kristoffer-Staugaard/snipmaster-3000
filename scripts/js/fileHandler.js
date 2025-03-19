// File Handling
export class FileHandler {
    constructor(codePreview) {
        this.codePreview = codePreview;
        this.setupFileHandling();
    }

    setupFileHandling() {
        if ('launchQueue' in window && 'files' in LaunchParams.prototype) {
            window.launchQueue.setConsumer(async (launchParams) => {
                if (!launchParams.files.length) {
                    return;
                }

                // Handle each file
                for (const fileHandle of launchParams.files) {
                    try {
                        const file = await fileHandle.getFile();
                        const content = await file.text();

                        // Create a new snippet from the file
                        this.createSnippetFromFile({
                            name: file.name,
                            language: this.detectLanguage(file.name),
                            code: content
                        });

                    } catch (error) {
                        console.error('Error handling file:', error);
                        this.showError('Failed to open file. ' + error.message);
                    }
                }
            });
        }
    }

    detectLanguage(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        const extensionMap = {
            'js': 'javascript',
            'html': 'html',
            'css': 'css',
            'py': 'python',
            'java': 'java',
            'php': 'php',
            'rb': 'ruby',
            'md': 'markdown',
            'json': 'json',
            'xml': 'xml',
            'sql': 'sql',
            'sh': 'bash',
            'c': 'c',
            'cpp': 'cpp',
            'cs': 'csharp',
            'ts': 'typescript'
        };
        return extensionMap[extension] || 'plaintext';
    }

    createSnippetFromFile({ name, language, code }) {
        const codeEditor = document.getElementById('codeEditor');
        const languageSelect = document.getElementById('languageSelect');

        if (codeEditor && languageSelect) {
            codeEditor.value = code;

            if (Array.from(languageSelect.options).some(opt => opt.value === language)) {
                languageSelect.value = language;
            }

            // Update preview using the CodePreview instance
            this.codePreview.updatePreview();

            this.showMessage(`Opened file: ${name}`);
        }
    }

    showMessage(text) {
        const message = document.createElement('div');
        message.className = 'status-message';
        message.textContent = text;
        document.body.appendChild(message);
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    showError(message) {
        this.showMessage(message);
    }
} 