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
  

  selectedImg:File = null;
  status:string = '';
  selected:boolean = false;
  uploaded:boolean = false;

  constructor( public data:DataProviderService) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.userEventEmitter.subscribe( data => { this.formdata = data[0]; this.waiting = false; } )
    this.data.listOne( 'user', this.data.user.id )
    this.data.imageEventEmitter.subscribe( data => { console.log( data ); alert( data ); } );
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

  /* guarda la imagen seleccionada temporalmente y habilita el boton de subida */
  imgSelected( event )
  {
    if ( event.target.files.length > 0 )
    { 
      this.selectedImg = <File> event.target.files[0];
      this.status = "Image file selected. Ready for upload..."
      this.selected = true;
    }
    else { console.log("No hay archivo"); }
  }  

  /* subir imagen */
  upload()
  {
    this.status = "Sending file to server. Waiting for image upload confirmation ... ";
    this.data.postImg( this.selectedImg );
  }

}
