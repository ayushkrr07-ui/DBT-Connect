document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const checkerForm = document.getElementById('dbt-checker-form');
    const resultContainer = document.getElementById('result-container');
    const checkAgainBtn = document.getElementById('check-again');
    const refreshCaptchaBtn = document.getElementById('refresh-captcha');
    const captchaCode = document.getElementById('captcha-code');
    const dbtStatusElement = document.getElementById('dbt-status');
    const resultIcon = document.querySelector('.result-icon i');
    const resultDetails = document.querySelector('.result-details');

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });

    // Generate random captcha
    function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            captcha += chars[randomIndex];
        }
        captchaCode.textContent = captcha;
    }

    // Refresh captcha when button is clicked
    refreshCaptchaBtn.addEventListener('click', generateCaptcha);

    // Generate initial captcha
    generateCaptcha();

    // Form submission handler
    checkerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate captcha
        const userCaptcha = document.getElementById('captcha').value;
        if (userCaptcha !== captchaCode.textContent) {
            alert('Incorrect captcha. Please try again.');
            generateCaptcha();
            document.getElementById('captcha').value = '';
            return;
        }

        // Get form values
        const aadhaarLast4 = document.getElementById('aadhaar').value;
        const accountLast4 = document.getElementById('bank-account').value;
        const bankName = document.getElementById('bank-name').value;
        const mobile = document.getElementById('mobile').value;

        // In a real application, this would make an API call to check the status
        // For this demo, we'll simulate a response based on the input
        
        // Simulate checking status (random result for demo purposes)
        // In a real application, this would be replaced with an actual API call
        checkDBTStatus(aadhaarLast4, accountLast4, bankName, mobile);
    });

    // Function to check DBT status (simulated)
    function checkDBTStatus(aadhaarLast4, accountLast4, bankName, mobile) {
        // Show loading state
        checkerForm.classList.add('loading');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Remove loading state
            checkerForm.classList.remove('loading');
            
            // For demo purposes, we'll randomly determine if the account is DBT enabled
            // In a real application, this would be determined by the API response
            const isEnabled = Math.random() > 0.3; // 70% chance of being enabled
            
            // Update result container based on status
            if (isEnabled) {
                dbtStatusElement.textContent = 'Enabled';
                dbtStatusElement.className = 'enabled';
                resultIcon.className = 'fas fa-check-circle';
                resultDetails.innerHTML = `
                    <p>Your bank account is properly linked with Aadhaar and enabled for Direct Benefit Transfer (DBT).</p>
                    <p>This means you are eligible to receive scholarship benefits directly into your bank account.</p>
                    <p>Make sure your scholarship application has the same bank account details to avoid any issues.</p>
                `;
            } else {
                dbtStatusElement.textContent = 'Not Enabled';
                dbtStatusElement.className = 'disabled';
                resultIcon.className = 'fas fa-times-circle';
                resultDetails.innerHTML = `
                    <p>Your bank account is either not linked with Aadhaar or not enabled for Direct Benefit Transfer (DBT).</p>
                    <p>This may cause delays or rejections in receiving scholarship benefits.</p>
                    <p>Please visit your bank branch with your Aadhaar card and request proper linking and DBT enablement.</p>
                `;
            }
            
            // Show result container and hide form
            checkerForm.style.display = 'none';
            resultContainer.style.display = 'block';
            
            // Scroll to result container
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }, 2000); // Simulate 2 second delay for API call
    }

    // Check again button handler
    checkAgainBtn.addEventListener('click', function() {
        // Hide result container and show form
        resultContainer.style.display = 'none';
        checkerForm.style.display = 'block';
        
        // Reset form
        checkerForm.reset();
        
        // Generate new captcha
        generateCaptcha();
        
        // Scroll to form
        checkerForm.scrollIntoView({ behavior: 'smooth' });
    });
});