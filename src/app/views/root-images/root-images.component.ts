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
  apiurl:string;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.data.imagesEventEmitter.subscribe( data => { this.images = data; this.waiting = false; } );
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.listImages();
  }

  /* eliminar archivo de la galería */
  delete( id:string)
  {
    if( confirm("¿Quiere borrar la imágen?"))
    this.data.delete( 'images', id);
    this.listImages();
  }

  listImages()
  {
    if( this.data.roleValidate( "root" ) ) { this.data.list( 'images' );}
    else { this.data.list( 'myImages' );}
  }

}
