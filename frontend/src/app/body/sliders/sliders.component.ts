import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PelisDatosService} from '@app/service/pelis-datos.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {
  usuario = JSON.parse(localStorage.getItem('currentUser'));
  @Input() arrayPelis: any;
  @Output() detalles: EventEmitter<any>;
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
  constructor(private pelisDatos: PelisDatosService) {this.detalles = new EventEmitter<any>(); }

  ngOnInit() {
  }

  irPelis(id: any) {
    this.detalles.emit(id);
  }
  guardarPeli(id) {
    this.pelisDatos.putAlphaList(this.usuario._id, id).subscribe(() => console.log('Peli Guardada'));
  }
}
