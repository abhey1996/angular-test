import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json'
  itemUrl = 'https://hacker-news.firebaseio.com/v0/item/'

  getListOfTopStories() {
    return this.http.get(this.topStoriesUrl)
  }

  getNews(id) {
    let url = `${this.itemUrl}${id}.json`
    return this.http.get(url)
  }
}
