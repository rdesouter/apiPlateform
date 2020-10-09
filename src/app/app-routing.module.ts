import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/test/search/search.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RedirectorTesterComponent } from './pages/redirector-tester/redirector-tester.component';

const routes: Routes = [
    {path: '', redirectTo: '/redirector', pathMatch: 'full'},
    {path: 'redirector', component: RedirectorTesterComponent},
    {path: 'documentation', component: DocumentationComponent},
    {path: 'search', component: SearchComponent},
    {path: '**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
