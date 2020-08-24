import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  styleUrls: ['./orders-new.component.css']
})
export class OrdersNewComponent implements OnInit {

  waiting:number = 0;
  
  products:any;
  plans:any;
  plansFilter:any;
  companies:any;
  sale:any;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.productsEventEmitter.subscribe( data => { this.products = data; this.waiting +=1; } ); 
    this.data.plansEventEmitter.subscribe( data => { this.plans = data; this.waiting +=1; } );
    this.data.companiesEventEmitter.subscribe( data => { this.companies = data; this.waiting +=1; } ); 
    this.data.list('products');
    this.data.list('plans');
    this.data.list('companies');
  }

  filterPlan( event:any )
  {
    this.plansFilter = this.plans.filter( item => item.companyid == event.target.value );
  }

  chargePlan( event:any )
  {
    let selected = this.plans.filter( item => item.id == event.target.value );
    this.sale.productId = selected[0].id;
    this.sale.productName = selected[0].name;
    this.sale.productQtty = selected[0].qtty;
    this.sale.productFrequency = selected[0].frequency;
    this.sale.productTerm = selected[0].term;
    this.sale.price = selected[0].price;  
  }

  chargeProduct( event:any )
  {
    let selected = this.products.filter( item => item.id == event.target.value );
    this.sale.productId = selected[0].id;
    this.sale.productName = selected[0].name;
    this.sale.productQtty = selected[0].qtty;
    this.sale.productFrequency = selected[0].frequency;
    this.sale.productTerm = selected[0].term;
    this.sale.price = selected[0].price; 
  }

  save()
  {
    this.data.create( 'sales', this.sale )
    this.clearForm();
  }

  clearForm()
  {
    this.sale =
    {
      "type":"",
      "companyName":"",
      "reference":"",
      "seler":"",
      "productName":"",
      "productQtty":"",
      "productFrequency":"",
      "productTerm":"",
      "productId":"",
      "customerName":"",
      "customerSurname":"",
      "customerMail":"",
      "price":"0",
      "active":"1",
    };
  }

}
