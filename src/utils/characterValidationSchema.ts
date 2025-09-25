import { z } from 'zod';

export const characterEditSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .trim(),
    
  height: z.string()
    .refine(
      (val) => val.trim() !== '' && val.toLowerCase() !== 'unknown',
      'Height is required'
    )
    .refine(
      (val) => !isNaN(Number(val)),
      'Height must be a number'
    ),
    
  mass: z.string()
    .refine(
      (val) => val.trim() !== '' && val.toLowerCase() !== 'unknown',
      'Mass is required'
    )
    .refine(
      (val) => !isNaN(Number(val)),
      'Mass must be a number'
    ),
    
  gender: z.string()
    .refine(
      (val) => !val || ['male', 'female', 'n/a', 'unknown'].includes(val.toLowerCase()),
      'Gender must be one of: Male, Female, N/A, Unknown'
    ),
    
  birth_year: z.string().optional(),
  hair_color: z.string().optional(),
  skin_color: z.string().optional(),
  eye_color: z.string().optional(),
});

export type CharacterEditFormData = z.infer<typeof characterEditSchema>;