
const validator = require("validator");

const validateRegisterInput = ({ name, email, password}) => {
    const errors = {};

    if(!name || !name.trim()){
        errors.name = "Name is required";
    }else if(name.trim().length < 2 || name.trim().length > 50){
        errors.name = "Name must be between 2 and 50 characters";
    }

    if(!email || !email.trim()){
        errors.email = "Email is required";
    }else if(!validator.isEmail(email.trim())){
        errors.email = "Plese enter a valid email";
    }

    if(!password){
        errors.password = "Password is required";
    } else if(password.length <= 6){
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
};

const validateLoginInput = ({ email, password}) => {
    const errors = {};

    if(!email || !email.trim()){
        errors.email = "Email is required";
    }else if(!validator.isEmail(email.trim())){
        errors.email = "Plese enter a valid email";
    }

    if(!password){
        errors.password = "Password is required";
    } else if(password.length <= 6){
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = {
    validateRegisterInput,
    validateLoginInput
}