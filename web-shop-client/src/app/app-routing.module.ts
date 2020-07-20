import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthorizationGuard } from 'src/app/core/authentication/authorization.guard';
import { MainComponent } from './core/main/main.component';

const routes: Routes = [
  {path:'',redirectTo:'shopforclient',pathMatch:'full'},
  {path: 'shopforclient' , loadChildren : ()=>import('src/app/modules/client/client.module').then(m=>m.ClientModule)},
  {path: 'administrator' , loadChildren : ()=>import('src/app/modules/admin/admin.module').then(m=>m.AdminModule),canActivate:[AuthorizationGuard]},
  {path: 'main', component:MainComponent},
  {path: 'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
