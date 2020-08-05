import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-root-profile',
  templateUrl: './root-profile.component.html',
  styleUrls: ['./root-profile.component.css']
})
export class RootProfileComponent implements OnInit {

  waiting:boolean = true;
  formdata:any;
  apiurl:string;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.userEventEmitter.subscribe( data => { this.formdata = data[0]; this.waiting = false; } )
    this.data.listOne( 'user', this.data.user.id )

    this.apiurl = this.data.getConfigInfo('apiurl');
  }

  save()
  {
    if( confirm("¿Guardar los cambios?") )
    {
      this.data.update( 'users', this.formdata );
    }
  }

  passRecovery()
  {
    if(  confirm('¿Está seguro que quiere cambiar de contraseña?\nCerraremos su sesión y recibirá un correo con el link de acceso para cambiar la contraseña.' ))
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
        "mailsubject":"Cambio de contraseña",
        "mailsendto":this.formdata.email,
        "mailtitle":"Cambio de contraseña",
        "mailmessage":"Te enviamos este correo porque solicitaste el cambio de tu contraseña. Si no fue así, por favor, contacta inmediatamente al administrador del sistema.<br><br>Para cambiar tu contraseña, por favor, seguí el siguiente enlace.<br><br><a href='localhost/data/users/user-password-set.php?mail=" + this.formdata.email +"'>Cambiar contraseña<a><br><br>" 
      };

      /* envio mensaje de restauración */
      this.data.sendMail( mail );

      /* cierra sesión */
      this.data.logout()
    }
  }

  /* recive el id seleccionado y guarda en formdata */
  receiveAvatarId( $event )
  {
    this.formdata.avatar = $event;
    console.log( $event );
  }

  /* clear */
  clearForm()
  {
    this.formdata =
    {
      "id": "",
      "username": "",
      "name": "",
      "surname": "",
      "email": "",
      "phone": "",
      "avatar": "",
      "bio": "",
      "street": "",
      "city": "",
      "postal": "",
      "province": "",
      "root": "",
      "admin": "",
      "sales": "",
      "production": "",
      "productor": "",
      "needreset": "",
      "active": "",
      "creation": "",
      "lastchange": ""
    };
  }

}
