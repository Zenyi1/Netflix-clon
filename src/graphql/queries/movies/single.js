import * as graphql from 'graphql';

import Movie from '../../../Schemas/movies';
import {MovieType} from '../../types/Movies';

const querySingleMovie = {
    type: MovieType,
    args: {
        id: {
            name: "ID",
            type: graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root, params){
        const movie = Movie.findById(params.id).exec()
        return movie
    }
}

export default querySingleMovie