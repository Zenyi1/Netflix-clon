import * as graphql from 'graphql';
import Movie from '../../../Schemas/movies';
import {MovieType, RankMovieType} from '../../types/Movies';


//Organizar los rank de estrellitas
export default {
    type: MovieType,
    args:{
        id:{
            name:"ID",
            type: graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        data:{
            name:"data",
            type: graphql.GraphQLNonNull(RankMovieType)
        }
    },resolve(root,params){
        const {id,data}= params
        return Movie.findByIdAndUpdate(id,{$push:{rank:data.rank}})
        .then((movie)=>{
            return Movie.findById(movie.id).exec()
        })
    }
}