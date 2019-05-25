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


const routes: Routes = [
  {path: 'home' , component: BodyComponent},
  {path: 'detalles/:id' , component: DetallesComponent},
  {path: 'searchresult/:param' , component: ResultComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/edit/:id' , component: EditComponent},
  {path: 'admin/add', component: AddmovieComponent},
  {path: 'login' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
