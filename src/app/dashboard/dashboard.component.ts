import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  showProducts() {
    this.router.navigate(['products'], { relativeTo: this.route });
  }

  showOrders() {
    this.router.navigate(['orders'], { relativeTo: this.route });
  }

}
