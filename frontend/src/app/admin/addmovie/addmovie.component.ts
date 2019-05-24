import { Component, OnInit } from '@angular/core';
import {PelisDatosService} from '../../service/pelis-datos.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.scss']
})
export class AddmovieComponent implements OnInit {

  constructor(private pelisDatos: PelisDatosService, private router: Router) { }

  ngOnInit() {
  }

  guardar(userForm){
    let title = (userForm.value.titulo);
    let overview = (userForm.value.sinopsis);

    let id = "777" + (Math.floor(Math.random() * 1000));

    let data =     {
      "title": title,
      "overview": overview,
      "id": parseInt(id) //+ Math.floor(Math.random() * 1000)
    };

    let url = `http://localhost:3000/pelicula/`;

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    this.router.navigate(['/admin']);
  }


}
