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

  constructor( private data:DataProviderService ) { }

  /* obtiene listado de usuarios */
  ngOnInit(): void
  {
    this.clearForm();
    this.data.usersEventEmitter.subscribe( data => { this.users = data; this.waiting = false; } );
    this.data.list( 'users' );
  }

  /* carga la informacion en el formulario */
  public edit( data:any )
  {
    this.formdata = data;
  }

  save() { console.log( this.formdata ); }

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
      "sales": "0",
      "production": "0",
      "productor": "0",
      "needreset": "0",
      "active": "1",
      "creation": "",
      "lastchange": ""
    };
  }

}
