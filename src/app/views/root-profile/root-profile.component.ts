import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  onEdit: string = null;
  showControls:boolean = false;

  constructor
  (
    private data:DataProviderService,
    private routeActive: ActivatedRoute, 
    private router:Router
  ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.userEventEmitter.subscribe( data => { this.formdata = data[0]; this.waiting = false; } )

    /* obtengo paramotro ID enviado al componente por route y disparo la consulta de información de produccion */
    this.routeActive.params.subscribe( (params:Params) =>
      {
        let userId;
        if( params.id == '0' ) { userId = this.data.getUserInfo('id'); } 

        else { userId = params.id; this.showControls = true }

        this.data.listOne( 'user', userId )
      }
    )

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
        "mailmessage":"Te enviamos este correo porque solicitaste el cambio de tu contraseña. Si no fue así, por favor, contacta inmediatamente al administrador del sistema.<br><br>Para cambiar tu contraseña, por favor, seguí el siguiente enlace.<br><br><a href='" + this.apiurl  + "/data/users/user-password-set.php?mail=" + this.formdata.email +"'>Cambiar contraseña<a><br><br>" 
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
    /* cargo la imagen en el update correspondiente y envio actualización a la api */
    switch( this.onEdit )
    {
      case 'avatar':    this.formdata.avatar = $event;  break;
      case 'img1':      this.formdata.img1 = $event;    break;
      case 'img2':      this.formdata.img2 = $event;    break;
      default:          console.error( "Image to edit not selected" );
    }

    /* limpio el flag onEdit */
    this.onEdit = "";
  }

  close()
  {
    this.router.navigateByUrl('/admin-manufacturers');
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
      "lat": "",
      "lon": "",
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
