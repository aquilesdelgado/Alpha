import { Component, OnInit } from '@angular/core';
import {PelisDatosService} from '../../service/pelis-datos.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  params: string;
  resultPelis = {};
  slideconfing = {
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: false,
    infinite: false
  };
  constructor(private peliServe: PelisDatosService, private activatedrouter: ActivatedRoute, private router: Router) {
    this.activatedrouter.params.subscribe(params => {
      this.params = params["param"];

      this.peliServe.getPelisBuscador(this.params).subscribe(datos => {
        this.resultPelis = datos;

      });
    });
  }
  ngOnInit() {
  }
  detalles(id: string) {
    this.router.navigate(['/detalles', id]);
  }
  mostrar() {
    const titulo = document.querySelector('.pelis_lista');

  }
  irPelis(id: string) {
    this.router.navigate(['/detalles', id]);
  }
}
