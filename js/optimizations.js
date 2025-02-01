// Performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Add lazy loading to all images
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // Optimize video background
    const video = document.querySelector('video');
    if (video) {
        video.setAttribute('preload', 'metadata');
        // Add poster image if not present
        if (!video.hasAttribute('poster')) {
            video.setAttribute('poster', 'images/poster.jpg');
        }
    }

    // System theme detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark-mode');
    }

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                Array.from(form.elements).forEach(input => {
                    if (!input.validity.valid) {
                        input.classList.add('error');
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = input.validationMessage;
                        input.parentNode.appendChild(errorMsg);
                    }
                });
            }
        });
    });

    // Add loading indicators
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator hidden';
    loadingIndicator.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingIndicator);

    // Show loading indicator before page transitions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            loadingIndicator.classList.remove('hidden');
        });
    });
});
