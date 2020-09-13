import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service'

@Component({
  selector: 'app-root-users',
  templateUrl: './root-users.component.html',
  styleUrls: ['./root-users.component.css']
})
export class RootUsersComponent implements OnInit {

  waiting:boolean = true;
  users:any;
  formdata:any;
  apiurl:string;
  headers:any =
  [
    {
      "name":"Usuario",
      "colsize":"1"
    },
    {
      "name":"Nombre",
      "colsize":"2"
    },
    {
      "name":"Apelido",
      "colsize":"2"
    },
    {
      "name":"Correo",
      "colsize":"3"
    },
    {
      "name":"Estado",
      "colsize":"1"
    },
    {
      "name":"Permisos",
      "colsize":"2"
    },
    {
      "name":"",
      "colsize":"1"
    }
  ];

  constructor( public data:DataProviderService ) { }

  /* obtiene listado de usuarios */
  ngOnInit(): void
  {
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.clearForm();
    this.data.usersEventEmitter.subscribe( data => { this.users = data; this.waiting = false; this.clearForm(); } );
    this.data.list( 'users' );
  }

  /* carga la informacion en el formulario */
  public edit( data:any )
  {
    /* clear form data */
    this.clearForm();

    /* copy user data to form data */
    this.formdata = data;
  }

  /* envia los datos modificados en el formulario */
  save() 
  {
    /* create a new user */
    if( this.formdata.id == "0" )
    {
      /* configuro valores iniciales de la cuenta de usuario */
      this.formdata.active = "0";
      this.formdata.needreset = "1";

      /* envio solicitud de creacion de usuario */
      this.data.create( 'users', this.formdata );
    }

    /* update current user with given id */
    else
    {
      this.data.update( 'users', this.formdata) ;
      this.waiting = true;
    }
    
    /* muestro mensaje de espera */
    this.waiting = true;
    
    /* clear form data */
    this.clearForm();
  }

  delete()
  {
    if( confirm('¿Esta seguro que quiere eliminar al usuario?') )
    {
      this.data.delete( 'users', this.formdata.id );
      this.waiting = true;
    }
  }

  /* limpia la información del formulario de usuario */
  clearForm()
  {
    this.formdata =
    {
      "id": "0",
      "username": "",
      "name": "",
      "surname": "",
      "email": "",
      "avatar": "0",
      "bio": "",
      "root": "0",
      "admin": "0",
      "sales": "0",
      "production": "0",
      "productor": "0",
      "needreset": "0",
      "active": "1",
      "creation": "",
      "lastchange": ""
    };
  }

  changeValue( item:string )
  {
    /* change value in formdata aray to bind with form-checks */
    if ( this.formdata[item] == "0" ) { this.formdata[item] = "1" }
    else { this.formdata[item] = "0" }
  }

  passRecovery()
  {

    if(  confirm('¿Está seguro que quiere permitir la restauración de contraseña?' ))
    {
      /* configuro valores en modo de restauración de contraseña */
      this.formdata.active = "0";
      this.formdata.needreset = "1";

      /* envio información actualizada */
      this.data.update( 'users', this.formdata) ;
      this.waiting = true;

      /* mail de recuperación */
      let mail:any =
      { 
        "mailsubject":"Recuperación de contraseña",
        "mailsendto":this.formdata.email,
        "mailtitle":"Recuperación de contraseña",
        "mailmessage":"Te enviamos este correo porque solicitaste la recuperación de tu contraseña. Si no fue así, por favor, contacta inmediatamente al administrador del sistema.<br><br>Para reactivar tu cuenta y configurar una contraseña, por favor, seguí el siguiente enlace.<br><br><a href='"+ this.data.getConfigInfo('apiurl') +"/data/users/user-password-set.php?mail=" + this.formdata.email +"'>Establecer contraseña<a><br><br>" 
      };

      /* envio mensaje de restauración */
      this.data.sendMail( mail );
    }
  }

}
