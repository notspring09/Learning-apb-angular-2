import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO } from '@proxy/category-managers';
import { CategoryService } from '@proxy/category-manages';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, // add this line
  ],
})
export class EditComponent implements OnInit {
  id:string;
  selectedBook = {} as CategoryDTO;
  isModalOpen = false; // add this line
  header:string;
  form: FormGroup; // add this line
  constructor(private route:ActivatedRoute,
    private categoryService: CategoryService,
    private fb: FormBuilder, // inject FormBuilder
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //this.header = this.id === 0? 'Add Category': 'Edit Category'

    if(this.id == null){
    this.selectedBook = {} as CategoryDTO; // reset the selected book
    this.isModalOpen = true;
    this.buildForm();
    }else {
      this.categoryService.get(this.id).subscribe(category => {
        this.selectedBook = category;
        this.buildForm();
        this.isModalOpen = true;
      });
    }
  }


    //back về trang ch
back(){
  this.router.navigateByUrl('/categorys');
}
// add buildForm method
buildForm() {
  this.form = this.fb.group({
    categoryCode: [this.selectedBook.categoryCode || '', Validators.required],
    categoryName: [this.selectedBook.categoryName || '', Validators.required],
    note: [this.selectedBook.note || ''],
    publishDate: [this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null],
  });
}

// add save method
save() {
  if (this.form.invalid) {
    return;
  }

  const request = this.selectedBook.id
  ? this.categoryService.update(this.selectedBook.id, this.form.value)
  : this.categoryService.create(this.form.value);

request.subscribe(() => {
});  
  this.router.navigateByUrl('/categorys');
}
}


