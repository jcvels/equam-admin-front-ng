import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  headers:any =
  [
    {
      "name":"Nombre",
      "colsize":"2"
    }
  ];
  products:any =
  [
    {

    }
  ];
  formdata:any =
  {

  }; 

  constructor() { }

  ngOnInit(): void { }

  filterTable() {}

  edit() {}

}