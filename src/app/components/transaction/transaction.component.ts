import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction } from '../../interfaces';
import { LoaderService } from '../../services/common/loader.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionId: number;
  transaction: ITransaction;
  constructor(private activeRoute: ActivatedRoute,
    private transactionService: TransactionsService,
    private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.transactionId = +params['id']);
    this.getTransaction();
  }

  getTransaction() {
    this.loaderService.shown()
    this.transactionService.getOneTransaction(this.transactionId).subscribe((trans) => {
      this.transaction = trans;
      this.loaderService.hide();
    });
  }
  backClicked() {
    this.router.navigate(['transactions']);
  }

}
