import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.css']
})
export class AdminPlansComponent implements OnInit {

  headers:any = [{"name":"Nombre","colsize":"4"},{"name":"Empresa","colsize":"4"},{"name":"Precio","colsize":"4"}];
  waiting:boolean = true;
  apiurl:string;
  formdata:any;
  plans:any;
  companies:any;
  
  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.data.plansEventEmitter.subscribe( data => { this.plans = data; this.waiting = false; } );
    this.data.list( 'plans' );
    this.data.companiesEventEmitter.subscribe( data => { this.companies = data;} );
    this.data.list( 'companies' );
  }

  edit( data:String )
  {
    this.formdata = data;
  }

  save()
  {
    /* nuevo valor */
    if( this.formdata.id == '')
    {
      this.data.create('plans', this.formdata);
      this.data.list('plans');
    }
    
    /* modificacion de valor */
    else
    {
      this.data.update('plans', this.formdata);
      this.data.list('plans');
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
