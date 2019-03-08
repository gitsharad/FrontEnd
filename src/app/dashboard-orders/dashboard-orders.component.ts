import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order';
import * as _ from 'lodash';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}



@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.css']
})
export class DashboardOrdersComponent implements OnInit {


  displayedColumns: string[] = ['productName', 'qty', 'otherInfo'];
  data: Order[] = [];
  
  //data: Array<any> = []
  isLoadingResults = true;
  public menuList = {
    
  }

  constructor(private api: OrdersService) { }

  ngOnInit() {
    this.api.getOrders(localStorage.getItem('email'))
      .subscribe(res => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  

}
