import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CurrencyModel } from './calculator.model';

import {environment} from '../../environments/environment.prod'

import { of, Observable, Subject } from 'rxjs';


import { catchError, map } from 'rxjs/operators';


interface responsedata{
  conversion_rates:{ "XOF": 0 },
  result:string,
  time_last_update_utc:Date
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public currencyChanged = new Subject<CurrencyModel>();

  response_upladed_succesfully:boolean=false;

  private current_currency:CurrencyModel= {
    conversion_rates:0,
    result:"fail",
    time_last_update_utc: 0
  }

  private response_result:CurrencyModel = {
    conversion_rates:0,
    result:"fail",
    time_last_update_utc: 0
  }

  constructor(private http:HttpClient) { }

  currency_url=environment.currency_converter_url2;
  currency_api=environment.currency_converter_api2;
  currency_tag= environment.currency_converter_tag2;
  all_url=this.currency_url+this.currency_api+this.currency_tag;

  firebase_url=environment.firebase_currency_stroge_url+environment.firebase_currency_stroge_api;



 private get_currency(){
   console.log('getted');
  this.http
  .get<responsedata>(this.all_url)
  .pipe(
    map(responseData => {
      this.response_result.result = responseData.result;
      if(responseData.result==="success"){
        this.response_result.result=responseData.result;

        this.response_result.time_last_update_utc= new Date(responseData.time_last_update_utc).getUTCDate();

      for (const key in responseData.conversion_rates){
          if(key=="XOF"){
            this.response_result.conversion_rates= responseData.conversion_rates["XOF"];
          }
        }
        this.current_currency = this.response_result;
        this.response_upladed_succesfully=true;
      }

    }),
    catchError(() => of([]))
  )
  .subscribe(posts => {
    if( this.response_upladed_succesfully && this.response_result.result==="success"){
    this.set_currencto_to_firebase();
  }

  else{
    this.get_currency_from_firebase();
  }
  });
 }



public get_currency_from_firebase(){
  this.http
  .get<CurrencyModel>(this.firebase_url)
  .pipe(
    map((responseData) => {
      this.response_result.result = responseData.result;

      if(responseData.result==="success"){
        this.response_result.result=responseData.result;

        this.response_result.time_last_update_utc= responseData.time_last_update_utc;

        this.response_result.conversion_rates= responseData.conversion_rates;

        this.current_currency = this.response_result;
        this.response_upladed_succesfully=true;
      }

    }),
    catchError(() => of([]))
  )
  .subscribe(posts => {
    const d= new Date().getUTCDate();
    if(d !== this.current_currency.time_last_update_utc){
      this.get_currency();
    }
    else{
      this.startEmit();
    }
  });
}

private set_currencto_to_firebase(){

    this.http
    .put(this.firebase_url,this.current_currency)
    .pipe(
      catchError(() => of([]))
    )
    .subscribe(posts => {
      this.startEmit();
    });

}



private startEmit(){
  this.currencyChanged.next(this.current_currency);
}


}
