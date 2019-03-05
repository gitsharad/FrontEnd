import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit() {
  }
  showProducts() {
    this.router.navigate(['products'], { relativeTo: this.route });
  }

  showOrders() {
    this.router.navigate(['orders'], { relativeTo: this.route });
  }
  showOrderDetails() {
    this.router.navigate(['detail'], { relativeTo: this.route });
  }

}
