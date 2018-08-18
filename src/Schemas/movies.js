import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var MovieSchema = new Schema({

    'image': {
        type: String,
        require: true
    },
    'name': {
        type: String,
        require: true
    },
    'synopsis': {
        type: String,
        require: true
    },
    'director': {
        type: String,
        require: true
    },
    'year': {
        type: Number,
        require: true
    },
    'rank': {
        type: [Number],
        require: true
    },
    'duration': {
        type: String,
        require: true
    },
    'rating': {
        type: Schema.Types.ObjectId,
        ref: 'rating'
    },
    'genre': {
        type: Schema.Types.ObjectId,
        ref: 'genre'
    },
    'language': {
        type: String,
        require: true
    },
    'premium': {
        type: Boolean,
        require: true
    },
    'url': {
        type: String,
        require: true
    }
}, { 'collection': 'movies', timestamps: true });


export default mongoose.model('movies',MovieSchema);
