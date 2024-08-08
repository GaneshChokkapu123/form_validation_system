
function validateField(field) {
    const fieldId = field.id;
    let valid = true;
    let errorMessage = '';

    // Trim leading and trailing spaces
    if (field.value.trim() === '') {
        valid = false;
        errorMessage = `${fieldId.replace(/([A-Z])/g, ' $1')} cannot be empty`;
    } else {
        switch (fieldId) {
            case 'fullName':
                if (field.value.length < 5) {
                    valid = false;
                    errorMessage = 'Name must be at least 5 characters long';
                }
                break;
            case 'email':
                if (!field.value.includes('@')) {
                    valid = false;
                    errorMessage = 'Enter a valid email';
                }
                break;
            case 'phoneNumber':
                if (field.value === '123456789' || !/^\d{10}$/.test(field.value)) {
                    valid = false;
                    errorMessage = 'Enter a valid 10-digit phone number';
                }
                break;
            case 'password':
                const name = document.getElementById('fullName').value;
                if (field.value.length < 8 || field.value.toLowerCase() === 'password' || field.value.toLowerCase() === name.toLowerCase()) {
                    valid = false;
                    errorMessage = 'Password must be at least 8 characters long and should not be "password" or your name';
                }
                break;
            case 'confirmPassword':
                const password = document.getElementById('password').value;
                if (field.value !== password) {
                    valid = false;
                    errorMessage = 'Passwords do not match';
                }
                break;
        }
    }

    // Display error message
    const errorElement = document.getElementById(fieldId + 'Error');
    if (valid) {
        errorElement.textContent = '';
    } else {
        errorElement.textContent = errorMessage;
    }

    return valid;
}

// Function to validate the entire form
function validateForm() {
    const formFields = ['fullName', 'email', 'phoneNumber', 'password', 'confirmPassword'];
    let formIsValid = true;

    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
            formIsValid = false;
        }
    });

    // If form is valid, display success message
    if (formIsValid) {
        alert('Form submitted successfully!');
    }

    return formIsValid;
}

// Add event listeners to form fields on page load
window.onload = addEventListeners;

// Function to add event listeners to all form fields
function addEventListeners() {
    const formFields = ['fullName', 'email', 'phoneNumber', 'password', 'confirmPassword'];
    
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('change', () => validateField(field));
    });

    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
}
