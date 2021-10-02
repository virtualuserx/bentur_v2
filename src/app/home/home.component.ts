import { Component, OnInit } from '@angular/core';

import {  faPassport,faStopwatch20, faPercent } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  icons = {
    secure:faPassport,
    fast:faStopwatch20,
    comission:faPercent
  }

  constructor() { }

  ngOnInit(): void {
  }

}
