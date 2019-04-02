import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order';
import * as _ from 'lodash';
import { ActivatedRoute } from "@angular/router";
import { SampleService } from '../myservices/sample.service';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.css']
})
export class DashboardOrdersComponent implements OnInit {


  data: Order[] = [];
  public userType
  isLoadingResults = true;
  public orderStatus
  public menuList = {
    
  }

  constructor(private api: OrdersService, private route: ActivatedRoute, private sampleApi: SampleService) { }

  ngOnInit() {
    this.userType = localStorage.getItem('userType')
    let parameters = {}
    if(this.userType === 'customer'){
      parameters['email'] = localStorage.getItem('email')
    }
    this.route.paramMap.subscribe(params => {
      this.orderStatus = params.get("status")
      parameters['status'] = this.orderStatus
      this.api.getOrders(parameters)
      .subscribe(res => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    })  
  }

 acceptSample(orderId,email){
  let parameters = {}
  parameters['email'] = email
  parameters['orderId'] = orderId
  this.sampleApi.acceptSample(parameters)
      .subscribe(res => {
        // this.data = res;
      }, err => {
        console.log(err);
      });
}

// Add Sample
  addSample(id,content){
  console.log('add Sample')
  }

// update Sample
 updateSample(){
 console.log('update Sample')
 }
}
