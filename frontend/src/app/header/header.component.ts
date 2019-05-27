import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  guardar(param: string) {
    this.router.navigate(['/searchresult', param]);
  }

  onKeyPress(param: any) {
    // this.values += event.target.value;
    if (param.length > 0) {
      this.router.navigate(['/searchresult', param]);
    }
  }

}
