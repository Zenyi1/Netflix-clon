'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _create = require('./src/resolvers/create');

var _verify = require('./src/resolvers/verify');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graphql = require('./src/graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _users = require('./src/Schemas/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

//importe User script de otra carpeta

//importa Movie script de otra carpeta

//importe mongoose y express y body-parser despues de descargarlos con npm install ****** --save

var JsonParser = _bodyParser2.default.json();
//importa dos funciones para crear y verificar el Json Web Token

var app = (0, _express2.default)();
//inicialize el framework de express

var PORT = process.env.PORT || 3000;
//inicialize el puerto

_mongoose2.default.connect('mongodb://zenyiOP:a12345@ds111492.mlab.com:11492/movies');
var db = _mongoose2.default.connection;
db.on('error', function () {
    return console.log("Failed to connect");
}).once('open', function () {
    return console.log('Connected to MongoDB');
});
//conecte mLab como mi hosting


app.listen(PORT, function () {
    console.log('Server works on port 3000');
});
//para verificar que esta funcionando

app.use((0, _cors2.default)());

app.get('/', function (req, res) {
    res.send("Hello World");
});
//Mande Hello World a la URL del Port


app.get('/hola', function (req, res) {
    res.send("Hello hola");
});
//mande otra STRING a la URL del port junto con /hola

app.get('/addUser', function (req, res) {
    var user = new _users2.default({
        "name": "TEST",
        "lastName": "Testing",
        "email": "test@test.com",
        "password": "123456",
        "phone": "662662662"
    });

    user.save(function (err) {
        if (err) throw err;
        res.send('Usuario Creado');
    });
});
//agregue un usuario a la base de datos

app.get('/userList', function (req, res) {
    _users2.default.find({}).then(function (users) {
        res.send(users);
    });
});
//muestra el JSON de todos los usuarios creados

app.post('/register', JsonParser, function (req, res) {
    var user = new _users2.default(req.body);
    console.log(req.body);

    user.save(function (err) {
        if (err) throw err;
        res.send('Usuario Registrado');
    });
});
//Registra usuarios con POST

//saca un Json TOKEN para los usuarios creados
app.use('/login', JsonParser, function (req, res) {
    if (req.method === 'POST') {
        var token = (0, _create.createToken)(req.body.email, req.body.password).then(function (token) {
            res.status(200).json({ token: token });
        }).catch(function (err) {
            res.status(403).json({
                message: 'Login FAILED, invalid credentials'
            });
        });
    }
});

//Verifica el TOKEN
app.use('/verifyToken', JsonParser, function (req, res) {
    if (req.method === 'POST') {
        try {
            var token = req.headers['authorization'];
            (0, _verify.verifyToken)(token).then(function (user) {
                res.status(200).json({ user: user });
                console.log(user);
            }).catch(function (err) {
                console.log(err);
            });
        } catch (e) {
            console.log(e.message);
            res.status(401).json({
                message: e.message
                //Mostrar Mensaje si el TOKEN no funciona
            });
        }
    }
});

//MIDDLEWARE
app.use('/graphql', function (req, res, next) {

    var token = req.headers['authorization'];
    try {
        req.user = (0, _verify.verifyToken)(token);
        next();
    } catch (e) {
        res.status(401).json({
            message: e.message
        });
    }
});

app.use('/graphql', (0, _expressGraphql2.default)(function (req, res) {
    return {
        schema: _graphql2.default,
        graphiql: true,
        pretty: true
    };
}));