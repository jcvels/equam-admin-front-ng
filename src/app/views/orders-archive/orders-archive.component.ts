import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-orders-archive',
  templateUrl: './orders-archive.component.html',
  styleUrls: ['./orders-archive.component.css']
})
export class OrdersArchiveComponent implements OnInit {

  waiting:boolean = true;
  sales:any;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.data.salesEventEmitter.subscribe( data => { this.sales = data; this.waiting = false; } );
    this.data.list('sales');
  }

}
