import * as graphql from 'graphql';

import Movie from '../../../Schemas/movies';
import {MovieType} from '../../types/Movies';

const queryAllMovies = {
    type: new graphql.GraphQLList(MovieType),
    resolve(){
        const movies = Movie.find().exec()
        if(!movies) throw new Error("error at fetching movies")
        return movies
    }
}

export default queryAllMovies