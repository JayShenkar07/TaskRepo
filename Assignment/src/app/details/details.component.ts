import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  constructor(private route: ActivatedRoute,private http: HttpClient, private fetch: FetchService){}

  Bookid:any=""  //globally to store the qurey param
  bookDetails: any;
  loading: boolean = true;

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      this.Bookid=val['id'];
      console.log('Received query parameter:',this.Bookid);

    this.fetch.getBookDetails(this.Bookid).subscribe(
      (details: any) => {
        // console.log('Book details:', details);
        this.bookDetails = details;
        this.loading=false;
      },

      error => {
        console.error('Ops! Error fetching book details:', error);
      }
    );
  });
}

}
