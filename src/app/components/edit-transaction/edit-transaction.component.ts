import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITransaction, ICategory } from '../../interfaces';
import { TransactionsService } from '../../services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NgbTimeStruct, NgbDateStruct } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ValidateDate } from '../../validators/date.validator';
import { ValidateTime } from '../../validators/time.validator';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {
  editTransactionForm: FormGroup;
  transactionId: number;
  categories: ICategory[];
  constructor(private transactionService: TransactionsService, private activeRoute: ActivatedRoute,
    private categoryService: CategoryService, private router: Router, private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.transactionId = +params['id']);
    this.getTransaction();
    this.getCategories();
    this.initiateForm();
  }
  initiateForm() {
    this.editTransactionForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/\d+/)]],
      category: [0, [Validators.min(1)]],
      date: [{}, [Validators.required, ValidateDate]],
      time: [{}, [Validators.required, ValidateTime]]
    });
  }
  getTransaction() {
    this.transactionService.getOneTransaction(this.transactionId).subscribe(t => {
      this.editTransactionForm.controls.title.setValue(t.title);
      this.editTransactionForm.controls.amount.setValue(t.amount);
      this.editTransactionForm.controls.category.setValue(t.category.id);
      const jsDate = new Date(+t.date);
      const date = {
        year: jsDate.getFullYear(),
        month: jsDate.getMonth(),
        day: jsDate.getDate(),
      };
      const time = {
        hour: jsDate.getHours(),
        minute: jsDate.getMinutes()
      };
      this.editTransactionForm.controls.date.setValue(date);
      this.editTransactionForm.controls.time.setValue(time);
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }
  onSubmit() {
    const dateStruct = this.editTransactionForm.controls.date.value;
    const timeStruct = this.editTransactionForm.controls.time.value;
    const stringDate = `${dateStruct.month}/${dateStruct.day}/${dateStruct.year} ${timeStruct.hour}:${timeStruct.minute}`;
    const transaction = {
      title: this.editTransactionForm.controls.title.value,
      amount: +this.editTransactionForm.controls.amount.value,
      categoryId: this.editTransactionForm.controls.category.value,
      date: (new Date(stringDate)).getTime()
    };
    this.transactionService.updateTransaction(this.transactionId, transaction).subscribe((t) => {
      this.router.navigate(['transactions']);
    });
  }
  onCategoryCreated(cat: ICategory) {
    this.categories.push(cat);
    this.editTransactionForm.controls.category.setValue(cat.id);
  }
  onCancel() {
    this.router.navigate(['transactions']);
  }
  isControlInvalid(control) {
    const ctrl = this.editTransactionForm.controls[control];
    if (control === 'category') {
      return (ctrl.value !== 0 || ctrl.value !== -1) && (ctrl.invalid && ctrl.touched);
    }
    return ctrl.invalid && !ctrl.pristine;
  }

}
