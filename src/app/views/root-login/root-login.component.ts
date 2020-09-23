import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-login',
  templateUrl: './root-login.component.html',
  styleUrls: ['./root-login.component.css']
})
export class RootLoginComponent implements OnInit {

  waiting:boolean = false;
  username:string = null;
  password:string = null;

  constructor( private data:DataProviderService, private router:Router ) { }

  ngOnInit(): void 
  {
    this.data.userLogInEventEmitter.subscribe( data => this.waiting = false );
    this.router.navigateByUrl('/');
  }

  public login()
  {
    this.waiting = true;
    this.data.login( this.username, Md5.hashStr(this.password).toString() );
  }

}
