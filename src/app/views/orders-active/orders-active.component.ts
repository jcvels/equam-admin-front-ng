import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-active',
  templateUrl: './orders-active.component.html',
  styleUrls: ['./orders-active.component.css']
})
export class OrdersActiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  tipodeventa:string;

  medio:string;
  plan:string;

  

}
