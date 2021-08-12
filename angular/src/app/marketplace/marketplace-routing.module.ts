import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketPlaceComponent } from './marketplace.component';

const routes: Routes = [{ path: '', component: MarketPlaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
