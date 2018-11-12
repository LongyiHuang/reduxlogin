import express from 'express';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config'


let router = express.Router();


const commonValidateInput = (data) =>{
    let errors = {};

    if(validator.isEmpty(data.account)){
        errors.account = 'The field is required';
    }


    if(validator.isEmpty(data.password)){
        errors.password = 'The field is required';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}


router.post('/',(req,res) => {
    const {errors,isValid} = commonValidateInput(req.body);
    if(isValid){
        const { account, password } = req.body;

        User.query({
            where:{username:account},
            orWhere:{email:account}
        }).fetch().then(user => {
                if(user){
                    if (bcrypt.compareSync(password, user.get('password_digest'))) {
                        const token = jwt.sign({
                            id:user.get('id'),
                            username:user.get('username'),
                        },config.jwtSecret);
                        res.json({"success":true,"token":token});
                    } else {
                        res.status(401).json({global: "Invalid Credentials"})
                    }
                }else{
                    res.status(401).json({global:"Invalid Credentials"});
                }
            }
        )

    }else{
        res.status(400).json(errors);
    }
});

export default router;