/**
 * Dashboard Modal & Action Controllers
 */

// Show a brief inline toast message (used for guard-check feedback)
function showToast(message) {
    const toast = document.getElementById('actionToast');
    const text = document.getElementById('actionToastText');
    if (!toast || !text) {
        alert(message); // fallback if the toast markup isn't present
        return;
    }
    text.textContent = message;
    toast.classList.add('active');
    clearTimeout(window.__actionToastTimer);
    window.__actionToastTimer = setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}

// Open Transfer Modal
function openTransferModal() {
    const btn = document.getElementById('transferQuickBtn');
    const locked = btn ? btn.dataset.transferLocked === 'true' : false;
    const balance = btn ? parseFloat(btn.dataset.balance) : 0;

    if (locked) {
        showToast('You must complete OTP verification before you can transfer funds.');
        // Send them straight to the OTP payment modal instead of just blocking them.
        openOtpModal();
        return;
    }

    if (!balance || balance <= 0) {
        showToast('You need a positive account balance to make a transfer.');
        return;
    }

    const modal = document.getElementById('transferModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Open Crypto Deposit Modal
function openCryptoModal() {
    const modal = document.getElementById('cryptoModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Open OTP Verification Modal
function openOtpModal() {
    const modal = document.getElementById('otpModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Close Modal Utility
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Generic Copy-to-Clipboard by element id
function copyToClipboard(elementId) {
    const input = document.getElementById(elementId);
    if (input) {
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(input.value).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy: ' + err);
        });
    }
}

// Copy BTC Address to Clipboard
function copyBTC() {
    const btcInput = document.getElementById('btcAddress');
    if (btcInput) {
        btcInput.select();
        btcInput.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(btcInput.value).then(() => {
            alert('Bitcoin address copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy: ' + err);
        });
    }
}

// Close Modals when clicking outside of the modal box
window.onclick = function(event) {
    if (event.target.classList.contains('modal-backdrop')) {
        event.target.classList.remove('active');
    }
};

/**
 * Transaction Processing Overlay
 * Shows a spinner while a transaction "processes", then flips to a
 * success checkmark, before letting the real form submission continue.
 */
function runProcessingSequence(form) {
    const overlay = document.getElementById('processingOverlay');
    const spinner = document.getElementById('processingSpinner');
    const check = document.getElementById('processingCheck');
    const text = document.getElementById('processingText');
    if (!overlay || !spinner || !check || !text) {
        return; // Overlay markup missing, fall back to normal submit.
    }

    const processingMessage = form.dataset.processingText || 'Processing...';
    const successMessage = form.dataset.successText || 'Done!';

    // Disable the submit button so it can't be clicked twice mid-sequence.
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
    }

    // Stage 1: spinner + processing message
    spinner.style.display = 'block';
    check.classList.remove('active');
    text.textContent = processingMessage;
    overlay.classList.add('active');

    // Stage 2: swap to success checkmark
    setTimeout(() => {
        spinner.style.display = 'none';
        check.classList.add('active');
        text.textContent = successMessage;
    }, 1600);

    // Stage 3: actually submit the form (real request/navigation)
    setTimeout(() => {
        form.submit();
    }, 2600);
}

document.addEventListener('DOMContentLoaded', function () {
    ['transferForm', 'cryptoForm', 'otpForm'].forEach((formId) => {
        const form = document.getElementById(formId);
        if (!form) return;
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            runProcessingSequence(form);
        });
    });
});