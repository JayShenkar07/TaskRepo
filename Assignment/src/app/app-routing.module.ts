import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'books', component: BooksComponent },

  { path: 'books/details', component: DetailsComponent },

  { path: '**', component: InvalidPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
