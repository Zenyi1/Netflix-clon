import Genre from '../../../Schemas/genres.';
import {GenreType} from '../../types/Genres';
import * as graphql from 'graphql';

export default {
    type: GenreType,
    args:{
        id:{
            name: 'ID',
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root,params){
        const deleteGenre = Genre.findByIdAndRemove(params.id).exec()
        if(!deleteGenre) throw Error("Error on delete")
        return deleteGenre
    }
}