import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema ({
    'name':{
        type: String,
        require: true
    }, 
    'genre': {
        type: Schema.Types.ObjectId, 
        ref: 'genres',
        require: true,
    },
    'synopsys': {
        type: String,
        require: true
    },
    'cast': {
        type:String,
        require:false
    },
    'year' : {
        type:Number,
        require:true
    },
    'rank': {
        type:String,
        require:true
    },
    'length': {
        type: Number,
        require: true
    },
    'rating' : {
        type: Schema.Types.ObjectId,
        require: true,
        ref:'ratings'
    }
})


export default mongoose.model('movies',MovieSchema);
