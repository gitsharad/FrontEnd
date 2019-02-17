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

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: 'H', symbol2: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: 'H', symbol2: 'H' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: 'H', symbol2: 'H' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', symbol1: 'H', symbol2: 'H' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', symbol1: 'H', symbol2: 'H' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', symbol1: 'H', symbol2: 'H' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', symbol1: 'H', symbol2: 'H' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', symbol1: 'H', symbol2: 'H' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', symbol1: 'H', symbol2: 'H' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', symbol1: 'H', symbol2: 'H' },
// ];


@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.css']
})
export class DashboardOrdersComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbol1', 'symbol2'];
  // dataSource = ELEMENT_DATA;

  displayedColumns: string[] = ['productName', 'qty', 'rate', 'status', 'name', 'words'];
  data: Order[] = [];
  //data: Array<any> = []
  isLoadingResults = true;


  constructor(private api: OrdersService) { }

  ngOnInit() {
    localStorage.getItem('email')
    console.log("hey you are in orders table");
    this.api.getOrders(localStorage.getItem('email'))
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
