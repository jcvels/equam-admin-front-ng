import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.css']
})
export class ProfileManagerComponent implements OnInit {

  @ViewChild("imgUploadForm") myButton: ElementRef;

  @Input()  newprofile:boolean;
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
    if( this.newprofile ) { this.clearForm(); }
    else { this.formdata = this.profile; }
  }

  /* guardar */
  save()
  {
    if( confirm("¿Guardar los cambios?") )
    {
      this.updatedProfileEventEmitter.emit( this.formdata );
    }
  }

  /* no se realizan cambios */
  close()
  {
    if( confirm("Se perderan los cambios") )
    {
      this.updatedProfileEventEmitter.emit( null );
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
