import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  waiting:boolean = true;
  formdata:any;
  companies:any;
  
  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.companiesEventEmitter.subscribe( data => { this.companies = data; this.waiting = false; } );
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
      this.data.create('companies', this.formdata);
      this.data.list('companies');
    }
    
    /* modificacion de valor */
    else
    {
      this.data.update('companies', this.formdata);
      this.data.list('companies');
    }

    /* limpio el formulario */
    this.clearForm();
  }

  clearForm()
  {
    this.formdata =
    {
      "id": "",
      "name": "",
      "companyname": "",
      "avatar": "",
      "phone": "",
      "mail": "",
      "street": "",
      "city": "",
      "postal": "",
      "province": "",
      "active": "",
      "creation": "",
      "lastchange": ""
    };
  }

}
