import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production-active',
  templateUrl: './production-active.component.html',
  styleUrls: ['./production-active.component.css']
})
export class ProductionActiveComponent implements OnInit {

  sinasignar:number = 23;

  constructor() { }

  ngOnInit(): void {
  }

}
