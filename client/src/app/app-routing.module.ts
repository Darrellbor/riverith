import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { FeedsComponent } from "./feeds/feeds.component";
import { RegisterComponent } from "./register/register.component";
import { SlidesComponent } from "./slides/slides.component";
import { HomeComponent } from "./home/home.component";
import { CreatepoliticianComponent } from "./createpolitician/createpolitician.component";
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { CreatePromisesComponent } from './create-promises/create-promises.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "feeds", component: FeedsComponent },
  { path: "signin", component: SignUpComponent },
  { path: "register", component: RegisterComponent },
  { path: "slides", component: SlidesComponent },
  { path: "createpolitician", component: CreatepoliticianComponent },
  { path: "createfeedback", component: CreateFeedbackComponent},
  { path: "createPromise", component: CreatePromisesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
