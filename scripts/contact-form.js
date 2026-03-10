/**
 * Contact Form Handler
 * Submits form data to Formspree via fetch API.
 * No external dependencies.
 */
(function () {
    'use strict';

    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var submitBtn = form.querySelector('.contact-form__submit');
        var statusEl = form.querySelector('.contact-form__status');
        var originalText = submitBtn.textContent;

        // Clear previous status
        statusEl.className = 'contact-form__status';
        statusEl.style.display = 'none';
        statusEl.textContent = '';

        // Loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        var formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            if (response.ok) {
                statusEl.textContent = 'Thank you! Your message has been sent successfully.';
                statusEl.className = 'contact-form__status contact-form__status--success';
                statusEl.style.display = 'block';
                form.reset();
            } else {
                return response.json().then(function (data) {
                    var msg = (data && data.errors)
                        ? data.errors.map(function (err) { return err.message; }).join(', ')
                        : 'Something went wrong. Please try again or email us directly.';
                    throw new Error(msg);
                });
            }
        })
        .catch(function (err) {
            statusEl.textContent = err.message || 'Something went wrong. Please try again or email us directly.';
            statusEl.className = 'contact-form__status contact-form__status--error';
            statusEl.style.display = 'block';
        })
        .finally(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
})();
