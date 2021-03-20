import { Component, OnInit } from '@angular/core';
import { AppService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _thisService: AppService) { }

  storyList = []
  index = 0
  stories = []
  textLimit = 110
  title = 'hacknews';

  ngOnInit() {
    this._thisService.getListOfTopStories().subscribe((response: any[]) => {
      this.storyList = response
      this.getItem(response[this.index])
    }, error => {
      console.log(error)
    })

  }

  getItem(id) {
    this._thisService.getNews(id).subscribe((resp: any) => {
      if (resp.time) {
        resp.time = this.timeConversion(resp.time)
      }
      if (resp.text) {
        resp.text = this.textEmphasis(resp.text)
      }
      this.stories.push(resp)
      ++this.index
      if (this.index < this.storyList.length) this.getItem(this.storyList[this.index])
    }, error => {
      console.log(error)
    })
  }

  timeConversion(time) {
    let date = new Date(time)
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`
  }

  textEmphasis(text) {
    let temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = text;
    text = temporalDivElement.textContent || temporalDivElement.innerText || "";
    if (text.length > this.textLimit) return `${text.slice(0, this.textLimit)}  ...`
  }
}
