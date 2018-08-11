import Movies from '../../../Schemas/movies';
import {MovieType} from '../../types/Movies';
import * as graphql from 'graphql';

export default {
    type: MovieType,
    args:{
        id:{
            name: 'ID',
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root,params){
        const deleteMovie = Movies.findByIdAndRemove(params.id).exec()
        if(!deleteMovie) throw Error("Error on delete")
        return deleteMovie
    }
}