import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateMarketDto, MarketplaceDTO } from '../marketplace/models';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  apiName = 'Default';

  create = (input: CreateUpdateMarketDto) =>
    this.restService.request<any, MarketplaceDTO>({
      method: 'POST',
      url: '/api/app/market',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/market/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, MarketplaceDTO>({
      method: 'GET',
      url: `/api/app/market/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<MarketplaceDTO>>({
      method: 'GET',
      url: '/api/app/market',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateMarketDto) =>
    this.restService.request<any, MarketplaceDTO>({
      method: 'PUT',
      url: `/api/app/market/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
