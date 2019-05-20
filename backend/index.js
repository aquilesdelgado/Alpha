const express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send("listaPeliculas")
});
app.listen(3000);

mongoose.connect('mongodb://localhost:27017/alpha');

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
    const NUMPAG = 6;
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
    })
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


//https://api.themoviedb.org/3/movie/287947/videos?api_key=b623b1e7ec090ee229dbf096d96c976c&language=en-US
//https://api.themoviedb.org/3/movie/287947/keywords?api_key=b623b1e7ec090ee229dbf096d96c976c&language=es-ES
