import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  homelabel:string = "Dashboard"; 
  menuitems:any =
  [
    {
      "name":"Comercialización",
      "viewon":"root sales",
      "items":
      [
        {
          "name":"Ventas",
          "link":"orders-archive",
          "icon":"far fa-file-alt",
          "viewon":"root sales"
        },
        {
          "name":"Empresas",
          "link":"admin-companies",
          "viewon":"root admin"
        },
        {
          "name":"Productos",
          "link":"admin-products",
          "viewon":"root admin"
        },
        {
          "name":"Planes",
          "link":"admin-plans",
          "viewon":"root admin"
        }
      ]
    },
    {
      "name":"Producción",
      "viewon":"root production",
      "items":
      [
        {
          "name":"Administración de la producción",
          "link":"production-active",
          "viewon":"root production"
        },
        {
          "name":"Historial de producción",
          "link":"production-archive",
          "viewon":"root production"
        },
        {
          "name":"Productores",
          "link":"admin-manufacturers",
          "viewon":"root admin"
        },
        {
          "name":"Receptores",
          "link":"admin-destinations",
          "viewon":"root admin"
        }
      ]
    },
    {
      "name":"Productor",
      "viewon":"root productor",
      "items":
      [
        {
          "name":"Administrar mi producción",
          "link":"production-active",
          "viewon":"root productor"
        },
        {
          "name":"Historial de mi producción",
          "link":"production-archive",
          "viewon":"root productor"
        }
      ]
    }
  ];

  constructor( public data:DataProviderService )
  {

  }

  ngOnInit(): void
  {

  }

}
