import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetAllBooksComponent } from './components/get-all-books/get-all-books.component';
import { LoginComponent } from './components/login/login.component';
import { QuickViewComponent } from './components/quick-view/quick-view/quick-view.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user', component: DashboardComponent,
    children: [{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: GetAllBooksComponent, canActivate: [AuthenticationGuard]},
    {path:"home/:bookId", component: QuickViewComponent, canActivate: [AuthenticationGuard]},
    {path:"cart", component: CartComponent, canActivate: [AuthenticationGuard]}
    ]
  },
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminDashboardComponent, canActivate: [AuthenticationGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
