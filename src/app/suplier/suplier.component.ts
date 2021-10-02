import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {  faPlane, faRetweet, faHeadset, faCreditCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suplier',
  templateUrl: './suplier.component.html',
  styleUrls: ['./suplier.component.css']
})
export class SuplierComponent implements OnInit {

    icons = {
    plane:faPlane,
    retweet:faRetweet,
    headset:faHeadset,
    creditcard:faCreditCard
  };


  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.animation=true
  }

  ngOnInit(): void {
  }


images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  autoplay: true,
  center: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 600,
  navText: ['&#8249', '&#8250;'],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    760: {
      items: 4
    },
    1000: {
      items: 6
    }
  },
  nav: false
}

}
