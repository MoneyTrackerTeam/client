import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Material modules
import { MatTableModule, MatToolbarModule, MatSidenavModule, MatButtonModule } from '@angular/material';
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
import { AlertComponent } from './components/alert/alert.component';
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
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: false
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule
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
