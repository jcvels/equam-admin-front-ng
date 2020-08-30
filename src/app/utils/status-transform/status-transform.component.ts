import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-status-transform',
  templateUrl: './status-transform.component.html',
  styleUrls: ['./status-transform.component.css']
})
export class StatusTransformComponent implements OnInit {

  @Input() statusid:string;

  parameters:any;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.data.parametersEventEmitter.subscribe( data => 
      {
        this.parameters = data.filter( item => item.name == "status" );
      }
    );
    this.data.list('parameters');
  }

}
