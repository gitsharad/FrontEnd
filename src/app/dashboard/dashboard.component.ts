import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  rent_modules: any = [{
    "module_name":"Monthly Billing",
    "routerlink":"/monthlybilling", 
    "module_icon":"glyphicon glyphicon-duplicate"
  },
  {
    "module_name":"New Registration",
    "routerlink":"/rentor",
    "module_icon":"glyphicon glyphicon-plus-sign"
  }];
}
