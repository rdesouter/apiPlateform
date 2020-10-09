import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestComponent } from './components/request/request.component';
import { ResultComponent } from './components/result/result.component';
import { CollectionsComponent } from './components/sidebar/collections/collections.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { RedirectorTesterComponent } from './pages/redirector-tester/redirector-tester.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { SearchComponent, SearchService } from './components/test/search/search.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    ResultComponent,
    CollectionsComponent,
    MenuComponent,
    RedirectorTesterComponent,
    DocumentationComponent,
    SearchComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
