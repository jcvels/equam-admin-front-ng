import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-production-editor',
  templateUrl: './production-editor.component.html',
  styleUrls: ['./production-editor.component.css']
})
export class ProductionEditorComponent implements OnInit {
  
  apiurl:string = this.data.getConfigInfo( 'apiurl' );
  waiting:boolean = true;
  processid:number;

  formdata:any;
  manufacturers:any;
  destinations:any;

  germ:any;
  repic1:any;
  repic2:any;
  rust:any;
  plant:any;

  onEdit:string = null;

  constructor
  ( 
    public data:DataProviderService, 
    private routeActive: ActivatedRoute, 
    private notify:NotifyService,
    private router:Router
  ) { }

  ngOnInit(): void
  {
    this.clearForm();
    
    /* subcripcion al provider de informacion de producción */
    this.data.productionEventEmitter.subscribe( data =>
      {
        this.formdata = data.filter( item => Number( item.id ) == this.processid )[0];
        
        this.germ = this.formdata.updates.filter( item => item.type == 'germ' )[0];
        this.repic1 = this.formdata.updates.filter( item => item.type == 'repic1' )[0];
        this.repic2 = this.formdata.updates.filter( item => item.type == 'repic2' )[0];
        this.rust = this.formdata.updates.filter( item => item.type == 'rust' )[0];
        this.plant = this.formdata.updates.filter( item => item.type == 'plant' )[0];

        this.waiting = false;
      }
    );
    
    /* subcripcion al provider de productores y receptores */
    this.data.manufacturersEventEmitter.subscribe( data => { this.manufacturers = data; } );
    this.data.destinationsEventEmitter.subscribe( data => { this.destinations = data; } );
    
    /* obtengo paramotro ID enviado al componente por route y disparo la consulta de información de produccion */
    this.routeActive.params.subscribe( (params: Params) =>
      {
        this.processid = params.id;
        this.data.listOne('production', this.processid.toString() );
      }
    );

    /* ejecuto consulta de productores y receptores */
    this.data.list('manufacturers');
    this.data.list('destinations');
  }

  chargeManufacturer()
  {
    if ( confirm( "¿Confirma la asignación?" ) )
    {
      this.waiting = true;
      this.data.update( 'productionActual', this.formdata );
      
      /* actualizo estado del proceso */
      this.checkStatus();

      /* mail de asignación */
      let mail:any =
      { 
        "mailsubject":"Tu árbol continúa creciendo",
        "mailsendto":this.formdata.customerMail,
        "mailtitle":"Hola " + this.formdata.customerName + "!!" ,
        "mailmessage":"Te contamos que tu árbol ya tiene un productor asignado. Podes saber más sobre su crecimiento, quien lo cuida y su lugar de destino, accediendo al siguiente enlace. Solo te pediremos tu direccion de correo!.<br><br><a href='" + this.data.getConfigInfo('tmlurl') +"'>Ver mi árbol Equam<a><br><br>"
      };

      /* envio mail */
      this.data.sendMail( mail );
    }
  }

  chargeDestination()
  {
    if ( confirm( "¿Confirma la asignación?" ) )
    {
      this.waiting = true;
      this.data.update( 'productionActual', this.formdata );
      
      /* actualizo estado del proceso */
      this.checkStatus();
    }
  }

  checkStatus()
  {
    /* genero una variable temporalmente para calcular el estado */
    let status:number = 0;

    /* establecer estado '0' si no está definido el productor */
    if( this.formdata.manufacturerid == "0" ) { status = 0 }
    
    else
    {
      /* establecer '10' si el productor está definido */
      if( this.formdata.manufacturerid != "0" ) { status += 10 }

      /* si la germinación está completa y es obligatoría establecer '20' */
      if( this.germ.pictureid != "0" || this.formdata.product.germ == "0" ) { status += 10 } 

      /* si primer repique está completo y es obligatorío establecer '30' */
      if( this.repic1.pictureid != "0" || this.formdata.product.repic1 == "0" ) { status += 10 }

      /* si segundo repique está completo y es obligatorío establecer '40' */
      if( this.repic2.pictureid != "0" || this.formdata.product.repic2 == "0" ) { status += 10 }

      /* si la rustificación está completa establecer '50' */
      if( this.rust.pictureid != "0" ) { status += 10 }
    }

    /* si el estado da 50 o mas */
    if ( status >= 50 )
    {
      /* verifico si hay un destino definido */
      if( this.formdata.destinationid != "0" ) { status += 10 }

      /* si la plantación completa establecer '70' */
      if( this.plant.pictureid != "0" ) { status += 10 }
    }

    if ( status >= 70 )
    {
      /* cierro el proceso */
      status = 100;

      
      /* mail de asignación */
      let mail:any =
      { 
        "mailsubject":"Tu árbol continúa creciendo",
        "mailsendto":this.formdata.customerMail,
        "mailtitle":"Hola " + this.formdata.customerName + "!!" ,
        "mailmessage":"Te contamos que tu árbol ya tiene un receptor asignado. Podes saber más sobre su crecimiento, quien lo cuida y su lugar de destino, accediendo al siguiente enlace. Solo te pediremos tu direccion de correo!.<br><br><a href='" + this.data.getConfigInfo('tmlurl') +"'>Ver mi árbol Equam<a><br><br>"
      };

      /* envio mail */
      this.data.sendMail( mail )
    }

    /* muestro notificacion de la actualizacion de estado */
    this.notify.msgShow( 2, "Se actualizó el estado del proceso" );

    /* actualizo la información del estado */
    this.formdata.statusid = status.toString();

    /* envio la actualizacion al servidor */
    this.data.update( 'productionActual', this.formdata );

  }

