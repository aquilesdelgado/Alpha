import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BodyComponent } from './body/body.component';
import { PreviewPelisComponent } from './body/preview-pelis/preview-pelis.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import { SlidersComponent } from './body/sliders/sliders.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {SlickModule} from 'ngx-slick';
import { AddImagePipe } from './add-image.pipe';
import { DetallesComponent } from './body/detalles/detalles.component';
import { ImgenDetallesPipe } from './imgen-detalles.pipe';
import { SafePipe } from './imgen-fondo.pipe';
import { ResultComponent } from './body/result/result.component';
import { ImageresultPipe } from './imageresult.pipe';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './admin/edit/edit.component';
import { AddmovieComponent } from './admin/addmovie/addmovie.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule }    from '@angular/forms';
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    BodyComponent,
    PreviewPelisComponent,

    SlidersComponent,

    AddImagePipe,
    DetallesComponent,
    ImgenDetallesPipe,
    SafePipe,
    ResultComponent,
    ImageresultPipe,
    AdminComponent,
    EditComponent,
    AddmovieComponent,
    AlertComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    ReactiveFormsModule,
    // SlickCarouselModule,
    SlickModule.forRoot(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
