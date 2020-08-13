import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-admin-manufacturers',
  templateUrl: './admin-manufacturers.component.html',
  styleUrls: ['./admin-manufacturers.component.css']
})
export class AdminManufacturersComponent implements OnInit {

  apiurl:string;

  manufacturers:any;
  formdata:any;

  waiting:boolean = true;
  showprofile:boolean = false;
  newprofile:boolean = false;

  constructor( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.data.manufacturersEventEmitter.subscribe( data => { this.manufacturers = data; this.waiting = false; } )
    this.data.usersEventEmitter.subscribe( data => { this.data.list('manufacturers'); } )
    this.data.list('manufacturers');
  }

  edit( data:any )
  {
    this.formdata = data;
    this.newprofile = false;
    this.showprofile = true;

    document.getElementById("profile").style.display = 'block';
  }

  new()
  {
    this.newprofile = true;
    this.showprofile = true;

    document.getElementById("profile").style.display = 'block';
  }

  update( data:any )
  { 
    /* cierro ventana y reseteo flags */
    this.newprofile = false;
    this.showprofile = false;
    document.getElementById("profile").style.display = 'none';

    if( data != null )
    {
      /* bloque para nuevo productor */
      if( data.id != '')
      {
        this.data.update('manufacturers', data);
        this.waiting = true;
      }

      /* bloque para edición de productor */
      else
      {
        /* configurar permisos */
        data.productor = '1';
        data.needreset = '1';

        /* enviar la información al servidor */
        this.data.create('manufacturers', data);
        this.waiting = true;
      }
    }
  }

}
