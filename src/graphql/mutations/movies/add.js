import Movies from '../../../Schemas/movies';
import {MovieType, MovieInputType } from '../../types/Movies';
import * as graphql from 'graphql';

export default {

    type: MovieType,
    args:{
        data:{
            name:'data',
            type: new graphql.GraphQLNonNull(MovieInputType)
        }
    },
    resolve(root,params){
        const movie = new Movies(params.data)
        const newMovie = movie.save();
        if(!newMovie) throw new Error("Error at creating movie")
        return newMovie
    }
}