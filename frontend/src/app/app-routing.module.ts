import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetallesComponent} from './body/detalles/detalles.component';
import { CommonModule} from '@angular/common';
import {BodyComponent} from './body/body.component';
import {ResultComponent} from './body/result/result.component';
import {AdminComponent} from './admin/admin.component';
import {EditComponent} from './admin/edit/edit.component';
import {AddmovieComponent} from './admin/addmovie/addmovie.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards';
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from '@app/admin/users/users.component';
import {EditarperfilComponent} from '@app/editarperfil/editarperfil.component';
import {CinematecaComponent} from '@app/body/cinemateca/cinemateca.component';


const routes: Routes = [
  {path: 'home' , component: BodyComponent, canActivate: [AuthGuard]},
  {path: 'detalles/:id' , component: DetallesComponent},
  {path: 'searchresult/:param' , component: ResultComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit/:id' , component: EditComponent, canActivate: [AuthGuard]},
  {path: 'admin/add', component: AddmovieComponent, canActivate: [AuthGuard]},
  {path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'editarperfil/:id' , component: EditarperfilComponent},
  {path: 'alphalist' , component: CinematecaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
