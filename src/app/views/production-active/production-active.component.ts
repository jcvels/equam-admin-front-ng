import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-production-active',
  templateUrl: './production-active.component.html',
  styleUrls: ['./production-active.component.css']
})
export class ProductionActiveComponent implements OnInit {

  waiting:boolean = true;

  processNew:any = [];
  processWorking:any = [];
  processToClose:any = [];

  manufacturers:any;
  destinations:any;

  constructor( public data:DataProviderService, private router:Router ) { }

  ngOnInit(): void
  {
    this.data.productionEventEmitter.subscribe( data =>
      {
        if( data != null )
        {
          if ( this.data.roleValidate("productor") )
          {
            this.processWorking = data
              .filter( item => Number( item.statusid ) > 0 && Number( item.statusid ) < 50 )
              .filter( item => item.manufacturerid == this.data.getUserInfo('id') )
          }
          else
          {
            this.processNew = data.filter( item => Number( item.statusid ) == 0 );
            this.processWorking = data.filter( item => Number( item.statusid ) > 0 && Number( item.statusid ) < 50 );
            this.processToClose = data.filter( item => Number( item.statusid ) >= 50 && Number( item.statusid )< 100 );
          }
        }
        this.waiting = false;
      }
    );
    this.data.manufacturersEventEmitter.subscribe( data =>
      {
        this.manufacturers = data;
      }
    );
    this.data.destinationsEventEmitter.subscribe( data =>
      {
        this.destinations = data;
      }
    );
    this.data.list('productionActual');
    this.data.list('manufacturers');
    this.data.list('destinations');
  }

  public processEdit( data:any )
  {
    this.router.navigateByUrl('/production-editor/' + data );
  }

}
