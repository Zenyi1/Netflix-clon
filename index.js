import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
//importe mongoose y express y body-parser despues de descargarlos con npm install ****** --save

import cors from 'cors'

import {createToken} from './src/resolvers/create'
import {verifyToken} from './src/resolvers/verify'
//importa dos funciones para crear y verificar el Json Web Token

import graphQLHTTP from 'express-graphql';

import schema from './src/graphql';

import User from './src/Schemas/users'
//importe User script de otra carpeta

//importa Movie script de otra carpeta

const JsonParser = bodyParser.json();

const app = express();
//inicialize el framework de express

const port = process.env.Port || 3000;
//inicialize el puerto

mongoose.connect('mongodb://zenyiOP:a12345@ds111492.mlab.com:11492/movies');
const db = mongoose.connection;
db.on('error',() => console.log("Failed to connect"))
    .once('open',() => console.log('Connected to MongoDB'));
//conecte mLab como mi hosting


app.listen(port, () => {
    console.log('Server works on port 3000')
})
//para verificar que esta funcionando

app.use((cors()));

app.get('/',(req,res) => {
    res.send("Hello World");
});
//Mande Hello World a la URL del Port


app.get('/hola',(req,res) => {
    res.send("Hello hola");
});
//mande otra STRING a la URL del port junto con /hola

app.get('/addUser',(req,res) => {
    var user = new User({
        "name":"TEST",
        "lastName":"Testing",
        "email":"test@test.com",
        "password":"123456",
        "phone":"662662662"
    });

    user.save((err) => {
        if(err) throw err 
        res.send('Usuario Creado');
    })
})
//agregue un usuario a la base de datos

app.get('/userList', function(req,res){
    User.find({}).then(function(users){
        res.send(users);
    })
})
//muestra el JSON de todos los usuarios creados

app.post('/register',JsonParser, (req,res) => {
    var user = new User(req.body);
    console.log(req.body)

    user.save((err) => {
        if(err) throw err;
        res.send('Usuario Registrado');
    })
})
//Registra usuarios con POST

//saca un Json TOKEN para los usuarios creados
app.use('/login', JsonParser, (req,res) => {
    if(req.method === 'POST'){
        const token = createToken(req.body.email, req.body.password).then((token)=>{
            res.status(200).json({token});
        })
        .catch((err)=> {
            res.status(403).json({
                message: 'Login FAILED, invalid credentials'
            })
        })
    }
})

//Verifica el TOKEN
app.use('/verifyToken', JsonParser, (req,res) => {
    if(req.method === 'POST') {
        try{
            const token = req.headers['authorization']
            verifyToken(token)
            .then(user => {
                res.status(200).json({user});
                console.log(user)
            })
            .catch(err => {
                console.log(err)
            })
        } catch(e){
            console.log(e.message);
            res.status(401).json({
                message:e.message
                //Mostrar Mensaje si el TOKEN no funciona
            })
        }
    }
})

//MIDDLEWARE
app.use('/graphql',(req,res,next) => {
    
    const token = req.headers['authorization']
    try  {
        req.user = verifyToken(token)
        next()
    } catch(e){
        res.status(401).json({
            message: e.message
        })
    }
})

app.use ('/graphql', graphQLHTTP((req,res)=> ({
    schema,
    graphiql:true,
    pretty:true
})))