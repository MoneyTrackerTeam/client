import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';
import { ITransaction, ICategory } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

const now = new Date();
@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  categories: ICategory[];
  createTransactionForm: FormGroup;
  constructor(private router: Router,
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
      date: [{}, [Validators.required]],
      time: [{}, [Validators.required]]
    });
  }
  onSubmit(e) {
    if (this.createTransactionForm.invalid) {
      e.preventDefault();
      return;
    }
    const date = this.createTransactionForm.controls.date.value;
    const time = this.createTransactionForm.controls.time.value;
    const dateN = `${date.year}-${date.month}-${date.day}` + ` ${time.hour}:${time.minute}`;
    const transaction: ITransaction = this.createTransactionForm.value;
    transaction.date = new Date(dateN).getTime();
    transaction.categoryId = transaction.category.id;
    this.transactionService.createTransaction(transaction).subscribe(createdT => {
      this.router.navigate(['/transactions']);
    });
  }
  onCancel() {
    this.router.navigate(['/']);
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
  isControlInvalid(control) {
    const ctrl = this.createTransactionForm.controls[control];
    if (control === 'category') {
      return (ctrl.value !== 0 || ctrl.value !== -1) && (ctrl.invalid && ctrl.touched);
    }
    return ctrl.invalid && !ctrl.pristine;
  }
}
