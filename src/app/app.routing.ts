import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { SavedfilesComponent } from './profile/savedfiles/savedfiles.component';
import { NewinvoiceComponent } from './profile/newinvoice/newinvoice.component';
import { UserComponent } from './profile/user/user.component';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { CompleteInfoComponent } from './profile/complete-info/complete-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './auth.guard';
const routes: Routes = [
	{
		path: '',
		component: HomeComponent
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
		component: UserComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: SavedfilesComponent },
			{ path: 'newinvoice', component: NewinvoiceComponent },
			{ path: 'personalinfo', component: PersonalInfoComponent }
		]
	},
	{
		path: 'completeInfo',
		component: CompleteInfoComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingProviders: any[] = [];