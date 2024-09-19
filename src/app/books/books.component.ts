import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Init } from 'v8';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  constructor(private fetchService: FetchService){}
  http=inject(HttpClient);
  posts:any =[];

  ngOnInit()
  {
    // this.fetchPosts(this.posts);
    this.fetchBooks();
  }

  fetchBooks() {
    this.fetchService.fetchBooks().subscribe(
      (posts: any[]) => {
        // console.log('Fetched posts:', posts);
        this.posts = posts;
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

}
