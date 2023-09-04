import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { EditcanalComponent } from './component/editcanal/editcanal.component';
import { AddcanalComponent } from './component/addcanal/addcanal.component';
import { MessageListComponent } from './component/message-list/message-list.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { LoginComponent } from './component/login/login.component';
import { EdituserComponent } from './component/edituser/edituser.component';


const routes: Routes = [
 
  {path :'login', component:LoginComponent},
  {path :'register', component:AdduserComponent},
  {path :'userProfil', component:EdituserComponent},
  {path :'edit', component:EditcanalComponent},
  {path :'add', component:AddcanalComponent},
  {path :':id', component:MessageListComponent},
  { path: 'userProfil/:id', component: EdituserComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
