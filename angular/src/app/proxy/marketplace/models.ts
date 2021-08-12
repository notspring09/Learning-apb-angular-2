import type { RaceType } from '../market-places/race-type.enum';
import type { GenderType } from '../market-places/gender-type.enum';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateMarketDto {
  name: string;
  raceType: RaceType;
  gender: GenderType;
  publishDate: string;
  price: number;
}

export interface MarketplaceDTO extends AuditedEntityDto<string> {
  name?: string;
  raceType: RaceType;
  gender: GenderType;
  publishDate?: string;
  price: number;
}
