import express from 'express';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';
import moment from 'moment';
import authenticate from '../middlewares/authenticate';



import User from '../models/user';

let router = express.Router();


const commonValidateInput = (data) =>{
    let errors = {};


    if(validator.isEmpty(data.password)){
        errors.password = 'The field is required';
    } else if(!validator.isLength(data.password,{min:6,max:30})){
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
    return User.forge({
        id:data.id
    }).fetch().then(user => {
        if(!user){
            errors.global = "User does not exist";
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

router.post('/',authenticate,(req,res) => {
    validateInput(req.body,commonValidateInput).then(({errors,isValid}) => {
        if(isValid){
            const {password ,id} = req.body;
            User.forge({id:id}).fetch().then(user => {
                if(user){
                    //密码加密
                    const password_digest = bcrypt.hashSync(password,10);
                    const updated_at = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
                    User.forge()
                        .where("id","=",id)
                        .save({
                            password_digest:password_digest,
                            updated_at:updated_at
                        },{patch:true}).then(user => {
                            res.json({"success":true});
                        }).catch(err => {
                            errors.global = err.sqlMessage;
                            res.status(500).json(errors);
                        }
                    );
                }else{
                    errors.global = "No such user";
                    res.status(500).json(errors);
                }
            });
        }else{
            res.status(400).json(errors);
        }
    })
});

router.get('/:identifier',(req,res) => {
    console.log("identifier",req.param('identifier'));
    User.query(
        {where:{username:req.param('identifier')},orWhere:{email:req.param('identifier')}}
    ).fetch({columns:["id","email",'username']})
        .then(user => {
            res.json({"success":true,user:user});
        }).catch(err => {
            let errors = {};
            errors.global = err.sqlMessage;
            res.status(500).json(errors);
    });
});


export default router;