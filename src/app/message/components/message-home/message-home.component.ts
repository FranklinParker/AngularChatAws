import {Component, OnInit} from '@angular/core';

/**
 *
 * https://icomoon.io/app/#/select
 */
@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.scss']
})
export class MessageHomeComponent implements OnInit {
  leftNavOpen = true;

  constructor() {
  }

  ngOnInit() {
  }

  onLeftNavClose() {
    this.leftNavOpen = false;
  }

  onLeftNavOpen() {
    this.leftNavOpen = true;
  }

}
