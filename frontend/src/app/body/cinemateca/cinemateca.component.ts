import {Component, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {PelisDatosService} from '../../service/pelis-datos.service';

@Component({
  selector: 'app-cinemateca',
  templateUrl: './cinemateca.component.html',
  styleUrls: ['./cinemateca.component.scss']
})
export class CinematecaComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('currentUser'));
  peliculas = [];
  slideconfing = {
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          vertical: false
        }
      }
    ],
    dots: false,
    infinite: false
  };
  constructor(private router: Router, private pelisDatos: PelisDatosService) {

  }

  ngOnInit() {
    this.pelisDatos.getAlphaList(this.user._id).subscribe(datos => this.peliculas = datos);
    console.log(this.user._id);
  }

  irPelis(id: any) {
    this.router.navigate(['/detalles', id]);
  }

  deleteList(id: any) {
    this.pelisDatos.deleteFronList(id, this.user._id).subscribe(() => {
      console.log('success');
    });
    this.ngOnInit();
    console.log(id, this.user._id);
  }
}
