import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  headers:any = [{"name":"Nombre","colsize":"8"},{"name":"Precio","colsize":"3"}];
  waiting:boolean = true;
  apiurl:string;
  formdata:any;
  products:any;
  
  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.data.productsEventEmitter.subscribe( data => { this.products = data; this.waiting = false; } );
    this.data.list( 'products' );
  }

  edit( data:String )
  {
    this.formdata = data;
    this.formdata.unitPrice = this.formdata.price / this.formdata.qtty;
  }

  calcPrice()
  {
    this.formdata.price = this.formdata.unitPrice * this.formdata.qtty;
  }

  save()
  {
    /* nuevo valor */
    if( this.formdata.id == '')
    {
      this.data.create('products', this.formdata);
      this.data.list('products');
    }
    
    /* modificacion de valor */
    else
    {
      this.data.update('products', this.formdata);
      this.data.list('products');
    }

    /* limpio el formulario */
    this.clearForm();
  }

  clearForm()
  {
    this.formdata =
    {
      "id":"",
      "name":"",
      "description":"",
      "avatar":"0",
      "price":"",
      "unitPrice": "",
      "qtty":"",
      "frequency":"",
      "term":"",
      "germ":"",
      "repic1":"",
      "repic2":"",
      "rust":"",
      "plant":"",
      "active":"",
      "creation":"",
      "lastchange":""
    };
  }

  receiveAvatarId( event:any )
  {

  }

  changeValue( item:string )
  {
    /* change value in formdata aray to bind with form-checks */
    if ( this.formdata[item] == "0" ) { this.formdata[item] = "1" }
    else { this.formdata[item] = "0" }
  }

}
