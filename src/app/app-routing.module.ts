import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login } from './login/login.component';
import { Dashboard } from './Dashboard/dashboard.component';
import { Sidebar } from './common/sidebar.component';
import { Ttsheader } from './common/headers.component';
import { Tts_footer } from './common/tts_footer.component';
import { User } from './User/user.component';
import { Userlist } from './User/userlist.component';
import { Fileuploads } from './dummy/fileupload.component';
import { Edituser} from './user/edituser.component';
import { SupportComponent } from './social/support/support.component';
import { Socialuser } from './social/support/socialuser.component'
import { Logingaurd } from './services/login-gaurd.service'


const routes: Routes = [
   {path:'login',component:Login},
   {path:'dashboard',component:Dashboard,canActivate:[Logingaurd]},
   {path:'user',component:User,canActivate:[Logingaurd]},
   {path:'userlist/:pageno',component:Userlist,canActivate:[Logingaurd]},
   {path:'userlist',component:Userlist,canActivate:[Logingaurd]},
   {path:'edituser/:userid',component:Edituser,canActivate:[Logingaurd]},
   {path:'upload',component:Fileuploads,canActivate:[Logingaurd]},
   {path:'support',component:SupportComponent,canActivate:[Logingaurd]},
   {path:'**',component:Login},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  Login,Dashboard,Sidebar,Ttsheader,Tts_footer,User,Userlist,Fileuploads,Edituser,SupportComponent,
  Socialuser
];