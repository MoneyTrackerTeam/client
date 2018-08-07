import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction, ICategory } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateDate } from '../../validators/date.validator';
import { ValidateTime } from '../../validators/time.validator';

const now = new Date();
@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  categories: ICategory[];
  createTransactionForm: FormGroup;
  constructor(protected router: Router,
    private transactionService: TransactionsService,
    private categoryService: CategoryService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
    this.initiateForm();
  }

  initiateForm() {
    this.createTransactionForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/\d+/)]],
      category: [0, [Validators.min(1)]],
      date: [{}, [Validators.required, ValidateDate]],
      time: [{}, [Validators.required]]
    });
  }
  onSubmit(e) {
    if (this.createTransactionForm.invalid) {
      e.preventDefault();
      return;
    }
    const transaction: ITransaction = this.createTransactionForm.value;
    transaction.date = new Date(this.createTransactionForm.controls.date.value).getTime();
    transaction.categoryId = this.createTransactionForm.controls.category.value;
    this.transactionService.createTransaction(transaction).subscribe(createdT => {
      this.router.navigate(['/transactions']);
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  onCategoryCreated(cat: ICategory) {
    if (cat.id === -1) {

    } else {
      this.categories.push(cat);
      this.createTransactionForm.controls.category.setValue(cat.id);
    }
  }
}
