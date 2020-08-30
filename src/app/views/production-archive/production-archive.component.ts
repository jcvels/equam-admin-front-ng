import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-production-archive',
  templateUrl: './production-archive.component.html',
  styleUrls: ['./production-archive.component.css']
})
export class ProductionArchiveComponent implements OnInit {

  waiting:boolean = true;
  processArchive:any = [];
  tmlurl:string;

  constructor( public data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.data.productionEventEmitter.subscribe( data =>
      {
        if ( data != null )
        {
          if ( this.data.roleValidate('productor') )
          {
            this.processArchive = data.filter( item => item.manufacturerid == this.data.getUserInfo('id') );
          }
          else
          {
            this.processArchive = data;
          }
          this.waiting = false;
        }
      }
    );
    this.data.list('productionHistory');
    this.tmlurl = this.data.getConfigInfo('tmlurl');
  }

}
