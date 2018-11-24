import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { BooksampleconsultationComponent } from './booksampleconsultation/booksampleconsultation.component';
import { ServicesComponent } from './services/services.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'booksampleconsultation',
    component: BooksampleconsultationComponent,
    pathMatch: 'full'
  },
  {
    path:'services',
    component: ServicesComponent,
    pathMatch: 'full'
  },
  {
    path:'categories',
    component: CategoriesComponent,
    pathMatch: 'full'
  },
  {
    path:'cart',
    component: CartComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
