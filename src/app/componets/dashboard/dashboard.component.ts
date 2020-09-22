import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { DataProviderService } from 'src/app/services/data-provider.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  username:string;
  dashData:any =
  {
    "qttyArbolesPlantados": "0",
    "qttyArbolesSinProductor": "0",
    "qttyArbolesEnProducción": "0",
    "qttyArbolesAsignarDestino": "0",
    "qttyArbolesGerminacion": "0",
    "qttyArbolesRepique1": "0",
    "qttyArbolesRepique2": "0",
    "qttyArbolesRustificacion": "0",
    "qttyArbolesPlantacion": "0",
    "tamanoBaseDatosGB": "0",
    "registrosBaseDatos": "0"
  };

  constructor( public data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.username = this.data.getUserInfo('name');
    this.data.dashboardsEventEmitter.subscribe( data => this.dashData = data );
    this.data.list('dashboard');
  }

}
