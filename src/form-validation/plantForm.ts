import {z, ZodType} from 'zod';
import {TPlantFormFields} from '../types/plant.type';

export const PlantFormSchema: ZodType<TPlantFormFields> = z
  .object({
    name: z.string(),
    imageSrc: z.string().url().optional(),
    winterWaterFreq: z.coerce.number(),
    summerWaterFreq: z.coerce.number(),
    summerFeedFreq: z.coerce.number(),
    winterFeedFreq: z.coerce.number(),
    sunlight: z.string(),
  })
  .required({
    name: true,
    summerFeedFreq: true,
    summerWaterFreq: true,
    winterFeedFreq: true,
    winterWaterFreq: true,
    sunlight: true,
  });
