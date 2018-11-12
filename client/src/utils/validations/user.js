import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


const validateInput = (userInfo) => {
    let errors = {};



    if(validator.isEmpty(userInfo.password)){
        errors.password = "This field is required";


    }else if(!validator.isLength(userInfo.password,{min:6,max:30})){
        errors.password = 'The length of the password must be 6 ~ 30 bits';
    }

    if(validator.isEmpty(userInfo.passwordConfirmation)){
        errors.passwordConfirmation = "This field is required";
    }

    if(!validator.equals(userInfo.password,userInfo.passwordConfirmation)){
        errors.passwordConfirmation = 'Passwords must match';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}


export default validateInput;