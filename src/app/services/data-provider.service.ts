import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

/*
 *    Para cada tabla a consultar se debera agregar:
 *
 *    1) una url en el array routes.
 *    2) crear un Event Emitter.
 *    3) agregar el nombre de la ruta en el swicht-case de la función emitData.
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class DataProviderService
{
  /* http headers */
  headers = new HttpHeaders( { 'appkey' : '90d34c97c0f71bd781b3e575d0efd868', 'appuser' : 'TEST' } );
    
  /* routes for each data type */
  routes:any = 
  {
    "users":"//localhost/data/users/",
    "mails":"//localhost/mailer/send/"
  };

  /* event emitters */
  usersEventEmitter = new EventEmitter();
  
  constructor( private http:HttpClient ) { }

  /* uses get method to obtain complete list of elements from api */
  list( route:string )
  {
    this.http.get( this.getRoute(route), { headers: this.headers } )
      .subscribe( data =>
      {
        this.evalResponce( data["responce"], false );
        this.emitData( route, data["values"] );
      })
    ;
  }

  /* uses get method to obtain one element from api */
  listOne( route:string, id:string )
  {
    this.http.get( this.getRoute(route) + "?id=" + id, { headers: this.headers } )
    .subscribe( data =>
    {
      this.evalResponce( data["responce"], false );
      this.emitData( route, data["values"] );
    });
  }

  /* create a new record */
  create( route:string, data:any )
  {
    this.http.post( this.getRoute(route), data, { headers: this.headers } )
    .subscribe( data =>
      {
        this.evalResponce( data["responce"], true );
        this.list( route );
      }
    );
  }

  /* update a record */
  update( route:string, data:any )
  {
    this.http.put( this.getRoute(route), data, { headers: this.headers } )
    .subscribe( data =>
      {
        this.evalResponce( data["responce"], true );
        this.list( route );
      }
    );
  }

  /* delete a database record */
  delete( route:string, id:string )
  {
    this.http.delete( this.getRoute(route) + "?id=" + id, { headers: this.headers } )
    .subscribe( data =>
      {
        this.evalResponce( data["responce"], true );
        this.list( route );
      }
    );
  }

  /* proporciona la ruta correcta en funcion del tipo de consulta */
  getRoute( name:string )
  {
    return this.routes[name]; 
  }

  /* analiza la metadata de la respuesta y emite mensaje si es requerido */
  evalResponce( data:any, showOk:boolean )
  {
    console.log( data );
  }

  /* make emit depens on given event emitter */
  emitData( name:string, data:any )
  {
    switch( name )
    {
      case 'users': this.usersEventEmitter.emit( data ); break;
      default: break;
    }
  }

  /* envio de mails */
  sendMail( data:any )
  {
    this.http.post( this.getRoute('mails'), data, { headers: this.headers } )
    .subscribe( data => console.log( 'Recovery mail sent') );
  }

}
