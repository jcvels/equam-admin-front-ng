import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-production-editor',
  templateUrl: './production-editor.component.html',
  styleUrls: ['./production-editor.component.css']
})
export class ProductionEditorComponent implements OnInit {
  
  waiting:number = 0;
  processid:number;
  formdata:any;
  manufacturers:any;
  destinations:any;

  constructor( private data:DataProviderService, private routeActive: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.clearForm();
    this.data.productionEventEmitter.subscribe( data =>
      {
        this.formdata = data.filter( item => Number( item.id ) == this.processid )[0];
        this.waiting += 1;
      }
    );
    this.data.manufacturersEventEmitter.subscribe( data =>
      {
        this.manufacturers = data;
        this.waiting += 1;
      }
    );
    this.data.destinationsEventEmitter.subscribe( data =>
      {
        this.destinations = data;
        this.waiting += 1;
      }
    );
    this.routeActive.params.subscribe( (params: Params) =>
      {
        this.processid = params.id;
        this.data.list('production');
      }
    );
    this.data.list('manufacturers');
    this.data.list('destinations');
  }

  chargeManufacturer()
  {
    if ( confirm( "¿Confirma la asignación?" ) )
    {
      this.waiting = 0;
      this.data.update( 'production', this.formdata );
    }
  }

  chargeDestination()
  {
    if ( confirm( "¿Confirma la asignación?" ) )
    {
      this.waiting = 0;
      this.data.update( 'production', this.formdata );
    }
  }

  receiveAvatarId($event)
  {

  }

  clearForm()
  {
    this.formdata =
    {
      "id": "",
      "startdate": "",
      "saleid": "",
      "manufacturerid": "",
      "destinationid": "",
      "type": "",
      "statusid": "",
      "productid": "",
      "customerName": "",
      "customerSurname": "",
      "customerMail": "",
      "active": "",
      "creation": "",
      "lastchange": "",
      "product": {
          "id": "",
          "name": "",
          "description": "",
          "avatar": "",
          "price": "",
          "qtty": "",
          "frequency": "",
          "term": "",
          "germ": "",
          "repic1": "",
          "repic2": "",
          "rust": "",
          "plant": "",
          "active": "",
          "creation": "",
          "lastchange": ""
      }
    };
  }

}
