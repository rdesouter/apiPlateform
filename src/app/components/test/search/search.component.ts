import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { load } from '@angular/core/src/render3';
import { Form, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
//with observable no need for promise
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) { }
}

@Injectable()
export class SearchService {
  apiRoot: string = "https://itunes.apple.com/search";
  results: SearchItem[];
  loading: boolean;

  constructor(private http: HttpClient) {
    this.results = [];
    this.loading = false;
  }

  checkTrack() {
    console.log(this.results);
  }
  // With Promise
  // search(term: string) {
  //   let promise = new Promise((resolve, reject) => {
  //     let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=25`;
  //     this.http.get(apiURL)
  //       .toPromise()
  //       .then( (res : any) => {
  //         console.log(res);
  //         this.results = res.results.map( item => {
  //           return new SearchItem(
  //             item.trackName,
  //             item.artistName,
  //             item.trackViewUrl,
  //             item.artworkUrl60,
  //             item.artistId
  //           );
  //         });
  //         console.log(this.results);

  //         resolve();
  //       },
  //       msg => {
  //         reject();
  //       });
  //   });
  //   return promise;
  // }

  search(term: string): Observable<SearchItem[]> {
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=25`;
    return this.http.get(apiURL).pipe(map((res: any) => {
      // get the result pipe into an array need to convert into SearchItem[]
      console.log(res);
      let results = res.results.map(item => {
        return new SearchItem(
          item.trackName,
          item.artistName,
          item.trackViewUrl,
          item.artworkUrl60,
          item.artistId
        );
      });
      console.log("After converting to SearchItem[]: ", results);
      return results;
    }));
  }
}

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private loading: boolean = false;
  private results: SearchItem[];
  private searchField =  new FormControl('');


  constructor(
    private itunes: SearchService
  ) { }

  ngOninit() {
    this.searchField.valueChanges
      .pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        console.log(res);
      });
  }

  //With Promise
  // doSearch(term: string) {
  //   this.loading = true;
  //   this.itunes.search(term).then( () => this.loading = false);
  // }

  // With Observable
  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).subscribe(data => {
      this.loading = false;
      this.results = data;
    });
  }

  doCheckTrack() {
    this.itunes.checkTrack();
  }

  ngOnInit() {
  }

}



