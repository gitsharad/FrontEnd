import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  productForm: FormGroup;
  productName: string = '';
  qty: number = null;
  rate: number = null;
  status: string = '';
  name: string = '';
  words: number = null;
  orderId: number = null;

  constructor(private router: Router, private api: OrdersService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("heyyyyyy");

    // this.productForm = this.formBuilder.group({
    //   'productName': [null, Validators.required],
    //   'qty': [null, Validators.required],
    //   'rate': [null, Validators.required],
    //   'status': [null, Validators.required],
    //   'name': [null, Validators.required],
    //   'words': [null, Validators.required],
    //   'orderId': [null, Validators.required],
    // });
  }

}
