import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { SavedfilesComponent } from './profile/savedfiles/savedfiles.component';
import { NewinvoiceComponent } from './profile/newinvoice/newinvoice.component';
import { UserComponent } from './profile/user/user.component';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: '**', 
		component: NotFoundComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'user',
		canActivate: [AuthGuard],
		component: UserComponent,
		children: [
            { path: '', component: SavedfilesComponent, pathMatch: 'full' },
            { path: 'newinvoice', component: NewinvoiceComponent},
			{ path: 'personalinfo', component: PersonalInfoComponent}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }