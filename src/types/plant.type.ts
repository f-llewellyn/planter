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

export type TPlantFormFields = {
  name: string;
  imageSrc?: string;
  winterWaterFreq: number;
  summerWaterFreq: number;
  winterFeedFreq: number;
  summerFeedFreq: number;
  sunlight: SunlightEnum;
};
