import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanalListComponent } from './component/canal-list/canal-list.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { MessageListComponent } from './component/message-list/message-list.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { EdituserComponent } from './component/edituser/edituser.component';
import { EditcanalComponent } from './component/editcanal/editcanal.component';
import { AddcanalComponent } from './component/addcanal/addcanal.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AddmessageComponent } from './component/addmessage/addmessage.component';

@NgModule({
  declarations: [
    AppComponent,
    CanalListComponent,
    UserListComponent,
    MessageListComponent,
    AdduserComponent,
    EdituserComponent,
    EditcanalComponent,
    AddcanalComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddmessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
