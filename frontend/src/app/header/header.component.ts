import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usuario = JSON.parse(localStorage.getItem('currentUser'));

  @HostListener('window:scroll', ['$event'])
  modificarHeader( $event: Event ) {
      document.querySelector('nav').style.backgroundColor = 'rgba(48,48,48,1)';
      setTimeout(() => {
        document.querySelector('nav').style.backgroundColor = 'rgba(48,48,48,0)';
      }, 3000);
  }

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  onKeyPress(param: any) {
    // this.values += event.target.value;
    if (param.length > 0) {
      this.router.navigate(['/searchresult', param]);
    }
  }
}
