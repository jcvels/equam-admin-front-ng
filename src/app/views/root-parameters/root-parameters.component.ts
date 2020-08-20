import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-root-parameters',
  templateUrl: './root-parameters.component.html',
  styleUrls: ['./root-parameters.component.css']
})
export class RootParametersComponent implements OnInit {

  parameters:any;
  waiting:boolean = false;
  headers:any =
  [
    {
      "name":"ID",
      "colsize":"1"
    },
    {
      "name":"Agrupador",
      "colsize":"2"
    },
    {
      "name":"Valor",
      "colsize":"6"
    },
    {
      "name":"Creación",
      "colsize":"2"
    },
    {
      "name":"",
      "colsize":"1"
    }
  ];
  formdata:any;

  constructor( public data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearform();
    this.data.parametersEventEmitter.subscribe( data => { this.parameters = data; this.waiting = false; } );
    this.data.list('parameters');
  }

  edit( data:any )
  {
    this.formdata = data;
  }

  save()
  {
    /* nuevo valor */
    if( this.formdata.id == '')
    {
      this.data.create('parameters', this.formdata);
      this.data.list('parameters');
    }
    
    /* modificacion de valor */
    else
    {
      this.data.update('parameters', this.formdata);
      this.data.list('parameters');
    }

    /* limpio el formulario */
    this.clearform();
  }

  delete( id:string)
  {
    if( confirm( "¿Esta seguro que quiere borrar el parametro?" ) )
    {
      this.data.delete( 'parameters', id );
    }
  }

  clearform()
  {
    this.formdata = { "id":"", "name":"", "value":"", "description":"", "active":"", "creation":"", "lastchange":"" }; 
  }

}
