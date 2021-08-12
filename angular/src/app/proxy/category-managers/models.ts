import type { AuditedEntityDto } from '@abp/ng.core';

export interface CategoryDTO extends AuditedEntityDto<string> {
  categoryName?: string;
  categoryCode?: string;
  note?:string;
  publishDate?: string;
}

export interface CreateUpdateCategoryDto {
  categoryName: string;
  categoryCode: string;
  note?:string;
  publishDate: string;
}
