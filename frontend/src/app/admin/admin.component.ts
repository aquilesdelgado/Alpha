import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PelisDatosService} from '../service/pelis-datos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private pelisDatos: PelisDatosService) { }

  peliculas = [];


  ngOnInit() {
    this.pelisDatos.getPelisAdmin().subscribe(datos => this.peliculas = datos);
  }

  editar(id: string) {
    this.router.navigate(['/edit', id]);
  }

  delete(id: string) {

    // this.router.navigate(['/delete', id]);
    const url = `http://localhost:3000/pelicula/${id}`;
    console.log(url);
    fetch(url, {
      method: 'DELETE', // or 'PUT'
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(() =>  this.ngOnInit());
  }

  onKeyPress(value: any) {
    if (value.length > 0) {
      this.pelisDatos.getPelisBuscador(value).subscribe(datos => {
        this.peliculas = datos;
      });
      console.log(this.peliculas);
    }
    this.ngOnInit();
  }
}
