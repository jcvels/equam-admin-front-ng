import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-headers',
  templateUrl: './table-headers.component.html',
  styleUrls: ['./table-headers.component.css']
})
export class TableHeadersComponent implements OnInit {

  @Input() headers:any;
  @Input() items:any;

  constructor() { }

  ngOnInit(): void {}

}