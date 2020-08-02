import { Component, OnInit } from '@angular/core';
import { DataProviderService } from './services/data-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
 
  userlogin:boolean = false;
  
  constructor ( private data:DataProviderService ) 
  {

  }

  ngOnInit(): void
  {
    this.data.userLogInEventEmitter.subscribe( data => this.userlogin = data ); 
  }

}
