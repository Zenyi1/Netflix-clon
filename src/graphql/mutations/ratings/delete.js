import Rating from '../../../Schemas/rating';
import {RatingType} from '../../types/Ratings';
import * as graphql from 'graphql';

export default {
    type: RatingType,
    args:{
        id:{
            name: 'ID',
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root,params){
        const deleteRating = Rating.findByIdAndRemove(params.id).exec()
        if(!deleteRating) throw Error("Error on delete")
        return deleteRating
    }
}