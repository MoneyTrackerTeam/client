import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading'
// Material modules
import {
  MatTableModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { CategoryComponent } from './components/category/category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { AlertComponent } from './components/common/alert/alert.component';
import { LoaderComponent } from './components/common/loader/loader.component';

const appRoutes: Routes = [
  {
    path: 'transactions', component: TransactionsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'transactions/:id',
    component: TransactionComponent
  },
  {
    path: 'create-transaction',
    component: CreateTransactionComponent
  },
  {
    path: 'edit-transaction/:id',
    component: EditTransactionComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    LoginComponent,
    TransactionComponent,
    CreateTransactionComponent,
    CategoryComponent,
    CreateCategoryComponent,
    EditTransactionComponent,
    AlertComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: false
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LoadingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
