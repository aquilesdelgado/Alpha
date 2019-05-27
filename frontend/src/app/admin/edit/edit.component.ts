import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PelisDatosService} from '../../service/pelis-datos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: string;
  movie: any = {};

  constructor(private activateRoute: ActivatedRoute, private pelisDatos: PelisDatosService, private http: HttpClient, private router: Router) {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;

      this.pelisDatos.getMovieById(this.id).subscribe(datos => {
        this.movie = datos;
      });
    });

  }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }

  getUrl() {
    return `url('http://image.tmdb.org/t/original/${this.movie.poster_path}')`;
  }

  guardar(userForm, id) {
    const title = (userForm.value.titulo);
    const overview = (userForm.value.sinopsis);
    // let id = (userForm.value.id);
    console.log('Titulo: ' + title);
    console.log('ID: ' + id);
    const data =     {
      title,
      overview
    };


    const url = `http://localhost:3000/pelicula/${id}/`;


    fetch(url, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    // this.router.navigate(['/admin']);
    window.history.back();
  }
}
