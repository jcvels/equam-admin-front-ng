import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-destinations',
  templateUrl: './admin-destinations.component.html',
  styleUrls: ['./admin-destinations.component.css']
})
export class AdminDestinationsComponent implements OnInit {
  
  formdata:any = 
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
    "geolink":"",
    "status":"",
    "creation":"",
    "lastchange":""
  };
  destinations:any =
  [
    {
      "id":"1",
      "name":"Bringas José",
      "companyname":"",
      "phone":"(03544) 15 589374",
      "email":"aaaaa@ggggg.com.ar",
      "address":
      {
        "street":"",
        "city":"San Javier",
        "postal":"",
        "provincia":"Córdoba",
        "country":"Argentina"
      },
      "geolink":"",
      "status":"",
      "creation":"",
      "lastchange":""
    }
  ];

  constructor() { }

  ngOnInit(): void {}

  filterTable() {}

  edit( data:String ) { this.formdata = data }

}
