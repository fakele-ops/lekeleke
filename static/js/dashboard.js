/**
 * Dashboard Modal & Action Controllers
 */

// Open Transfer Modal
function openTransferModal() {
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