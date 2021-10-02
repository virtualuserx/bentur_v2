import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyModel } from './calculator.model';
import { CalculatorService } from './calculator.service';





@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit,OnDestroy {

  subscription!:Subscription;

  day:number=0;

  try_amount:number=1;
  xof_amount:number=66;

  try_to_xof:number=0;

  constructor(private calculatorService:CalculatorService) { }

  ngOnInit(): void {

 this.calculatorService.get_currency_from_firebase();


 this.try_to_xof = 0;

 this.subscription=this.calculatorService.currencyChanged.subscribe( data =>
{
  this.try_to_xof = data.conversion_rates;
  this.day = data.time_last_update_utc;
  this.xof_amount = this.try_to_xof;

}
);


  }


  tryChanged(event: any){
    if(this.try_to_xof>0){
      this.xof_amount=event.target.value*this.try_to_xof;
    }
    else{
      this.xof_amount=0;
    }
    this.xof_amount= +this.xof_amount.toFixed(3);
  }

  xofChanged(event: any){
    if(this.try_to_xof>0){
    this.try_amount=event.target.value/this.try_to_xof;
    }
    else{
      this.try_amount=0;
    }
    this.try_amount= +this.try_amount.toFixed(3);

  }


ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
