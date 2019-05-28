import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component'
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'contactprofile',
    component:ContactsComponent
   },
   {
     path:'homeprofile',
     component:HomeComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
