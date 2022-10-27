import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { SocialComponent } from './components/social/social.component';
import { CurrentComponent } from './components/current/current.component';
import { ChartComponent } from './components/chart/chart.component';
import { DailyComponent } from './components/daily/daily.component';
import { MainComponent } from './components/main/main.component';
import { SkeletonCardComponent } from './skeletons/skeleton-card/skeleton-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    SocialComponent,
    CurrentComponent,
    ChartComponent,
    DailyComponent,
    MainComponent,
    SkeletonCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
let a = 0;
for (a; a < 5; a++);
console.log(a);

const LA = 1,2,3,4
const LB = 5
const LC= 4
const LD = 2,3,4,5
*/
