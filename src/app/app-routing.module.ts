import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { EditcanalComponent } from './component/editcanal/editcanal.component';
import { AddcanalComponent } from './component/addcanal/addcanal.component';
import { MessageListComponent } from './component/message-list/message-list.component';

const routes: Routes = [
 
  {path :'edit', component:EditcanalComponent},
  {path :'add', component:AddcanalComponent},
  {path :':id', component:MessageListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
