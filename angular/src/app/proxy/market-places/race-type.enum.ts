import { mapEnumToOptions } from '@abp/ng.core';

export enum RaceType {
  Human = 0,
  Orc = 1,
  Elf = 2,
  Fairy = 3,
  Dragon = 4,
  Demon = 5,
  Angel = 6,
}

export const raceTypeOptions = mapEnumToOptions(RaceType);
