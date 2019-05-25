import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {PelisDatosService} from '../service/pelis-datos.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(private router: Router, private pelisDatos: PelisDatosService) {
  }
  peliculas = [];
  comedia = [];
  accion = [];
  horror = [];
  romance = [];

  ngOnInit() {
    this.pelisDatos.getPelis().subscribe(datos => this.peliculas = datos);
    this.pelisDatos.getPelisComedia().subscribe(datos => this.comedia = datos);
    this.pelisDatos.getPelisAccion().subscribe(datos => this.accion = datos);
    this.pelisDatos.getPelisHorror().subscribe(datos => this.horror = datos);
    this.pelisDatos.getPelisRomance().subscribe(datos => this.romance = datos);

  }


  irPelis(id: string) {
    this.router.navigate(['/detalles', id]);
  }

}
