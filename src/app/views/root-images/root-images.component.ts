import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-root-images',
  templateUrl: './root-images.component.html',
  styleUrls: ['./root-images.component.css']
})
export class RootImagesComponent implements OnInit {

  waiting:boolean = true;
  images:any;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.data.imagesEventEmitter.subscribe( data => { this.images = data; this.waiting = false; } );
    this.data.list( 'images' );
  }

}
