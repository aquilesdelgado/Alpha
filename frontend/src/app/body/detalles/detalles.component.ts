import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PelisDatosService} from '../../service/pelis-datos.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  id: string;
  movie: any = {};
  constructor(private activateRoute: ActivatedRoute, private pelisDatos: PelisDatosService) {
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
}
