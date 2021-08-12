import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    CategoryComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CategoryRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    NgbDatepickerModule, // add this line
  ]
})
export class CategoryModule { }