  edit( data:string )
  {
    this.onEdit = data;
  }

  receiveAvatarId($event)
  {
    /* muestro spiner */
    this.waiting = true;

    /* cargo la imagen en el update correspondiente y envio actualización a la api */
    switch( this.onEdit )
    {
      case 'germ':    this.germ.pictureid = $event;     this.data.update( 'updates', this.germ );     break;
      case 'repic1':  this.repic1.pictureid = $event;   this.data.update( 'updates', this.repic1 );   break;
      case 'repic2':  this.repic2.pictureid = $event;   this.data.update( 'updates', this.repic2 );   break;
      case 'rust':    this.rust.pictureid = $event;     this.data.update( 'updates', this.rust );     break;
      case 'plant':   this.plant.pictureid = $event;    this.data.update( 'updates', this.plant );    break;
      default:        console.error( "Image to edit not selected" );
    }

    /* limpio el flag onEdit */
    this.onEdit = "";

    /* vuelvo a cargar los processos */
    this.data.listOne('production', this.processid.toString() );

    /* actualizo estado del proceso */
    this.checkStatus();
  }

  deleteUpdate( data:string )
  {
    /* muestro spiner */
    this.waiting = true;

    /* cargo la imagen en el update correspondiente y envio actualización a la api */
    switch( data )
    {
      case 'germ':    this.germ.pictureid = 0;     this.data.update( 'updates', this.germ );     break;
      case 'repic1':  this.repic1.pictureid = 0;   this.data.update( 'updates', this.repic1 );   break;
      case 'repic2':  this.repic2.pictureid = 0;   this.data.update( 'updates', this.repic2 );   break;
      case 'rust':    this.rust.pictureid = 0;     this.data.update( 'updates', this.rust );     break;
      case 'plant':   this.plant.pictureid = 0;    this.data.update( 'updates', this.plant );    break;
      default:        console.error( "Image to edit not selected" );
    }

    /* vuelvo a cargar los processos */
    this.data.listOne('production', this.processid.toString() );
    
    /* actualizo estado del proceso */
    this.checkStatus();
  }

  closeProcess()
  {
    if ( confirm( "El proceso ha finalizado, ¿desea cerrarlo, moverlo al historial y enviar el correo al cliente?" ) )
    {
      /* defino estado de cierre */
      this.formdata.statusid = "100";

      /* ------------- TODO TODO TODO MAIL AL CLIENTE ------------------ */

    }
  }

  close()
  {
    this.router.navigateByUrl('/production-active');
  }

  clearForm()
  {
    this.formdata =
    {
      "id": "",
      "startdate": "",
      "saleid": "",
      "manufacturerid": "",
      "destinationid": "",
      "type": "",
      "statusid": "",
      "productid": "",
      "customerName": "",
      "customerSurname": "",
      "customerMail": "",
      "customerCompany": "",
      "active": "",
      "creation": "",
      "lastchange": "",
      "product": {
          "id": "",
          "name": "",
          "description": "",
          "avatar": "",
          "price": "",
          "qtty": "",
          "frequency": "",
          "term": "",
          "germ": "",
          "repic1": "",
          "repic2": "",
          "rust": "",
          "plant": "",
          "active": "",
          "creation": "",
          "lastchange": ""
      }
    };

    let base:any =
    {
      "id":"",
      "processid":"",
      "pictureid":"",
      "status":"",
      "type":"",
      "date":"",
      "active":"",
      "creation":"",
      "lastchange":""
    }

    this.germ = base;
    this.repic1 = base;
    this.repic2 = base;
    this.rust = base;
    this.plant = base;

  }

}
