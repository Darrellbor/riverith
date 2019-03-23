import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedsComponent } from './feeds/feeds.component';
import { SlidesComponent } from './slides/slides.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RegisterComponent } from './register/register.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CreatepoliticianComponent } from './createpolitician/createpolitician.component';
import {MatFormFieldModule} from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FeedsComponent,
    SlidesComponent,
    SignUpComponent,
    RegisterComponent,
    CreatepoliticianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
