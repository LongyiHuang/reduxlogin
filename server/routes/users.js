import express from 'express';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';
import moment from 'moment';



import User from '../models/user';

let router = express.Router();


const commonValidateInput = (data) =>{
    let errors = {};

    if(validator.isEmpty(data.username)){
        errors.username = 'The field is required';
    }


    if(validator.isEmpty(data.email)){
        errors.email = 'The field is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }


    if(validator.isEmpty(data.password)){
        errors.password = 'The field is required';
    }

    if(!validator.isLength(data.password,{min:6,max:30})){
        errors.password = 'The length of the password must be 6 ~ 30 bits';
    }

    if(validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = 'The field is required';
    }

    if(!validator.equals(data.password,data.passwordConfirmation)){
        errors.passwordConfirmation = 'Passwords must match';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}

const validateInput = (data,otherValidations) => {
    let {errors} = otherValidations(data);

    return User.query({
        where:{email:data.email},
        orWhere:{username:data.username}
    }).fetch().then(user => {
        if(user){
            if (user.get('email') === data.email) {
                errors.email = "There is user with such email";
            }
            if (user.get('username') === data.username) {
                errors.username = "There is user with such username";
            }
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }

    }).catch(err => {
        errors.global = err.sqlMessage;
        return {
            errors,
            isValid: isEmpty(errors)
        }
    });
}

router.post('/',(req,res) => {

    validateInput(req.body,commonValidateInput).then(({errors,isValid}) => {
        if(isValid){
            const { username, password, email } = req.body;
            //密码加密
            const password_digest = bcrypt.hashSync(password,10);

            // User.forge({username,password_digest,email}, {hasTimestamps:true}).save()
            //     .then(user => res.json({"success":true}))
            //     .catch(err => res.status(500).json({errors:err}))
            const time = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
            User.forge({
                username: username,
                password_digest: password_digest,
                email: email,
                created_at: time,
                updated_at: time
            }).save()
              .then(user => {
                  res.json({"success": true});
              }).catch(err => {
                    errors.global = err.sqlMessage;
                    res.status(500).json(errors);
              });
        }else{
            res.status(400).json(errors);
        }
    })
});


export default router;