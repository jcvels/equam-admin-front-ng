import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-production-active',
  templateUrl: './production-active.component.html',
  styleUrls: ['./production-active.component.css']
})
export class ProductionActiveComponent implements OnInit {

  waiting:number = 0;

  processNew:any;
  processWorking:any;
  processToClose:any;

  manufacturers:any;
  destinations:any;

  constructor( private data:DataProviderService, private router:Router ) { }

  ngOnInit(): void
  {
    this.data.productionEventEmitter.subscribe( data =>
      {
        this.processNew = data.filter( item => Number( item.statusid ) == 0 );
        this.processWorking = data.filter( item => Number( item.statusid ) > 0 && Number( item.statusid ) < 70 );
        this.processToClose = data.filter( item => Number( item.statusid ) >= 70 && Number( item.statusid )< 100 );
        this.waiting += 1;
      }
    );
    this.data.manufacturersEventEmitter.subscribe( data =>
      {
        this.manufacturers = data;
        this.waiting += 1;
      }
    );
    this.data.destinationsEventEmitter.subscribe( data =>
      {
        this.destinations = data;
        this.waiting += 1;
      }
    );
    this.data.list('production');
    this.data.list('manufacturers');
    this.data.list('destinations');
  }

  public processEdit( data:any )
  {
    this.router.navigateByUrl('/production-editor/' + data );
  }

}
