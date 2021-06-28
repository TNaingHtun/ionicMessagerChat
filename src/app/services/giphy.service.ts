import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(
    private http:HttpClient
  ) { }

  getTrendingGifs() {
    return this.http.get('https://api.giphy.com/v1/gifs/trending?api_key=OrSmapC0EprJJQLQnyPpqSaEI4a8Nj7y&limit=50');
  }
}
