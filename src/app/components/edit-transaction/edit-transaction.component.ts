import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces';
import { TransactionsService } from '../../services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ValidateDate } from '../../validators/date.validator';
import { ValidateTime } from '../../validators/time.validator';
import { LoaderService } from '../../services/common/loader.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {
  editTransactionForm: FormGroup;
  transactionId: number;
  categories: ICategory[];
  createCategoryShown = false;
  constructor(private transactionService: TransactionsService, private activeRoute: ActivatedRoute,
    private categoryService: CategoryService, public router: Router, private fb: FormBuilder, private loaderService: LoaderService
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
      time: [{}, [Validators.required, ValidateTime]],
      note: ['']
    });
    this.editTransactionForm.controls.category.valueChanges.subscribe((v) => {
      v === -1 ? this.createCategoryShown = true : this.createCategoryShown = false;
    })
  }
  getTransaction() {
    this.loaderService.shown()
    this.transactionService.getOneTransaction(this.transactionId).subscribe(t => {
      this.editTransactionForm.controls.title.setValue(t.title);
      this.editTransactionForm.controls.amount.setValue(t.amount);
      this.editTransactionForm.controls.category.setValue(t.category.id);
      this.editTransactionForm.controls.note.setValue(t.note);
      this.editTransactionForm.controls.date.setValue(new Date(+t.date));
      this.loaderService.hide()
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }
  onSubmit() {
    this.loaderService.shown()
    const stringDate = this.editTransactionForm.controls.date.value;
    const transaction = {
      title: this.editTransactionForm.controls.title.value,
      amount: +this.editTransactionForm.controls.amount.value,
      categoryId: this.editTransactionForm.controls.category.value,
      date: (new Date(stringDate)).getTime(),
      note: this.editTransactionForm.controls.note.value
    };
    this.transactionService.updateTransaction(this.transactionId, transaction).subscribe((t) => {
      this.loaderService.hide()
      this.router.navigate(['transactions']);
    });
  }

  onCategoryCreated(cat: ICategory) {
    this.createCategoryShown = false;
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
