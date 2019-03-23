import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeedsComponent } from './feeds/feeds.component';
import { RegisterComponent } from './register/register.component';
import { SlidesComponent } from './slides/slides.component';
import { HomeComponent } from './home/home.component';
import { CreatepoliticianComponent } from './createpolitician/createpolitician.component';

const routes: Routes = [
  {path:"home", component: HomeComponent, pathMatch:"full"},
  {path:"feeds", component: FeedsComponent},
  {path: "signup", component: SignUpComponent},
  {path: "register", component: RegisterComponent},
  {path: "slides", component: SlidesComponent},
  {path: "createpolitician", component: CreatepoliticianComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
