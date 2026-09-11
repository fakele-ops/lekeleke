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

// Close Modal Utility
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
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