import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces';
import { LoaderService } from '../../services/common/loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  @Output() categoryCreated = new EventEmitter<ICategory>();
  constructor(private categoryService: CategoryService,
    private loaderService: LoaderService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initiateForm()
  }
  initiateForm() {
    this.createCategoryForm = this.fb.group({
      title: ['', Validators.required]
    })
  }
  onCreate(e) {
    if (this.createCategoryForm.invalid) {
      e.preventDefault();
      return;
    }
    this.loaderService.shown()
    this.categoryService.createCategory(this.createCategoryForm.controls.title.value).subscribe((c) => {
      this.categoryCreated.emit(c);
      this.loaderService.hide();
    });
  }

}
