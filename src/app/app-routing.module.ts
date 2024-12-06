import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { EditcanalComponent } from './component/editcanal/editcanal.component';
import { AddcanalComponent } from './component/addcanal/addcanal.component';
import { MessageListComponent } from './component/message-list/message-list.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { LoginComponent } from './component/login/login.component';
import { EdituserComponent } from './component/edituser/edituser.component';
import { CanalListComponent } from './component/canal-list/canal-list.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { OpenspaceComponent } from './component/openspace/openspace.component';
import { OpenspaceParametersToolsComponent } from './component/openspace-parameters-tools/openspace-parameters-tools.component';
import { OpenspaceLoadSettingsComponent } from './component/openspace-load-settings/openspace-load-settings.component';


const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'register', component: AdduserComponent },
  { path: 'userProfil', component: EdituserComponent },
  { path: 'edit', component: EditcanalComponent },
  { path: 'add', component: AddcanalComponent },
  { path: '', component: HomeComponent },
  { path: 'canallist', component: CanalListComponent },
  { path: 'userProfil/:id', component: EdituserComponent },
  { path: 'contacts', component: ContactListComponent },
  {path:'openspace', component: OpenspaceComponent},
  {path:'newOpenspace', component: OpenspaceParametersToolsComponent},
  {path:'loadOpenspace', component: OpenspaceLoadSettingsComponent},
  // don't move aniwhere
  { path: ':id', component: MessageListComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
