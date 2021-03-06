import {Component, OnInit, } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PelisDatosService} from '../../service/pelis-datos.service';
import { trigger, style, animate, transition } from '@angular/animations';


// import { EmbedVideoService } from 'ngx-embed-video';

@Component({
    selector: 'app-preview-pelis',
    templateUrl: './preview-pelis.component.html',
    styleUrls: ['./preview-pelis.component.scss'],
//     animations: [
//         trigger(
//             'animacion', [
//                 transition('isLoggedOut', [
//                     style({opacity: 0}),
//                     animate('3000ms', style({opacity: 1}))
//                 ]),
//                 transition('isLoggedIn', [
//                     style({opacity: 1}),
//                     animate('3000ms', style({opacity: 0}))
//                 ])
//             ]
//         )
//     ],
})
export class PreviewPelisComponent implements OnInit {
    id = '458156';
    movie: any = {};
    isLoggedIn = true;
    youtubePart1 = 'https://www.youtube.com/embed/';
    youtubePart2 = '?enablejsapi=1&rel=1&showinfo=1&modestbranding=1&controls=1&autoplay=1&mute=1';
    youtubeUrl: string;

    constructor(private activateRoute: ActivatedRoute, private pelisDatos: PelisDatosService ) {
    }
    ngOnInit() {
        this.pelisDatos.getPelis().subscribe(datos => {
            // @ts-ignore
            this.movie = datos[0];
            console.log(this.movie);
            this.youtubeUrl = `${this.youtubePart1}${this.movie.key}${this.youtubePart2}`;
        });
        this.changeLog();
    }

    goBack() {
        window.history.back();
    }

    getUrl() {
        return `url('http://image.tmdb.org/t/original/${this.movie.poster_path}')`;
    }
    changeLog() {
        setTimeout(() => this.isLoggedIn = false
            , 5000);
    }

    loggedOut() {
        this.isLoggedIn = true;
    }
    checklogged() {
        setTimeout(() => this.isLoggedIn = true
            , 86000);
    }
}
