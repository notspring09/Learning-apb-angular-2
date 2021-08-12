import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CategoryDTO, CreateUpdateCategoryDto } from '../category-managers/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiName = 'Default';

  create = (input: CreateUpdateCategoryDto) =>
    this.restService.request<any, CategoryDTO>({
      method: 'POST',
      url: '/api/app/category',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/category/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, CategoryDTO>({
      method: 'GET',
      url: `/api/app/category/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<CategoryDTO>>({
      method: 'GET',
      url: '/api/app/category',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateCategoryDto) =>
    this.restService.request<any, CategoryDTO>({
      method: 'PUT',
      url: `/api/app/category/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
