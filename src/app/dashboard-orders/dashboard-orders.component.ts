import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order';
import * as _ from 'lodash';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   symbol1: string;
//   symbol2: string;
// }




@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.css']
})
export class DashboardOrdersComponent implements OnInit {


  displayedColumns: string[] = ['productName', 'qty', 'rate', 'status', 'name', 'words', 'orderId'];
  data: Order[] = [];
  //data: Array<any> = []
  isLoadingResults = true;


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
