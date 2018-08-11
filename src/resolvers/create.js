import jwt from 'jsonwebtoken';
import User from '../Schemas/users';
import bcrypt from 'bcrypt';

const expiresIn = '1d'; //Tiempo de expiracion
const secret = 'sample123' //Secret Key


export const createToken = (email,password) => {
    if(!email || !password){ //Checar si tiene  alguna informacion confidencial
        return false
    }

    const user = User.findOne({'email': email}).then((user) => {
        const compare = new Promise((resolve,reject)=> {
            bcrypt.compare(password,user.password, function(err,res){
                if(res){
                    const payload ={
                        email: user.email,
                        id: user._id
                    }

                    const token = jwt.sign(payload,secret,{
                        expiresIn
                    })

                    resolve(token)
                }
                else{
                    reject(false)
                }
            })
        })
        return compare
    }).catch()
    return user
}