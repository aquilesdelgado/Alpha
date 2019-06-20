import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sliders2',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class Sliders2Component implements OnInit {
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
  constructor() {this.detalles = new EventEmitter<any>(); }

  ngOnInit() {
  }

  irPelis(id: any) {
    this.detalles.emit(id);
  }

  mostrar() {
    const titulo = document.querySelector('.pelis_lista');

  }
}
