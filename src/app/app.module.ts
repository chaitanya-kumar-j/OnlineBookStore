import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetAllBooksComponent } from './components/get-all-books/get-all-books.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';
import {MatCardModule} from '@angular/material/card';
import { QuickViewComponent } from './components/quick-view/quick-view/quick-view.component';
import { CartComponent } from './components/cart/cart.component';
import {MatRadioModule} from '@angular/material/radio';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { AddOrUpdateComponent } from './components/add-or-update/add-or-update.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    GetAllBooksComponent,
    DisplayBookComponent,
    QuickViewComponent,
    CartComponent,
    AdminDashboardComponent,
    AddOrUpdateComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatBadgeModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
