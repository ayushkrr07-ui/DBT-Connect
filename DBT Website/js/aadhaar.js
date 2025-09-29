document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aadhaar-checker-form');
    const captchaDisplay = document.getElementById('aadhaar-captcha-code');
    const refreshBtn = document.getElementById('aadhaar-refresh-captcha');
    const captchaInput = document.getElementById('aadhaar-captcha');
    const resultBox = document.getElementById('aadhaar-result');
    const statusEl = document.getElementById('aadhaar-seed-status');
    const detailsEl = document.getElementById('aadhaar-result-details');
    const checkAgainBtn = document.getElementById('aadhaar-check-again');

    function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        captchaDisplay.textContent = code;
    }

    refreshBtn.addEventListener('click', generateCaptcha);
    generateCaptcha();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const userCaptcha = captchaInput.value.trim();
        if (!userCaptcha || userCaptcha !== captchaDisplay.textContent) {
            alert('Incorrect captcha. Please try again.');
            generateCaptcha();
            captchaInput.value = '';
            return;
        }

        const aadhaar = document.getElementById('aadhaar-last4').value.trim();
        // Simulate a lookup: for demo, odd last digit => seeded, even => not seeded
        const lastDigit = parseInt(aadhaar[aadhaar.length - 1], 10);
        const seeded = !isNaN(lastDigit) && (lastDigit % 2 === 1);

        // Small simulated delay
        form.classList.add('loading');
        setTimeout(() => {
            form.classList.remove('loading');
            resultBox.style.display = 'block';
            if (seeded) {
                statusEl.textContent = 'Yes';
                statusEl.className = 'enabled';
                detailsEl.innerHTML = `<p>Your Aadhaar appears to be seeded (linked) with a bank account. For DBT eligibility also verify DBT enablement using the DBT checker.</p>`;
                document.querySelector('#aadhaar-result .result-icon i').className = 'fas fa-check-circle';
            } else {
                statusEl.textContent = 'No';
                statusEl.className = 'disabled';
                detailsEl.innerHTML = `<p>Your Aadhaar does not appear to be seeded with a bank account. Please visit your bank and request Aadhaar linking.</p>`;
                document.querySelector('#aadhaar-result .result-icon i').className = 'fas fa-times-circle';
            }
            // scroll into view
            resultBox.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });

    checkAgainBtn.addEventListener('click', function() {
        resultBox.style.display = 'none';
        form.reset();
        generateCaptcha();
        form.scrollIntoView({ behavior: 'smooth' });
    });
});
