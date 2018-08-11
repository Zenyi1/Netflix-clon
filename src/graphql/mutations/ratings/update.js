import Rating from '../../../Schemas/rating';
import {RatingType, RatingInputType} from '../../types/Ratings';
import * as graphql from 'graphql';

export default {
    type: RatingType,
    args:{
        id:{
            name: 'ID',
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        data: {
            name: 'data',
            type: new graphql.GraphQLNonNull(RatingInputType)
        }
    },
    resolve(root,params){
        return Rating.findByIdAndUpdate(params.id,{$set:{...params.data}})
                        .then((rating)=> Rating.findById(rating.id).exec())
                        .catch((err)=> new Error('Couldnt update Rating data'))
    }
}