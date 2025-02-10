import {SunlightEnum} from '../enums/sunlight.enum';

export const sunlightOptions = Object.values(SunlightEnum).map(value => ({
  label: value,
  value: value,
}));
