import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {

  constructor() { }

  ngOnInit() {
      document.getElementById('content').scroll = function (e) {
          console.log('fff');
      };
  }
  qq() {
    console.log('ff');
  }
}
