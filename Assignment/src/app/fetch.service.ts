import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) {}

  getBookDetails(bookId: string): Observable<any> {
    return this.http.get(`https://softwium.com/api/books/${bookId}`);
  }

  fetchBooks(): Observable<any[]> {
    return this.http.get<any[]>('https://softwium.com/api/books');
  }
  
}
