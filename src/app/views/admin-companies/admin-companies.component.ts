import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  public filter:string = '';
  public formdata:any =
  {
    "id":"",
    "name":"",
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
  companies:any =
  [
    {
      "id":"",
      "name":"Soma",
      "companyname":"Soma S.A.",
      "phone":"1156698194",
      "email":"info@soma.com",
      "address":
      {
        "street":"Calle Falsa 1234",
        "city":"Ciudad que no existe",
        "postal":"C1408BLL",
        "country":"Argentina"
      },
      "status":"active",
      "creation":"",
      "lastchange":""
    },
    {
      "id":"",
      "name":"Peponas",
      "companyname":"Peponas S.R.L.",
      "phone":"1156698194",
      "email":"peponas.shop@gmail.com",
      "address-street":"Calle Falsa 1234",
      "address-city":"Ciudad que no existe",
      "adress-postal":"C1408BLL",
      "address-country":"Argentina",
      "status":"active",
      "creation":"",
      "lastchange":""
    },
    {
      "id":"",
      "name":"Nombre",
      "companyname":"Razón Social",
      "phone":"012924832753",
      "email":"company@domain.com.ar",
      "address-street":"Calle Falsa 1234",
      "address-city":"Ciudad que no existe",
      "adress-postal":"C1408BLL",
      "address-country":"Argentina",
      "status":"active",
      "creation":"",
      "lastchange":""
    },
    {
      "id":"",
      "name":"Soma",
      "companyname":"Soma S.A.",
      "phone":"1156698194",
      "email":"info@soma.com",
      "address-street":"Calle Falsa 1234",
      "address-city":"Ciudad que no existe",
      "adress-postal":"C1408BLL",
      "address-country":"Argentina",
      "status":"active",
      "creation":"",
      "lastchange":""
    },
    {
      "id":"",
      "name":"Peponas",
      "companyname":"Peponas S.R.L.",
      "phone":"1156698194",
      "email":"peponas.shop@gmail.com",
      "address-street":"Calle Falsa 1234",
      "address-city":"Ciudad que no existe",
      "adress-postal":"C1408BLL",
      "address-country":"Argentina",
      "status":"active",
      "creation":"",
      "lastchange":""
    }
  ];
  
  constructor() { }

  ngOnInit(): void { }

  filterTable()
  {
    alert( " WORKS! " + this.filter );
  }

  edit( data:any )
  {
    this.formdata = data;
  }

}
