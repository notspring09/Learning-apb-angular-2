import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CategoryDTO } from '@proxy/category-managers';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryService } from '@proxy/category-manages';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, // add this line
  ],
})
export class EditComponent implements OnInit {
  id: string;
  selectedBook = {} as CategoryDTO;
  public parentItems: CategoryDTO[];
  element: HTMLElement;
  public parentCategories = [] as CategoryDTO[];
  public strCode: string = '';
  @Input() idInput: string;
  @Input() parentInput: Array<CategoryDTO>;
  @Output() eventEmitter = new EventEmitter<any>();
  isModalOpen = false; // add this line
  header: string;
  selectedValue: string;
  form: FormGroup; // add this line
  parentName: string;
  parentRank: number;
  isReadonly : boolean = false
  constructor(
    private route: ActivatedRoute,
    public readonly list: ListService,
    private categoryService: CategoryService,
    private fb: FormBuilder, // inject FormBuilder
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedValue = this.idInput;
    this.buildForm();
    this.id = this.route.snapshot.paramMap.get('id');
    //this.header = this.id === 0? 'Add Category': 'Edit Category'
    if (this.id == null && this.idInput != null) {
      this.id = this.idInput;
    }
    if (this.id == null) {
      this.selectedBook = {} as CategoryDTO; // reset the selected book
      this.buildForm();
    } else {
      this.categoryService.get(this.id).subscribe(category => {
        this.selectedBook = category;
        this.buildForm();
      });
    }
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  onChange(deviceValue) {
    this.selectedValue = deviceValue;
    this.categoryService.get(deviceValue).subscribe(category => {
      this.parentName = category.categoryCode;
       
      this.parentRank = category.categoryRank;
    });
  }

  // Add checked method
  onSelect(e) {
    if (e.currentTarget.checked) {
      this.strCode = this.makeRandom(30,"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
      //document.getElementById("category-code-input").disabled = false;
      this.isReadonly = true;
      // (<HTMLInputElement>document.getElementById("category-code-input")).value = this.strCode
      this.form.controls.categoryCode.setValue(this.strCode);
    } else {
      this.strCode = '';
      this.isReadonly = false
    }
  }

  //back về trang ch
  back() {
    this.eventEmitter.emit('done');
    this.router.navigateByUrl('/categorys');
  }
  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      id: [this.selectedBook.id || ''],

      categoryCode: [this.selectedBook.categoryCode || ''],
      categoryName: [this.selectedBook.categoryName || '', Validators.required],
      categoryParent: [this.selectedBook.categoryParent || ''],
      categoryEnglishName: [this.selectedBook.categoryEnglishName || ''],
      categoryRank: [this.selectedBook.categoryRank || ''],
      note: [this.selectedBook.note || ''],
      publishDate: [this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null],
    });
    //this.parentName = this.form.value.categoryParent;
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.categoryEnglishName == '') {
      this.form.value.categoryEnglishName = this.form.value.categoryName;
    }
    this.form.value.categoryParent = this.parentName;
    if (this.form.value.categoryParent == null) {
      this.form.value.categoryRank = 0;
    } else {
      this.form.value.categoryRank = this.parentRank + 1;
    }
    const request = this.selectedBook.id
      ? this.categoryService.update(this.selectedBook.id, this.form.value)
      : this.categoryService.create(this.form.value);

    request.subscribe(() => {});
    this.eventEmitter.emit('done');
    this.router.navigateByUrl('/categorys');
  }
}
