import {SunlightEnum} from '../enums/sunlight.enum';

type TFrequencey = {
  summer: number;
  winter: number;
};

export type TPlant = {
  id: number;
  name: string;
  imageSrc: string;
  waterFreq: TFrequencey;
  feedFreq: TFrequencey;
  sunlight: SunlightEnum;
};
