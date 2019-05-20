import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {
  @Input() arrayPelis: any;
  @Output() detalles: EventEmitter<any>;
  slideconfing = {
    slidesToShow: 6,
    slidesToScroll: 4,
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
