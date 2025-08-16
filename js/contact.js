// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Real-time form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        removeFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters long';
                }
                break;
            
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (!isValid) {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    function validateForm() {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        errorDiv.id = `${field.name}-error`;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#ef4444';
    }

    function removeFieldError(field) {
        const errorDiv = field.parentNode.querySelector(`#${field.name}-error`);
        if (errorDiv) {
            errorDiv.remove();
        }
        field.style.borderColor = '#d1d5db';
    }

    function submitForm() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Remove any error styling
            contactForm.querySelectorAll('.error').forEach(field => {
                field.classList.remove('error');
                field.style.borderColor = '#d1d5db';
            });
            
        }, 2000);
    }

    // Contact card animations
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Social media links hover effects
    const socialLinks = document.querySelectorAll('.flex.space-x-4 a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.bg-white.p-6.rounded-2xl.shadow-sm');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Initially hide answer
            answer.style.display = 'none';
            answer.style.opacity = '0';
            answer.style.maxHeight = '0';
            answer.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
            
            // Add click handler
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('p');
                    if (otherAnswer && otherAnswer !== answer) {
                        otherAnswer.style.display = 'none';
                        otherAnswer.style.opacity = '0';
                        otherAnswer.style.maxHeight = '0';
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    answer.style.display = 'none';
                    answer.style.opacity = '0';
                    answer.style.maxHeight = '0';
                } else {
                    answer.style.display = 'block';
                    answer.style.opacity = '1';
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // Contact form character counter
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'text-sm text-gray-500 mt-1 text-right';
        charCounter.textContent = '0/500 characters';
        messageTextarea.parentNode.appendChild(charCounter);
        
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/500 characters`;
            
            if (length > 450) {
                charCounter.style.color = '#ef4444';
            } else if (length > 400) {
                charCounter.style.color = '#f59e0b';
            } else {
                charCounter.style.color = '#6b7280';
            }
        });
    }

    // Contact information copy functionality
    const contactInfo = document.querySelectorAll('.contact-card p');
    
    contactInfo.forEach(info => {
        if (info.textContent.includes('@') || info.textContent.includes('+')) {
            info.style.cursor = 'pointer';
            info.title = 'Click to copy';
            
            info.addEventListener('click', function() {
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`${text} copied to clipboard!`, 'success');
                }).catch(() => {
                    showNotification('Failed to copy to clipboard', 'error');
                });
            });
        }
    });

    // Map placeholder interaction
    const mapPlaceholder = document.querySelector('.bg-gray-200.rounded-2xl.h-96');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            showNotification('Interactive map coming soon!', 'info');
        });
    }

    // Form auto-save functionality
    const formFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    formFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            // Load saved data
            const savedValue = localStorage.getItem(`contact_${fieldName}`);
            if (savedValue) {
                field.value = savedValue;
            }
            
            // Save on input
            field.addEventListener('input', function() {
                localStorage.setItem(`contact_${fieldName}`, this.value);
            });
        }
    });

    // Clear saved data on successful submission
    contactForm.addEventListener('submit', function() {
        formFields.forEach(fieldName => {
            localStorage.removeItem(`contact_${fieldName}`);
        });
    });

    // Contact form accessibility improvements
    const formLabels = contactForm.querySelectorAll('label');
    
    formLabels.forEach(label => {
        const input = document.getElementById(label.getAttribute('for'));
        if (input) {
            // Add required indicator
            if (input.hasAttribute('required')) {
                const requiredSpan = document.createElement('span');
                requiredSpan.textContent = ' *';
                requiredSpan.style.color = '#ef4444';
                label.appendChild(requiredSpan);
            }
        }
    });

    // Keyboard navigation for form
    contactForm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const inputs = Array.from(contactForm.querySelectorAll('input, textarea'));
            const currentIndex = inputs.indexOf(e.target);
            const nextInput = inputs[currentIndex + 1];
            
            if (nextInput) {
                nextInput.focus();
            } else {
                contactForm.querySelector('button[type="submit"]').focus();
            }
        }
    });

    // Contact form progress indicator
    function updateFormProgress() {
        const filledFields = Array.from(contactForm.querySelectorAll('input, textarea')).filter(field => field.value.trim() !== '').length;
        const totalFields = contactForm.querySelectorAll('input, textarea').length;
        const progress = (filledFields / totalFields) * 100;
        
        // Create or update progress bar
        let progressBar = contactForm.querySelector('.form-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'form-progress w-full bg-gray-200 rounded-full h-2 mb-4';
            progressBar.innerHTML = '<div class="progress-fill bg-purple-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>';
            contactForm.insertBefore(progressBar, contactForm.firstChild);
        }
        
        const progressFill = progressBar.querySelector('.progress-fill');
        progressFill.style.width = `${progress}%`;
    }

    // Update progress on form input
    contactForm.addEventListener('input', updateFormProgress);
    updateFormProgress(); // Initial progress

    // Contact form validation feedback
    function showValidationFeedback(field, isValid) {
        const feedbackIcon = document.createElement('span');
        feedbackIcon.className = `validation-icon absolute right-3 top-1/2 transform -translate-y-1/2`;
        
        if (isValid) {
            feedbackIcon.innerHTML = '<i class="fas fa-check text-green-500"></i>';
        } else {
            feedbackIcon.innerHTML = '<i class="fas fa-times text-red-500"></i>';
        }
        
        // Remove existing feedback
        const existingIcon = field.parentNode.querySelector('.validation-icon');
        if (existingIcon) {
            existingIcon.remove();
        }
        
        field.parentNode.style.position = 'relative';
        field.parentNode.appendChild(feedbackIcon);
    }

    // Enhanced form validation with visual feedback
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            const isValid = validateField(this);
            showValidationFeedback(this, isValid);
        });
    });

    console.log('Contact page functionality loaded!');
});
