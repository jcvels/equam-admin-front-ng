import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

/*
 *    Para cada tabla a consultar se debera agregar:
 *
 *    1) una url en el array routes.
 *    2) crear un Event Emitter.
 *    3) agregar el nombre de la ruta en el swicht-case de la función emitData.
 */

@Injectable({
  providedIn: 'root'
})
export class DataProviderService
{
  /* user data */
  user:any = { "username":"PUBLIC" };

  /* app config */
  apiUrl:string;
  appUrl:string;
    
  /* routes for each data type */
  routes:any = 
  {
    "login":"//localhost/data/users/user-validation.php",
    "users":"//localhost/data/users/",
    "user":"//localhost/data/users/",
    "mails":"//localhost/mailer/send/",
    "logs":"//localhost/data/logs/",
    "config":"//localhost/data/config/"
  };

  /* event emitters */
  userLogInEventEmitter = new EventEmitter();
  userEventEmitter = new EventEmitter();
  usersEventEmitter = new EventEmitter();
  logsEventEmitter = new EventEmitter();
  configEventEmmiter = new EventEmitter();

  /* make emit depens on given event emitter */
  private emitData( route:string, data:any )
  {
    switch( route )
    {
      case 'users':   this.usersEventEmitter.emit( data ); break;
      case 'user':    this.userEventEmitter.emit( data ); break;
      case 'logs':    this.logsEventEmitter.emit( data ); break;
      case 'config':  this.configEventEmmiter.emit( data ); break;
      default: break;
    }
  }
  
  constructor( private http:HttpClient ) { }

  /* uses get method to obtain complete list of elements from api */
  list( route:string )
  {
    this.http.get( this.getRoute(route), { headers: this.getHeaders() } )
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
    this.http.get( this.getRoute(route) + "?id=" + id, { headers: this.getHeaders() } )
    .subscribe( data =>
    {
      this.evalResponce( data["responce"], false );
      this.emitData( route, data["values"] );
      return data["values"]; 
    });
  }

  /* create a new record */
  create( route:string, data:any )
  {
    this.http.post( this.getRoute(route), data, { headers: this.getHeaders() } )
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
    this.http.put( this.getRoute(route), data, { headers: this.getHeaders() } )
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
    this.http.delete( this.getRoute(route) + "?id=" + id, { headers: this.getHeaders() } )
    .subscribe( data =>
      {
        this.evalResponce( data["responce"], true );
        this.list( route );
      }
    );
  }

  /* proporciona la ruta correcta en funcion del tipo de consulta */
  private getRoute( name:string )
  {
    return this.routes[name]; 
  }

  /* analiza la metadata de la respuesta y emite mensaje si es requerido ¡¡¡ TO-DO !!!*/
  private evalResponce( data:any, showOk:boolean )
  {
    console.log( data );
  }

  /* envio de mails */
  sendMail( data:any )
  {
    this.http.post( this.getRoute('mails'), data, { headers: this.getHeaders() } )
    .subscribe( data => this.evalResponce( data , true ) );
  }

  /* user login */
  login( username:string, password:string )
  {
    /* defino la ruta de acceso */
    let route = "login";

    /* creo el objeto data con la información de acceso */
    let data = { "username":username, "password":password  };

    /* envio la informacion al servidor de validación y espera respuesta */
    this.http.post( this.getRoute(route), data, { headers: this.getHeaders() } )
    .subscribe( data =>
      {
        /* envio a evalaur el resultado de la respuesta */
        this.evalResponce( data["responce"], false );

        /* almaceno temporalmente el id de usuario */
        let id = data["responce"]["userid"]; 

        /* si la respuesta es true, solicito los datos del usuario */
        if ( data["responce"]["validated"] == true )
        {
          /* defino la ruta de acceso */
          let route = "users";

          /* envio el id de usuario para obtener su información */
          this.http.get( this.getRoute(route) + "?id=" + id, { headers: this.getHeaders() } )
          .subscribe( data =>
          {
            /* cuando obtengo la respuesta envio para evaluación la metadata */
            this.evalResponce( data["responce"], false );

            /* guardo los datos del usurio en la variable user */
            this.user = data["values"][0];

            /* emito la validacion de usuario */
            this.userLogInEventEmitter.emit( true );
          });
        }

        /* si la validación falla emito false */
        else { this.userLogInEventEmitter.emit( false ); }
      }
    );
  }

  /* user logout */
  logout()
  {
    this.userLogInEventEmitter.emit( false );
  }

  public roleValidate( viewon:string )
  {
    /* valido que se suministraron los parametros */
    if( viewon == "" ) { return false; }
    else
    {
      /* genero un aculumador temporal */
      let sum = 0;

      /* evaluo cada rol y sumo uno si hay coincidencia */
      if ( this.user.root == '1' ) { if ( viewon.indexOf( 'root' ) > -1 ) { sum += 1 } }
      if ( this.user.admin == '1' ) { if ( viewon.indexOf( 'admin' ) > -1 ) { sum += 1 } }
      if ( this.user.sales == '1' ) { if ( viewon.indexOf( 'sales' ) > -1 ) { sum += 1 } }
      if ( this.user.production == '1' ) { if ( viewon.indexOf( 'production' ) > -1 ) { sum += 1 } }
      if ( this.user.productor == '1' ) { if ( viewon.indexOf( 'productor' ) > -1 ) { sum += 1 } }

      /* si huvo coincidencia en alguno de los roles envio true */
      if ( sum >0 ) { return true; }

      /* si ninguno de los roles coincida envio false */
      else { return false; }
    }
  }

  /* retuns headers for http connection */
  private getHeaders()
  {
    /* appkey */
    let appkey = '90d34c97c0f71bd781b3e575d0efd868';

    /* http headers */
    let headers = new HttpHeaders( { 'appkey' : appkey, 'appuser' : this.user.username } );

    /* retun */
    return headers;
  }

}
