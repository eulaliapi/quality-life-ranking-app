import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ErrorComponent } from './components/error/error.component';
import { CityRankingComponent } from './components/city-ranking/city-ranking.component';
import { ContentPageComponent } from './components/content-page/content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingPageComponent,
    SearchBarComponent,
    ErrorComponent,
    CityRankingComponent,
    ContentPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
