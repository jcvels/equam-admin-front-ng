import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-root-config',
  templateUrl: './root-config.component.html',
  styleUrls: ['./root-config.component.css']
})
export class RootConfigComponent implements OnInit {

  waiting:boolean = true;
  viewSecret:boolean = false;
  config:any;
  formdata:any;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.configEventEmmiter.subscribe( data => { this.config = data; this.waiting = false; console.log( data ) } )
    this.data.list( 'config' );
  }

  clearForm()
  {
    this.formdata =
    {
      "id": "",
      "name": "",
      "value": "",
      "active": "",
      "creation": "",
      "lastchange": ""
    }
  }

  edit( data:any )
  {
    this.formdata = data;
  }

  save()
  {
    this.data.update( 'config', this.formdata );
    this.clearForm();
  }

}
