import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-root-log',
  templateUrl: './root-log.component.html',
  styleUrls: ['./root-log.component.css']
})
export class RootLogComponent implements OnInit {

  waiting:boolean = true;
  logs:any;
  headers:any =
  [
    {
      "name":"ID",
      "colsize":"1"
    },
    {
      "name":"Fecha",
      "colsize":"2"
    },
    {
      "name":"Usuario",
      "colsize":"2"
    },
    {
      "name":"Detalles",
      "colsize":"6"
    },
    {
      "name":"",
      "colsize":"1"
    }
  ];

  constructor( public data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.data.logsEventEmitter.subscribe( data => { this.logs = data; this.waiting = false; } )
    this.data.list( 'logs' );
  }

  delete( id:string )
  {
    if( confirm( "¿Esta seguro que quiere borrar el registro?" ) )
    {
      this.data.delete( 'logs', id );
    }
  }

}
