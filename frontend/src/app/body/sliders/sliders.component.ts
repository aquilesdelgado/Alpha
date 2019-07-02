import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {PelisDatosService} from '@app/service/pelis-datos.service';
import sweetalert from 'sweetalert';

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
  guardarPeli(id, title) {

    sweetalert(`¿Desea agregar ${title} a su cinemateca?`, {
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
          sweetalert(`${title}, no ha sido agregada a tú cinemateca`);
          break;
        case 'aceptar' :
          sweetalert(`${title}`, 'ha sido agregada a tú cinemateca' , 'success');
          this.pelisDatos.putAlphaList(this.usuario._id, id).subscribe(() => console.log('Peli Guardada'));
          break;
      }
    });
  }
}
