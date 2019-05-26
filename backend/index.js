const express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const fetch = require('node-fetch');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const path = require('path');

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
  }));

//app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.json());
app.use(cors()); //acceso cors
app.use(require('morgan')('dev')); //morgan es un logger
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'alfa-streaming', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
    app.use(errorHandler());
}

app.get('/',(req,res) => {
    res.send("listaPeliculas")
});
app.listen(3000);

mongoose.connect('mongodb://127.0.0.1:27017/alpha');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
    console.log("Conectados");
    // Estamos conectados
});

const Pelicula = require('./models/peliculamodel');

/* URLS de conexión a MovieDB */
let urlDiscover = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=es-ES&api_key=b623b1e7ec090ee229dbf096d96c976c&page=';


app.get('/cargapeliculas',(req,res) => {
    const NUMPAG = 41;
    for (let i=1; i< NUMPAG; i++){
        let urlDiscoverpagina = urlDiscover + i.toString();
        fetch(urlDiscoverpagina)
            .then(res => res.json())
            .then(json => {
                    let pelis_ajb = cargaMongo(json,res);
                    res.send(pelis_ajb)
                }
            )
            .catch(err => console.error(err));
    }

});

const cargaMongo = (json,res) => {
    let ObjPelicula = {};
    let peliculasIDs = [];
    let pelis = json.results;

    pelis.forEach((movie) => {
        const nuevaPelicula = new Pelicula(
            {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                genre_ids: movie.genre_ids,
                runtime: movie.runtime,
                year: movie.year,
                vote_average: movie.vote_average,
                overview: movie.overview
            }
        );
        nuevaPelicula.save((err, storedPeliculas) => {
            if (err){
                return res.status(500).send({"error": "fallo al insertar en Mongo"})
            }
            //return res.json(storedPeliculas)
        });

        peliculasIDs.push({'id': movie.id});

    });

    peliculasIDs.forEach((item) => {
        let id = item.id;
        const urlMovieData = `https://api.themoviedb.org/3/movie/${id}?api_key=b623b1e7ec090ee229dbf096d96c976c&language=es-ES`;
        const urlMovieCreditos = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b623b1e7ec090ee229dbf096d96c976c`;

        fetch(urlMovieData)
                .then(res => res.json())
                .then(json => {
                        let generos = json.genres;
                        //res.send(generos);
                        actualizaGeneros(json.id,generos,res);
                });

        fetch(urlMovieCreditos)
            .then(res => res.json())
            .then(json => {
                let cast = json.cast;
                let crew = json.crew;
                cast.splice(4, cast.length - 4);

                actualizaCreditos(json.id,cast,res);
                actualizaDirector(json.id,crew,res);
            });
}

    );

    //console.log(peliculasIDs);
    return peliculasIDs;
}

const actualizaGeneros = (id,generos,res) => {
    let query = {id: id};
    Pelicula.findOneAndUpdate(query, {$set:{genres: generos}}, function (err,doc) {
        if (err){
            return res.status(500).send({"error": "fallo al actualizar generos"})
        }
        //return res.json(generos)
    });
}

const actualizaCreditos = (id,creditos,res) => {
    // FALLO AL OBTENER ID
    let query = {id: id};
    Pelicula.findOneAndUpdate(query, {$set:{cast: creditos}}, function (err,doc) {
        if (err){
            return res.status(500).send({"error": "fallo al actualizar generos"})
        }
    });
}

const actualizaDirector = (id,crew,res) => {
    let query = {id: id};
    crew.forEach( (item) => {
        if (item.job == 'Director'){

            Pelicula.findOneAndUpdate(query, {$set:{director: item.name}}, function (err,doc) {
                // Si se pone item en el $set carga el array del objeto crew perteneciente al director.
                if (err){
                    return res.status(500).send({"error": "fallo al actualizar generos"})
                }
                //console.log (doc);
                //return res.json(generos)
            });
        }
    });

}


/* Definimos los endpoints de consulta de peliculas*/

app.get('/peliculas',(req,res) => {
    Pelicula.find(function (err,pelis) {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        console.log (pelis);
        return res.json(pelis)
    }).limit(30)
});

app.post('/pelicula',(req,res) => {
    let pelicula = req.body;
    const newPelicula = new Pelicula(pelicula);
    newPelicula.save((err, storedpelicula) => {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        return res.json(storedpelicula)
    });
});

app.get('/pelicula/:id',(req,res) => {
    //console.log(req.params.id);
    let id = req.params.id;
    let query = {id: id};
    Pelicula.findOne(query, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo al consultar pelicula"})
        }
        console.log (peli);
        return res.json(peli)
    })
});

app.get('/genero/:id',(req,res) => {
    //console.log(req.params.id);
    let id = parseInt(req.params.id);
    let query = {genre_ids: {'$in': [id]}};
    console.log(query);
    Pelicula.find(query, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo al consultar pelicula"})
        }
        console.log (peli);
        return res.json(peli)
    }).limit(30)
});

app.delete('/pelicula/:id',(req,res) => {
    let id = req.params.id;
    let query = {id: id};
    Pelicula.findOneAndRemove(query, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo al eliminar la película"})
        }
        console.log (peli);
        return res.json(peli)
    })
});

app.put('/pelicula/:id',(req,res) => {
    let id = req.params.id;
    let mod = req.body;
    let query = {id: id};
    Pelicula.findOneAndUpdate(query, mod, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        console.log (peli);
        return res.json(peli)
    })
});

// PASSPORT AUTH
/* Models y rutas */
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

//Error handlers & middlewares
//Controlamos si la respuesta devuelve un error
if(!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});
