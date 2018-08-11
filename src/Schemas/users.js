import mongoose from 'mongoose';
//importe mongoose

import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
//inicialize un schema de mongoose

const UserSchema = new Schema({
    'name': {
        type: String,
        require: true
    },
    'lastName': {
        type: String,
        require: true
    },
    'email': {
        type: String,
        require: true
    },
    'password': {
        type:String,
        require:true
    },
    'birthDate': {
        type:Date,
        require: false
    },
    'phone': {
        type: String,
        require: true
    },
    'isPremium': {
        type: Boolean,
        default: false,
        require: false
    },
},{'collection' : 'users',timestamps: true} );
//cree el Schema de mongoose y le agrege timestamps para saber cuando se creo el usuario

UserSchema.pre('save',function(next){
    var user = this
//SOLO SI EL USUARIO MPDIFICA O CREA UNA NUEVA CONTRASENA
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})

export default mongoose.model('users',UserSchema);
//exporte el Schema