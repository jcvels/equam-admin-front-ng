import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-img-manager',
  templateUrl: './img-manager.component.html',
  styleUrls: ['./img-manager.component.css']
})
export class ImgManagerComponent implements OnInit {

  constructor( private data:DataProviderService ) { }

  @Output() selectedImgIdEventEmitter = new EventEmitter<string>();
  
  private username:string;
  private userid:string;
  public apiurl:string;
  
  private image:File = null;
  public images:any = null;
  public status:string = '';

  public selected:boolean = false;
  public uploaded:boolean = false;

  ngOnInit(): void 
  {
    this.data.imageEventEmitter.subscribe( data => this.uploadConfirm( data ) );
    this.data.imagesEventEmitter.subscribe( data => this.images = data );
    this.data.list( 'imgSel' );

    this.username = this.data.getUserInfo('username');
    this.userid = this.data.getUserInfo('id');
    this.apiurl = this.data.getConfigInfo('apiurl');
  }

  /* guarda la imagen seleccionada temporalmente y habilita el boton de subida */
  imgSelected( event )
  {
    if ( event.target.files.length > 0 )
    { 
      this.image = <File> event.target.files[0];
      this.status = "Listo! Presione 'cargar' para agregar el archivo a la galería"
      this.selected = true;
    }
    else { this.status = "Debe seleccionar un archivo..."; }
  }  

  /* subir imagen */
  upload()
  {
    this.status = "Cargando...";
    this.data.postImg( this.image, "Uploaded by " + this.username, this.userid );
  }

  /* id from responce */
  uploadConfirm( data:any )
  {
    this.status = "Imágen cargada corectamente [ ID=" + data["imgid"] + " ]";
    this.uploaded = true;
    this.data.list( 'imgSel' );
  }

  /* eliminar archivo de la galería */
  delete( id:string)
  {
    if( confirm("¿Quiere borrar la imágen?"))
    this.data.delete( 'images', id);
  }

  /* selecciona una imagen */
  select( id:string )
  {
    this.selectedImgIdEventEmitter.emit( id );
  }

}
