export const loginValidation = (username, password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username === '') {
        return {
            valid: false,
            errors: username === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(username) === false) {
        return {
            valid: false,
            errors: reg.test(username) === false ? "Email format is invalid" : null
        }
    }

    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else if (password.length < 6) {
        return {
            valid: false,
            errors: password.length < 6 ? "Password must should contain 6 digits" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}

export const Signup_validation = (username, email, password, userConfirmPassword, phone, dob, cnic, country, nationality) => {
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (username === "") {
        return {
            valid: false,
            errors: username === ""? "Please enter your name" : null
        }
    }
    if (username.length < 3) {
        return {
            valid: false,
            errors: username.length < 3 ? "Name must should contain 3 letters" : null
        }
    }

    if (email === '') {
        return {
            valid: false,
            errors: email === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(email) === false) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Email format is invalid" : null
        }
    }
    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else if (password.length < 6) {
        return {
            valid: false,
            errors: password.length < 6 ? "Password must should contain 6 digits" : null
        }
    }
    else if (userConfirmPassword === "") {
        return {
            valid: false,
            errors: userConfirmPassword === "" ? "Please enter your confirm password" : null
        }
    }
    else if (password !== userConfirmPassword) {
        return {
            valid: false,
            errors: password !== userConfirmPassword ? "Password doesn't match" : null
        }
    }
    else if (phone === '') {
        return {
            valid: false,
            errors: phone === '' ? "Please Enter Your Phone Number" : null
        }
    }
    else if (phone.length < 11) {
        return {
            valid: false,
            errors: phone.length < 11 ? "Phone Number must should contain 11 digits" : null
        }
    }
    else if (dob === '') {
        return {
            valid: false,
            errors: dob === '' ? "Please fill your date of birth" : null
        }
    }
    else if (dob <= 18) {
        return {
            valid: false,
            errors: dob <= 18 ? "Your date of birth must should be greater than 18 years" : null
        }
    }
    else if (cnic.length < 13) {
        return {
            valid: false,
            errors: cnic.length < 13 ? "Inavlid cnic number" : null
        }
    }
    else if (country === '') {
        return {
            valid: false,
            errors: country === '' ? "Please enter your country" : null
        }
    }

    else if (nationality === '') {
        return {
            valid: false,
            errors: nationality === '' ? "Please enter your nationality" : null
        }
    }

    else {
        return { valid: true, errors: null }
    }
}


export const updateValidation = (phone, dob, cnic, country, nationality) => {
    if (phone === '' || phone == null) {
        return {
            valid: false,
            errors: phone === '' || phone == null ? "Please Enter Your Phone Number" : null
        }
    }
    if (phone.length < 11) {
        return {
            valid: false,
            errors: phone.length < 11 ? "Please Enter Your Valid Phone Number" : null
        }
    }

    else if (dob === '') {
        return {
            valid: false,
            errors: dob === '' ? "Please fill your date of birth" : null
        }
    }
    else if (dob <= 18) {
        return {
            valid: false,
            errors: dob <= 18 ? "Your date of birth must should be greater than 18 years" : null
        }
    }
    else if (cnic.length < 13) {
        return {
            valid: false,
            errors: cnic.length < 13 ? "Inavlid cnic number" : null
        }
    }
    else if (country === '') {
        return {
            valid: false,
            errors: country === '' ? "Please enter your country" : null
        }
    }

    else if (nationality === '') {
        return {
            valid: false,
            errors: nationality === '' ? "Please enter your nationality" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}
