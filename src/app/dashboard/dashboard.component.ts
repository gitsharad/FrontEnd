import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public _authService: AuthService) { }

  ngOnInit() {
  }
  showProducts(type) {
    this.router.navigate(['products',type],{ relativeTo: this.route });
  }

  showOrders(orderType) {
    this.router.navigate(['orders',orderType], { relativeTo: this.route });
  }
  showOrderDetails() {
    this.router.navigate(['detail'], { relativeTo: this.route });
  }

  showCustomers() {
    // this.router.navigate(['orders'], { relativeTo: this.route });
  }

}
