document.addEventListener('DOMContentLoaded', () => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('event');
    const eventPrice = urlParams.get('price');
    const eventImg = urlParams.get('img');

    // Elements
    const eventNameEl = document.getElementById('summary-event-name');
    const totalEl = document.getElementById('summary-total');
    const summaryImage = document.getElementById('summary-image');
    const form = document.getElementById('payment-form');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const successModal = document.getElementById('success-modal');

    // Populate Summary
    if (eventName) {
        eventNameEl.textContent = decodeURIComponent(eventName);
    } else {
        eventNameEl.textContent = 'Evento Desconocido';
    }

    if (eventImg) {
        summaryImage.src = decodeURIComponent(eventImg);
        summaryImage.classList.remove('hidden');
    }

    if (eventPrice) {
        totalEl.textContent = decodeURIComponent(eventPrice);
    } else {
        totalEl.textContent = '$0.00';
    }

    // Real-time Card Updates
    const cardNumInput = document.getElementById('card-number-input');
    const cardNameInput = document.getElementById('card-name-input');
    const cardExpiryInput = document.getElementById('card-expiry-input');
    
    const cardNumDisplay = document.getElementById('card-number-display');
    const cardNameDisplay = document.getElementById('card-name-display');
    const cardExpiryDisplay = document.getElementById('card-expiry-display');

    // Format Card Number
    cardNumInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 16);
        
        // Add spaces every 4 digits
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formattedValue;
        
        // Update Display
        cardNumDisplay.textContent = formattedValue || '•••• •••• •••• ••••';
    });

    // Update Name
    cardNameInput.addEventListener('input', (e) => {
        const value = e.target.value;
        cardNameDisplay.textContent = value || 'NOMBRE APELLIDO';
    });

    // Format Expiry
    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 4);
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        
        e.target.value = value;
        cardExpiryDisplay.textContent = value || 'MM/YY';
    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate Processing
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        btnText.textContent = 'Procesando...';
        btnSpinner.classList.remove('hidden');

        // Simulate API delay
        setTimeout(() => {
            // Success
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            btnText.textContent = 'Pagar Ahora';
            btnSpinner.classList.add('hidden');
            
            // Show Success Modal
            successModal.classList.remove('hidden');
        }, 2000);
    });
});