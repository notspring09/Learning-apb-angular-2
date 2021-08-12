import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketPlaceComponent } from './marketplace.component';


@NgModule({
  declarations: [
    MarketPlaceComponent
  ],
  imports: [
    MarketplaceRoutingModule,
    SharedModule
  ],
  exports: [
    MarketPlaceComponent
  ]
})
export class MarketplaceModule { }
