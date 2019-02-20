import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order } from '../order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  // order: Order = { productName: '', qty: null, rate: null, status: '', name: '', words: null, orderId: null };
  isLoadingResults = true;


  constructor(private route: ActivatedRoute, private api: OrdersService, private router: Router) {
    console.log("order");
  }

  ngOnInit() {
    console.log("heyyyyyyyy");
    this.api.getOrders(localStorage.getItem('email'))
      .subscribe(res => {
        console.log("res", res);
        // this.order = res;
        // console.log(this.order);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
