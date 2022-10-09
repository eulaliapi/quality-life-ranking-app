import { NgModule } from '@angular/core';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CityRankingComponent } from './components/city-ranking/city-ranking.component';
import { ErrorComponent } from './components/error/error.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'city-ranking/:id', component: CityRankingComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
