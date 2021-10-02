export class CurrencyModel{
  constructor(
    public result:string,
    public conversion_rates:number,
    public time_last_update_utc:number,
  ){}

}
