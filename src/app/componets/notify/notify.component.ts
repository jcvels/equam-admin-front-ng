import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  messages:any = [];

  constructor( private msgProvider:NotifyService )
  {

  }

  ngOnInit(): void
  {
    this.msgProvider.msgEmitter.subscribe( data => 
      {
        this.messages.push( data ) 
        if( data["type"] != -1 ) { setTimeout(() => { this.messages.splice(0, 1); }, 7000); }
      }
    );
  }

}
