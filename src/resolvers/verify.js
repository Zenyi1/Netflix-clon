import User from '../Schemas/users';
import jwt from 'jsonwebtoken';
import { resolve } from 'url';
import { rejects } from 'assert';

const secret = 'sample123' // SECRET KEY
const prefixToken = "JWT";

export const verifyToken = (token) => {
    const [prefix,payload] = token.split(' ')

    let user = null
    if (!payload){
        throw new Error('No TOKEN provided') //NO TOKEN IN HEADER
    }
    if(prefix !== prefixToken){
        throw new Error('Invalid HEADER format')
    }
    jwt.verify(payload,secret,(err,data) => {
        if(err){
            throw new Error('INVALID TOKEN')
        }else {
            user = User.findOne({'_id':data.id}).exec()
            .then(res=>{
                return resolve(res);
            })
            .catch(err => {
                return rejects(err);
            })
        }
    })
    if(!user) {
        throw new Error('User does not exist in Database')
    }
}

/*export const verifyToken = async(token)=> {
    return new Promise((resolve,reject) => {
        const [prefix, payload] = token.split(' ');

        if(!payload) return reject('No token provided');
        if(prefix !== prefixToken) return reject('Invalid header format');

        jwt.verify(payload,secret, (err,data) => {
            if(err){
                return reject(err);
            }
            User.findOne({'_id':data.id}).exec()
                .then(res=>{
                    return resolve(res);
                })
                .catch(err => {
                    return reject(err);
                })
        })
    })
}*/


