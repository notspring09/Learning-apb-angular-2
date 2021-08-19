import { Component, Input, NgModule, OnInit , EventEmitter , Output  } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CategoryDTO } from '@proxy/category-managers';
import { CategoryService } from '@proxy/category-manages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from '../category/edit/edit.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [
    ListService,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, // add this line
  ],
})

export class CategoryComponent implements OnInit {
  categoryPage = { items: [], totalCount: 0 } as PagedResultDto<CategoryDTO>;
  emailsCopy:Array<CategoryDTO> = [];
  categoryName : any;
  categoryCode : any;
  categoryNote : any;
  form: FormGroup; // add this line
  selectedBook = {} as CategoryDTO;
  isModalOpen = false; // add this line
  totalLength:any;
  page:number = 1;
  showpost: any = [];
  idOfEditCategory:string;
  selectedValue:string
  public strParent: string = '';
  constructor(
    public readonly list: ListService,
    private categoryService: CategoryService,
    private router: Router,
    private confirmation: ConfirmationService, // inject the ConfirmationService
    private fb: FormBuilder // inject FormBuilder
  ) {}

  ngOnInit() {
    const categoryStreamCreator = query => this.categoryService.getList(query);

    this.list.hookToQuery(categoryStreamCreator).subscribe(response => {
    
      this.categoryPage = response;
      this.showpost = this.categoryPage.items;
      this.totalLength  = this.categoryPage.items.length;
      
       this.emailsCopy = [...this.categoryPage.items]; 
       console.log(this.emailsCopy)
    });

    //binding data to dropdownlist
  }
  
  onChange(deviceValue) {
    this.selectedValue = deviceValue;
}

  // Add a delete method
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.categoryService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  // add new method
  createBook() {
    this.selectedBook = {} as CategoryDTO; // reset the selected book
    this.idOfEditCategory = null; // reset the selected idInput
    this.isModalOpen = true;
    this.buildForm();
  }

  // Add editBook method
  editBook(id: string) {
    this.categoryService.get(id).subscribe(category => {
      this.selectedBook = category;
      this.idOfEditCategory = id;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  // add buildForm method
  buildForm() {
    this.form = this.fb.group({
      categoryCode: [this.selectedBook.categoryCode || '', Validators.required],
      categoryName: [this.selectedBook.categoryName || '', Validators.required],
      categoryParent: [this.selectedBook.categoryParent || ''],
      note: [this.selectedBook.note || ''],
      publishDate: [this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null],
    });
  }

  onEvent(e){
    this.strParent = e.node.data.code;
  }

  // add save method
  // save() {
  //   if (this.form.invalid) {
  //     return;
  //   }

  //   const request = this.selectedBook.id
  //     ? this.categoryService.update(this.selectedBook.id, this.form.value)
  //     : this.categoryService.create(this.form.value);

  //   request.subscribe(() => {
  //     this.isModalOpen = false;
  //     this.form.reset();
  //     this.list.get();
  //   });    
  // }

  saveEventEmitter(){
    this.isModalOpen = false;
    this.form.reset();
    this.list.get();
  }

  createCategorywithRouter(){
    this.router.navigateByUrl('/categorys/add/');
  }

  editCategorywithRouter(id:string){
    this.router.navigateByUrl('/categorys/edit/' + id);
  }
  

  //tìm kiếm
  search(){
    if (this.selectedValue == null){
      this.selectedValue = 'Mã danh mục'
    }
    switch(this.selectedValue) { 
      case 'Mã danh mục': { 
        if(this.categoryName == ""){
          this.ngOnInit();
        }else{
          this.categoryPage.items = this.categoryPage.items.filter(res =>{
            return res.categoryCode.toLocaleLowerCase().match(this.categoryName.toLocaleLowerCase());
          })
        }
         break; 
      } 
      case 'Tên danh mục': { 
        if(this.categoryName == ""){
          this.ngOnInit();
        }else{
          this.categoryPage.items = this.categoryPage.items.filter(res =>{
            return res.categoryName.toLocaleLowerCase().match(this.categoryName.toLocaleLowerCase());
          })
        }
         break; 
      } 
      case 'Ghi chú': {
        if(this.categoryName == ""){
          this.ngOnInit();
        }else{
          this.categoryPage.items = this.categoryPage.items.filter(res =>{
            return res.note.toLocaleLowerCase().match(this.categoryName.toLocaleLowerCase());
          })
        }
         break;
      }
      default: { 
         //statements; 
         break; 
      } 
   } 


    

  }
}
