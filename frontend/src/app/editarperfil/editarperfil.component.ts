import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss']
})
export class EditarperfilComponent implements OnInit {
  registerForm: FormGroup;

  user: any = {};
  id: any;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // console.log(token);

  constructor(private formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private authenticationService: AuthenticationService,
              private userService: UserService, private http: HttpClient, private router: Router) {


    this.activateRoute.params.subscribe(params => {
      this.id = params.id;

      this.userService.getById(this.id).subscribe(datos => {
        this.user = datos;
        console.log("this.user             : " + this.user.token);
      });
    });
  }

  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.currentUserSubscription.unsubscribe();
  // }

  guardarUsuario(userForm) {
    let usuario = {
      'id': this.currentUser._id,
      'firstName': (userForm.value.firstname),
      'lastName': (userForm.value.lastname),
      'username': (userForm.value.username),
      'password': (userForm.value.password),
      'token': this.currentUser.token
    };
    console.log(usuario);
    this.userService.update(usuario).pipe(first()).subscribe(() => {
      //window.history.back();
      this.router.navigate(['/home']);
    });
    //this.userService.update(usuario);


  }
}
