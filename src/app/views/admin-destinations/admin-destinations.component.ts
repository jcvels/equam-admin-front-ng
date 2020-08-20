import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-admin-destinations',
  templateUrl: './admin-destinations.component.html',
  styleUrls: ['./admin-destinations.component.css']
})
export class AdminDestinationsComponent implements OnInit {
  
  waiting:boolean = true;
  formdata:any;
  destinations:any;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.destinationsEventEmitter.subscribe( data => { this.destinations = data; this.waiting = false } );
    this.data.list( 'destinations' );
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
      this.data.create('destinations', this.formdata);
      this.data.list('destinations');
    }
    
    /* modificacion de valor */
    else
    {
      this.data.update('destinations', this.formdata);
      this.data.list('destinations');
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
      "lat":"",
      "long":"",
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
