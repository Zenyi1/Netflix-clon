import * as graphql from "graphql";

import Rating from '../../../Schemas/rating';
import {RatingType} from '../../types/Ratings';

const queryAllRatings = {
    type:new graphql.GraphQLList(RatingType),
    resolve(){
        const ratings = Rating.find().exec()
        if(!ratings) throw new Error("Error at fetching genres")
        return ratings
    }
}

export default queryAllRatings;