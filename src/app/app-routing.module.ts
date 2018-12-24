import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';

const routes: Routes = [
	{path: '', component: UserInterfaceComponent},
	{path: 'config', component: ConfigComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
