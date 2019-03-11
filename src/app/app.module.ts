import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { BooksampleconsultationComponent } from './booksampleconsultation/booksampleconsultation.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServicesComponent } from './services/services.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrServiceService } from './toastr-service.service';
import { ProductService } from "./myservices/product.service";
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { CartitemComponent } from './cartitem/cartitem.component';
import { CartitemloaderService } from './cartitemloader.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndustrycarouselComponent } from './industrycarousel/industrycarousel.component';
import { NgbdModalBasic } from "./modal-basic";
import { AutofocusDirective } from './auto-focus.directive';
import { DashboardOrdersComponent } from './dashboard-orders/dashboard-orders.component';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { LaunchComponent } from './launch/launch.component';
import { CheckoutService } from './myservices/checkout.service';
import { HelperService } from './myservices/helper.service';
import { ConfigService } from './config.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NgxDataTableModule } from "ngx-nested-data-table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    BooksampleconsultationComponent,
    CategoriesComponent,
    ServicesComponent,
    FooterComponent,
    CheckoutComponent,
    CartComponent,
    CartitemComponent,
    IndustrycarouselComponent,
    NgbdModalBasic,
    AutofocusDirective,
    DashboardOrdersComponent,
    DashboardProductsComponent,
    OrderDetailComponent,
    OrderAddComponent,
    OrderEditComponent,
    LaunchComponent,
    ForgotpasswordComponent


  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    NgxDataTableModule,
    MatExpansionModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule

  ],
  providers: [AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
    ToastrServiceService,
    ProductService,
    CartitemloaderService,
    CheckoutService,
    HelperService,
    ConfigService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CartitemComponent]
})
export class AppModule { }
