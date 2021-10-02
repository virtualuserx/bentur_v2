import { Component, OnInit } from '@angular/core';

import { faTwitter,faLinkedinIn , faWhatsapp, faInstagram   } from '@fortawesome/free-brands-svg-icons';
import {  faPhoneAlt, faComments } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  icons = {
    whatsapp:faWhatsapp,
    twitter:faTwitter,
    linkedin:faLinkedinIn,
    instagram:faInstagram,
    phone:faPhoneAlt,
    comment:faComments
  };

  constructor() { }

  ngOnInit(): void {
  }

}
