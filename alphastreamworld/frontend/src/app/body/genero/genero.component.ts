import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PelisDatosService} from '../../service/pelis-datos.service';


@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  constructor(private router: Router, private pelisDatos: PelisDatosService) {
  }

  ngOnInit() {
    // this.pelisDatos.getPelis().subscribe(datos => this.peliculas = datos["results"]);
    // this.pelisDatos.getPelisComedia().subscribe(datos => this.comedia = datos["results"]);
    // this.pelisDatos.getPelisAccion().subscribe(datos => this.accion = datos["results"]);
    // this.pelisDatos.getPelisHorror().subscribe(datos => this.horror = datos["results"]);
    // this.pelisDatos.getPelisRomance().subscribe(datos => this.romance = datos["results"]);
  }
  irPelis(id: string) {
    this.router.navigate(['/detalles', id]);
  }
}
