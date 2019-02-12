import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  route: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  showProducts() {
    console.log("heeyyy")
    this.router.navigate(['products']);
  }

  showOrders() {
    console.log("fwrwe");
    this.router.navigate(['/orders'], { relativeTo: this.route });
  }

}
