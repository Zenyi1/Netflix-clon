import * as graphql from "graphql";

import Genre from '../../../Schemas/genres.';
import {GenreType} from '../../types/Genres';

const querySingleGenre = {

    type: GenreType,
    args:{
        id:{
            name:'ID',
            type: graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root,params){
        const genre = Genre.findById(params.id).exec()
        return genre
    }
}

export default querySingleGenre