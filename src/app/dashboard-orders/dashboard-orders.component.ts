import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order';
import * as _ from 'lodash';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.css']
})
export class DashboardOrdersComponent implements OnInit {


  data: Order[] = [];
  public userType
  
  //data: Array<any> = []
  isLoadingResults = true;
  public orderStatus
  public SampleCoated = 
    {
      "writer":"SSSPAWAR25@GMAIL.COM",
      "orderId":"66@Wjb8bOg",
      "accept":false,
      "samples":[{
        "category":"whitePaper",
        "subCategory":"title",
        "content":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
      },
      {
        "category":"Article",
        "subCategory":"title",
        "content":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
      }],
      "date":"25 March 2019"
    }
  public menuList = {
    
  }

  constructor(private api: OrdersService, private route: ActivatedRoute) { }

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

 acceptSample(id){
   /* for (let sample of this.SampleCoated) {
      if(sample['writer'] === id){
        sample['accept'] = true
      } else{
        sample['accept'] = false
      }
  }   */
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
