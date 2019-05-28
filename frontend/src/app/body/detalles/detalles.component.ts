import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PelisDatosService} from '../../service/pelis-datos.service';
import {DashjsPlayerComponent} from 'angular-dashjs-player';
import {generateExpandoInstructionBlock} from '@angular/core/src/render3/instructions';
import {falseIfMissing} from 'protractor/built/util';


@Component({
    selector: 'app-detalles',
    templateUrl: './detalles.component.html',
    styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
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
                // this.pelisDatos.getMovieKey(this.movie.id).subscribe(datos => {
                //     // @ts-ignore
                //     this.idpelis = datos.results[0].key;
                //     this.youtubeUrl = `${this.youtubePart1}${this.idpelis}${this.youtubePart2}`;
                // });
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
        // setTimeout(() => {
        //     this.verflecha = false;
        // }, 3000);
    }

    flecha() {
        // if (this.verflecha === false) {
        //     this.verflecha = true;
        //     setTimeout(() => {
        //         this.verflecha = false;
        //     }, 3000);
        // }
    }
}

