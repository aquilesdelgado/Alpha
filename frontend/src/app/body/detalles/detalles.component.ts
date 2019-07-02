import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PelisDatosService} from '../../service/pelis-datos.service';
import {DashjsPlayerComponent} from 'angular-dashjs-player';
import sweetalert from 'sweetalert';




@Component({
    selector: 'app-detalles',
    templateUrl: './detalles.component.html',
    styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
    usuario = JSON.parse(localStorage.getItem('currentUser'));
    @ViewChild('dashPlayer') dashPlayer: DashjsPlayerComponent;
    id: string;
    movie: any = {};
    youtubePart1 = 'https://www.youtube.com/embed/';
    youtubePart2 = '?enablejsapi=1&vq=hd1080&rel=1&showinfo=1&fs=1&modestbranding=1&controls=1&autoplay=1&mute=1';
    youtubeUrl: string;
    isLoggedIn = true;
    idpelis: any;
    verflecha = true;


    constructor(private activateRoute: ActivatedRoute, private pelisDatos: PelisDatosService) {
        this.activateRoute.params.subscribe(params => {
            this.id = params.id;

            this.pelisDatos.getMovieById(this.id).subscribe(datos => {
                this.movie = datos;
                this.youtubeUrl = `${this.youtubePart1}${this.movie.key}${this.youtubePart2}`;
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

    goTrailer() {
        this.isLoggedIn = false;
    }

    loggedOut() {
        this.isLoggedIn = true;
    }
    flechaLoad() {
    }

    flecha() {
    }

    guardarPeli(id) {
     // @ts-ignore
      sweetalert(`¿Desea agregar ${this.movie.title} a su cinemateca?`, {
       buttons: {
         cancel: 'No, gracias!',
         catch: {
           text: 'Sí, gracias!',
           value: 'aceptar'
         }
       }
     }).then((value) => {
       switch (value) {
         case 'No, gracias!' :
           sweetalert(`${this.movie.title}, no ha sido agregada a tú cinemateca`);
           break;
         case 'aceptar' :
           sweetalert(`${this.movie.title}`, 'ha sido agregada a tú cinemateca' , 'success');
           this.pelisDatos.putAlphaList(this.usuario._id, id).subscribe(() => console.log('Peli Guardada'));
           break;
       }
     });
    }
}

