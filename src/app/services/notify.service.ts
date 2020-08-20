import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  /*

   -1 --> Persistent error message
    0 --> Error
    1 --> Warning
    2 --> Exito

  */

  public msgEmitter = new EventEmitter();

  constructor() { }

  public msgShow( type:number , message:string )
  {
    this.msgEmitter.emit( { "type": type, "message": message } );
  }

  public msgShowOnError( data:any, showOnOK:boolean )
  {
    if( data["status"] == "OK" )
    {
      if( showOnOK ) { this.msgShow( 2, 'Operación realizada con éxito'); }
    }
    else
    {
      this.msgShow( 0, 'Error al realizar la operación. ' + data.description );
    }

  }

}
