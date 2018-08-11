import * as graphql from "graphql";

import Rating from '../../../Schemas/rating';
import {RatingType} from '../../types/Ratings';

const querySingleRating = {

    type: RatingType,
    args:{
        id:{
            name:'ID',
            type: graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root,params){
        const rating = Rating.findById(params.id).exec()
        return rating
    }
}

export default querySingleRating