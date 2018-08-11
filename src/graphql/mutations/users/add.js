import Users from '../../../Schemas/users';
import {UserType, UserInputType } from '../../types/Users';
import * as graphql from 'graphql';

export default {

    type: UserType,
    args:{
        data:{
            name:'data',
            type: new graphql.GraphQLNonNull(UserInputType)
        }
    },
    resolve(root,params){
        const user = new Users(params.data)
        const newUser = user.save();
        if(!newUser) throw new Error("Error at creating user")
        return newUser
    }
}