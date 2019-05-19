import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetallesComponent} from './body/detalles/detalles.component';
import { CommonModule} from '@angular/common';
import {BodyComponent} from './body/body.component';
import {ResultComponent} from './body/result/result.component';


const routes: Routes = [
  {path: 'home' , component: BodyComponent},
  {path: 'detalles/:id' , component: DetallesComponent},
  {path: 'searchresult/:param' , component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
