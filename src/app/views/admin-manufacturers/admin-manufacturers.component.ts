import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-admin-manufacturers',
  templateUrl: './admin-manufacturers.component.html',
  styleUrls: ['./admin-manufacturers.component.css']
})
export class AdminManufacturersComponent implements OnInit {

  manufacturers:any;
  formdata:any;
  waiting:boolean = true;
  apiurl:string;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.data.manufacturersEventEmitter.subscribe( data => { this.manufacturers = data; this.waiting = false; } )
    this.data.list('manufacturers');
  }

  filterTable() {}

  edit(data:any)
  {

  }

  new()
  {

  }

}
