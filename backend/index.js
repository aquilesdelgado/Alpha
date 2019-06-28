// import {User} from "../frontend/src/app/_models";

require('rootpath')();
const express = require('express');
// let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const fetch = require('node-fetch');

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

const app = express();

const api = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200'
}));

api.use(cors({
    origin: 'http://localhost:4200'
}));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

api.get('/',(req,res) => {
    res.send("listaPeliculas")
});

// API DE PELICULAS EN EL PUERTO 3000
// API AUTENTICACION JWT en PUERTO 4000

api.listen(3000);
app.listen(4000);

mongoose.connect('mongodb://localhost:27017/alpha', { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
    console.log("Conectados");
    // Estamos conectados
});

const Pelicula = require('./models/peliculamodel');
const User1 = require('./users/user.model');
let peliculasIDs = [];

/* URLS de conexión a MovieDB */
let urlDiscover = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=es-ES&api_key=b623b1e7ec090ee229dbf096d96c976c&page=';


api.get('/cargapeliculas',(req,res) => {
    const NUMPAG = 36;
    for (let i=1; i< NUMPAG; i++){
        let urlDiscoverpagina = urlDiscover + i.toString();
        setTimeout(() => {
        fetch(urlDiscoverpagina)
            .then(res => res.json())
            .then(json => {
                    let pelis_ajb = cargaMongo(json,res);
                    res.send(pelis_ajb)
                }
            )
            .catch(err => console.error(err));
        }, 500);
    }

});

const cargaMongo = (json,res) => {
    let ObjPelicula = {};

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
                year: movie.release_date,
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
        console.log("LONGITUD ARRAY -------- " + peliculasIDs.length);

    });

    setTimeout(() => {
        peliculasIDs.forEach((item) => {
            let id = item.id;
            const urlMovieData = `https://api.themoviedb.org/3/movie/${id}?api_key=b623b1e7ec090ee229dbf096d96c976c&language=es-ES`;
            const urlMovieCreditos = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b623b1e7ec090ee229dbf096d96c976c`;
            const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b623b1e7ec090ee229dbf096d96c976c&language=en-US`;

            // fetch(urlMovieData)
            //         .then(res => res.json())
            //         .then(json => {
            //                 let generos = json.genres;
            //                 //res.send(generos);
            //                 actualizaGeneros(json.id,generos,res);
            //         });

            // fetch(urlMovieCreditos)
            //     .then(res => res.json())
            //     .then(json => {
            //         let cast = json.cast;
            //         let crew = json.crew;
            //         cast.splice(4, cast.length - 4);
            //
            //         actualizaCreditos(json.id,cast,res);
            //         actualizaDirector(json.id,crew,res);
            //     });

            // fetch(urlVideos)
            //        .then(res => res.json())
            //        .then(json => {
            //            let videos = json.results[0].key;
            //            console.log("VIDEO -----   :" + videos);
            //            //res.send(generos);
            //            actualizaMovies(json.id,videos,res);
            //        });

            async function fetchVideos(urlVideos)
            {
                const res = await fetch(urlVideos);
                const data = await res.json();
                console.log(data);
                let videos = data.results[0].key;
                actualizaMovies(data.id,videos,res);
                console.log(data.name);
            }

            fetchVideos(urlVideos);




},

    );
    }, 50);

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

const actualizaMovies = (id,videos,res) => {
    let query = {id: id};
    Pelicula.findOneAndUpdate(query, {$set:{key: videos}}, function (err,doc) {
        if (err){
            return res.status(500).send({"error": "fallo al actualizar videos"})
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

api.get('/peliculas',(req,res) => {
    Pelicula.find(function (err,pelis) {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        //console.log (pelis);
        return res.json(pelis)
    }).limit(30)
});
api.get('/peliculas1',(req,res) => {
    Pelicula.find(function (err,pelis) {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        //console.log (pelis);
        return res.json(pelis)
    })
});
api.get('/buscador/:valor',(req,res) => {
    const valor = req.params.valor;
    console.log(valor);
    Pelicula.find( { title : { $regex: `${valor}` , $options: 'i'} } ,function (err,pelis) {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        //console.log (pelis);
        return res.json(pelis)
    })
});

api.post('/pelicula',(req,res) => {
    let pelicula = req.body;
    const newPelicula = new Pelicula(pelicula);
    newPelicula.save((err, storedpelicula) => {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        return res.json(storedpelicula)
    });
});

api.get('/pelicula/:id',(req,res) => {
    //console.log(req.params.id);
    let id = req.params.id;
    let query = {id: id};
    Pelicula.findOne(query, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo al consultar pelicula"})
        }
        //console.log (peli);
        return res.json(peli)
    })
});

api.get('/genero/:id',(req,res) => {
    //console.log(req.params.id);
    let id = parseInt(req.params.id);
    let query = {genre_ids: {'$in': [id]}};
    //console.log(query);
    Pelicula.find(query, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo al consultar pelicula"})
        }
        console.log (peli);
        return res.json(peli)
    }).limit(30)
});

api.delete('/pelicula/:id',(req,res) => {
    let id = req.params.id;
    let query = {id: id};
    Pelicula.findOneAndRemove(query, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo al eliminar la película"})
        }
        //console.log (peli);
        return res.json(peli)
    })
});

app.put('/pelicula/:id',(req,res) => {
    let id = parseInt(req.params.id);
    let mod = req.body;
    let query = {id: id};
    Pelicula.findOneAndUpdate(query, mod, function (err,peli) {
        if (err){
            return res.status(500).send({"error": "fallo"})
        }
        //console.log (peli);
        return res.json(peli)
    })
});
api.get('/listafavoritas/:id',async (req,res) => {
    let id = req.params.id;
    const user = await User1.findById(`${id}`,'list');
    let pelis = [];
    for (let i = 0; i<user.list.length; i++) {

        let pel = await Pelicula.findById(`${user.list[i]}`);
        pelis.push(pel);
        console.log(pel);
    }
    return res.json(pelis);

});
api.put('/listafavoritas/:id', async (req,res) =>{
    let id = req.params.id;
    let peliId = req.body;
    const user = await User1.findByIdAndUpdate(`${id}`,{$addtoset:{list:[`${peliId}`]}});
    console.log(user);
    return res.json(user);
});
api.delete('/listafavoritas/:id/:idpelis', async (req,res) =>{
    let id= req.params.id;
    let idPelis = req.params.idpelis;
    const deletePeli = await  User1.updateOne({ _id: `${id}`}, {$pull: {list: {$in: [`${idPelis}`]}}});
    console.log(deletePeli);
    return res.json(deletePeli);
});
