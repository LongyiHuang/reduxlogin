import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default (req,res,next) => {
   const authorizationHeader = req.headers['authorization'];

   let token;

   if(authorizationHeader){
       token = authorizationHeader.split(" ")[1];
   }

   if(token){
       jwt.verify(token,config.jwtSecret,(err,decode) =>{
           if(err){
               res.status(401).json({global: 'Failed to authenticate'});
           }else{
               const{id} = decode;
               User.forge(
                   {id:id}
               ).fetch().then(user => {
                   if(user){
                       next();
                   }else{
                       res.status(401).json({global:'User does not exist'});
                   }
               }).catch(err => {
                   res.status(500).json({global:err.sqlMessage});
               });

           }
       });
   }else{
       res.status(403).json({global: 'No token provided'});
   }

}