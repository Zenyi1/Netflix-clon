import Movies from '../../../Schemas/movies';
import {MovieType, MovieInputType} from '../../types/Movies';
import * as graphql from 'graphql';

export default {
    type: MovieType,
    args:{
        id:{
            name: 'ID',
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        data: {
            name: 'data',
            type: new graphql.GraphQLNonNull(MovieInputType)
        }
    },
    resolve(root,params){
        return Movies.findByIdAndUpdate(params.id,{$set:{...params.data}})
                        .then((movie)=> Movies.findById(movie.id).exec())
                        .catch((err)=> new Error('Couldnt update Movie data'))
    }
}