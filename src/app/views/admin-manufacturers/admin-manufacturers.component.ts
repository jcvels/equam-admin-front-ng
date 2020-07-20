import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-manufacturers',
  templateUrl: './admin-manufacturers.component.html',
  styleUrls: ['./admin-manufacturers.component.css']
})
export class AdminManufacturersComponent implements OnInit {

  headers:any=
  [
    {
      "name":"Nombre",
      "colsize":"2"
    },
    {
      "name":"Apelido",
      "colsize":"2"
    },
    {
      "name":"Empresa",
      "colsize":"2"
    },
    {
      "name":"Teléfono",
      "colsize":"2"
    },
    {
      "name":"Correo",
      "colsize":"3"
    },
    {
      "name":"",
      "colsize":"1"
    }
  ];
  manufacturers:any =
  [
    {
      "id":"1",
      "name":"José",
      "surname":"Bringas",
      "companyname":"",
      "phone":"12345678",
      "email":"abcde@xyz.com",
      "address":
      {
        "street":"",
        "city":"Achiras",
        "postal":"",
        "provincia":"Córdoba",
        "country":"Argentina"
      },
      "status":"",
      "creation":"",
      "lastchange":""
    },
    {
      "id":"2",
      "name":"",
      "surname":"",
      "companyname":"",
      "phone":"",
      "email":"",
      "address":
      {
        "street":"",
        "city":"",
        "postal":"",
        "provincia":"",
        "country":""
      },
      "status":"",
      "creation":"",
      "lastchange":""
    }
  ];
  formdata:any =
  {
    "id":"",
    "name":"",
    "surname":"",
    "companyname":"",
    "phone":"",
    "email":"",
    "address":
    {
      "street":"",
      "city":"",
      "postal":"",
      "provincia":"",
      "country":""
    },
    "status":"",
    "creation":"",
    "lastchange":""
  };

  constructor() { }

  ngOnInit(): void { }

  filterTable() {}

  edit(data:any) {}

}