import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { SuplierComponent } from './suplier/suplier.component';


const routes: Routes = [
  
  {path:"",component:HomeComponent},
  {path:"supplyer-from-turkey", component:SuplierComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
