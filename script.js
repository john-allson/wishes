/* script.js aaaa */

document.addEventListener('DOMContentLoaded', () => {
    const creationView = document.getElementById('creationView');
    const viewingView = document.getElementById('viewingView');
    const generateWishBtn = document.getElementById('generateWish');
    const birthdayPersonInput = document.getElementById('birthdayPerson');
    const wisherNameInput = document.getElementById('wisherName');
    const shareLinkSection = document.getElementById('shareLinkSection');
    const shareLinkInput = document.getElementById('shareLink');
    const copyLinkBtn = document.getElementById('copyLink');
    const highlightedName = document.getElementById('highlightedName');
    const wishMessage = document.getElementById('wishMessage');
    const signature = document.getElementById('signature');

    // Birthday messages templates
    const birthdayMessages = [
        "May your day be filled with joy, laughter, and all the things that make you smile!",
        "Wishing you a day as special as you are! May all your dreams come true.",
        "On your special day, may you be surrounded by love, happiness, and wonderful memories!",
        "Here's to another amazing year of your life! May it bring you endless joy and success.",
        "May your birthday be the beginning of a year filled with good luck, good health, and much happiness!"
    ];

    // Function to trigger confetti
    function triggerConfetti() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    }

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const birthdayPerson = urlParams.get('to');
    const wisherName = urlParams.get('from');
    const messageIndex = urlParams.get('msg');

    if (birthdayPerson && wisherName && messageIndex) {
        // Show viewing view
        creationView.classList.add('hidden');
        viewingView.classList.remove('hidden');

        // Set the wish content
        highlightedName.textContent = decodeURIComponent(birthdayPerson);
        wishMessage.textContent = birthdayMessages[parseInt(messageIndex)];
        signature.textContent = decodeURIComponent(wisherName);

        // Trigger confetti after a short delay
        setTimeout(triggerConfetti, 500);
    } else {
        // Show creation view
        generateWishBtn.addEventListener('click', () => {
            const birthdayPerson = birthdayPersonInput.value.trim();
            const wisherName = wisherNameInput.value.trim();

            if (!birthdayPerson || !wisherName) {
                alert('Please fill in both names!');
                return;
            }

            // Generate random message index
            const messageIndex = Math.floor(Math.random() * birthdayMessages.length);

            // Create shareable URL
            const shareUrl = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(birthdayPerson)}&from=${encodeURIComponent(wisherName)}&msg=${messageIndex}`;
            
            // Show share link section
            shareLinkSection.classList.remove('hidden');
            shareLinkInput.value = shareUrl;

            // Scroll to share link section
            shareLinkSection.scrollIntoView({ behavior: 'smooth' });
        });

        // Copy link functionality
        copyLinkBtn.addEventListener('click', () => {
            shareLinkInput.select();
            document.execCommand('copy');
            copyLinkBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyLinkBtn.textContent = 'Copy Link';
            }, 2000);
        });

        // Social sharing functionality
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', () => {
                const message = `Check out this birthday wish I created for you!`;
                const shareUrl = shareLinkInput.value;
                const shareText = encodeURIComponent(message);

                let shareLink = '';
                
                if (button.classList.contains('whatsapp')) {
                    shareLink = `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`;
                } else if (button.classList.contains('facebook')) {
                    shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                } else if (button.classList.contains('twitter')) {
                    shareLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`;
                }

                if (shareLink) {
                    window.open(shareLink, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    // Add input animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});
