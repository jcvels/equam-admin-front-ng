import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.css']
})
export class ProfileManagerComponent implements OnInit {

  @ViewChild("imgUploadForm") myButton: ElementRef;

  @Input()  self:boolean;
  @Input()  profile:any;

  @Output() updatedProfileEventEmitter = new EventEmitter<any>();

  waiting:boolean = true;
  showImgSelector:boolean = false; 
  formdata:any;
  apiurl:string;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.formdata = this.profile;
  }

  /* guardar */
  save()
  {
    if( confirm("¿Guardar los cambios?") )
    {
      this.updatedProfileEventEmitter.emit( this.formdata );
    }
  }

  /* recuperar contraseña */
  passRecovery()
  {
    if(  confirm('¿Está seguro que quiere cambiar de contraseña?\nCerraremos su sesión y recibirá un correo con el link de acceso para cambiar la contraseña.' ))
    {
      /* configuro valores en modo de restauración de contraseña */
      this.formdata.active = "0";
      this.formdata.needreset = "1";

      /* envio información actualizada */
      this.updatedProfileEventEmitter.emit( this.formdata );
      this.waiting = true;

      /* mail de recuperación */
      let mail:any =
      { 
        "mailsubject":"Cambio de contraseña",
        "mailsendto":this.formdata.email,
        "mailtitle":"Cambio de contraseña",
        "mailmessage":"Te enviamos este correo porque solicitaste el cambio de tu contraseña. Si no fue así, por favor, contacta inmediatamente al administrador del sistema.<br><br>Para cambiar tu contraseña, por favor, seguí el siguiente enlace.<br><br><a href='"+ this.data.getConfigInfo('apiurl') +"/data/users/user-password-set.php?mail=" + this.formdata.email +"'>Cambiar contraseña<a><br><br>"
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
    this.showImgSelector = false;
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
      "img1":"",
      "img2":"",
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
