import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import  {MarketService} from '@proxy/marketplaces';
import  {MarketplaceDTO} from '@proxy/marketplace';
import  {genderTypeOptions,raceTypeOptions} from '@proxy/market-places';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 


@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  providers: [ListService]
})

export class MarketPlaceComponent implements OnInit {
  book = { items: [], totalCount: 0 } as PagedResultDto<MarketplaceDTO>;

  form: FormGroup; // add this line

  // add bookTypes as a list of BookType enum members
  genderTypes = genderTypeOptions;
  raceTypes = raceTypeOptions;

  isModalOpen = false; // add this line

  constructor(public readonly list: ListService, private marketService: MarketService,
    private fb: FormBuilder // inject FormBuilder
    ) {}

  ngOnInit() {
    const bookStreamCreator = (query) => this.marketService.getList(query);

    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.book = response;
    });
  }

  createBook() {
    this.isModalOpen = true;
    this.buildForm(); // add this line
  }
  // add buildForm methodf
  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      genderType: [null, Validators.required],
      raceType: [null, Validators.required],
      publishDate: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  // add save method
  save() {
    if (this.form.invalid) {
      return;
    }

    this.marketService.create(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
}


// export class MarketPlaceComponent{
//   isModalOpen = false; // add this line
//   createBook() {
//          this.isModalOpen = true;
//        }
// }
