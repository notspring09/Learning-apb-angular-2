import { Component, Input, NgModule, OnInit, EventEmitter, Output } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CategoryDTO , GetCategoryListDto} from '@proxy/category-managers';
import { CategoryService  } from '@proxy/category-manages';
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
  emailsCopy: Array<CategoryDTO> = [];
  categoryName: any;
  categoryCode: any;
  categoryNote: any;
  public parentItems: any[];
  form: FormGroup; // add this line
  selectedBook = {} as CategoryDTO;
  isModalOpen = false; // add this line
  totalLength: any;
  page: number = 1;
  public input = {} as GetCategoryListDto;
  showpost: any = [];
  idOfEditCategory: string;
  temp = [];
  rows = [];
  public isShowSelect: boolean = false;
  newArray: any = [];
  selectedValue: string;
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
      this.totalLength = this.categoryPage.items.length;
      this.emailsCopy = [...this.categoryPage.items];
      console.log(this.emailsCopy);
      
      this.newArray = this.flatListToTreeViewDataByName(this.emailsCopy);
      // this.newArray = this.emailsCopy.map(item => ({
      //   categoryName: item.categoryName,
      //   children: this.emailsCopy.filter(el => el.categoryParent === this.categoryName), // Not sure about that, but this is the idea
      // }));
      console.log(this.flatListToTreeViewData(this.emailsCopy));
      console.log(this.newArray);
    });

    
    //binding data to dropdownlist
  }

  showSelect() {
    this.isShowSelect = true;
  }

  flatListToTreeViewData(dataList) {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    for (var i = 0, len = dataList.length; i < len; i++) {
      arrElem = dataList[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parentid) {
          mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  Select() {
    this.isShowSelect = false;
    this.strParent = '';
    this.ngOnInit();
  }

  

  flatListToTreeViewDataByName(dataList) {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    for (var i = 0, len = dataList.length; i < len; i++) {
      arrElem = dataList[i];
      mappedArr[arrElem.categoryCode] = arrElem;
      mappedArr[arrElem.categoryCode]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.categoryParent) {
          mappedArr[mappedElem['categoryParent']]['children'].push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' },
      ],
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [{ id: 7, name: 'subsub' }],
        },
      ],
    },
  ];

  onChange(deviceValue) {
    this.selectedValue = deviceValue;
  }

  onChange12(deviceValue) {
    this.selectedValue = deviceValue;
    //   const val = this.selectedValue.toLowerCase();
    //     if (val==""){
    //       this.ngOnInit();
    //     }
    //     else{
    //       this.categoryPage.items=this.emailsCopy
    //     // filter our data
    //     const temp = this.categoryPage.items.filter(function (d) {
    //       return d.categoryName.toLowerCase().indexOf(val) !== -1 || !val;

    //     });
    //     this.rows = temp;
    //   this.categoryPage.items=temp
    // }

    if (this.selectedValue == '') {
      this.ngOnInit();
    } else {
      this.categoryPage.items = this.emailsCopy;
      this.categoryPage.items = this.categoryPage.items.filter(res => {
        if (res.categoryParent != null) {
          return res.categoryParent.match(this.selectedValue);
        }
      });
    }
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

  onEvent(e) {
    this.strParent = e.node.data.categoryCode;
    this.isShowSelect = false;
    if (this.strParent == '') {
      this.ngOnInit();
    } else {
      this.categoryPage.items = this.emailsCopy;
      this.categoryPage.items = this.categoryPage.items.filter(res => {
        if (res.categoryCode != null) {
          return res.categoryCode.match(this.strParent);
        }
      });
    }
    //this.isShowSelect = false;
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

  saveEventEmitter() {
    this.isModalOpen = false;
    this.form.reset();
    this.list.get();
  }

  createCategorywithRouter() {
    this.router.navigateByUrl('/categorys/add/');
  }

  editCategorywithRouter(id: string) {
    this.router.navigateByUrl('/categorys/edit/' + id);
  }

  //t??m ki???m
  search() {
    if (this.selectedValue == null) {
      this.selectedValue = 'M?? danh m???c';
    }
    switch (this.selectedValue) {
      case 'M?? danh m???c': {
        if (this.categoryName == '') {
          this.ngOnInit();
        } else {
          this.categoryPage.items = this.categoryPage.items.filter(res => {
            return res.categoryCode
              .toLocaleLowerCase()
              .match(this.categoryName.toLocaleLowerCase());
          });
        }
        break;
      }
      case 'T??n danh m???c': {
        if (this.categoryName == '') {
          this.ngOnInit();
        } else {
          this.categoryPage.items = this.categoryPage.items.filter(res => {
            return res.categoryName
              .toLocaleLowerCase()
              .match(this.categoryName.toLocaleLowerCase());
          });
        }
        break;
      }
      case 'Ghi ch??': {
        if (this.categoryName == '') {
          this.ngOnInit();
        } else {
          this.categoryPage.items = this.categoryPage.items.filter(res => {
            return res.note.toLocaleLowerCase().match(this.categoryName.toLocaleLowerCase());
          });
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
