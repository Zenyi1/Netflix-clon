import * as graphql from 'graphql';

import User from '../../../Schemas/users';
import {UserType} from '../../types/Users';

const querySingleUser = {
    type: UserType,
    args:{
        id:{
            name: 'ID',
            type: graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root, params){
        const user = User.findById(params.id).exec()
        return user;
    }
}

export default querySingleUser;