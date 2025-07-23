function validateRegisterData(data) {
    const errors = {};

    if(!data.name || data.name.trim() === ''){
        errors.name = 'Enter your name';
    }

    if(!data.email || data.email.trim() === ''){
        errors.email = 'Enter your email';
    }else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(data.email)) {
            errors.email = 'Invalid email formate';
        }
    }

    if (!data.password) {
    errors.password = 'Enter the password';
    } else {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(data.password)) {
            errors.password = 'Password must be at least 8 characters long, include 1 number and 1 special character';
        }
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = 'Enter the confirm password';
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

module.exports = {validateRegisterData};