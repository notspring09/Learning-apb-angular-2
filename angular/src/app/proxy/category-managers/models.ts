import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CategoryDTO extends AuditedEntityDto<string> {
  categoryName?: string;
  categoryCode?: string;
  note?:string;
  categoryEnglishName?:string;
  categoryParent?:string;
  categoryRank?:number;
  publishDate?: string;

}

export interface CreateUpdateCategoryDto {
  categoryName: string;
  categoryCode: string;
  note?:string;
  categoryEnglishName?:string;
  categoryParent?:string;
  categoryRank?:number;
  publishDate: string;
}

export interface GetCategoryListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  CategoryParent?: string;
}
