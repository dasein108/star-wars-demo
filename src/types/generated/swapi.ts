/**
 * Simplified TypeScript interfaces for Star Wars Character Explorer
 * Contains only the types and fields actually used by the application
 */


/**
 * Star Wars Character interface
 * Contains only fields used in the application
 */
export interface Character {
  /** The name of this person */
  name: string;
  /** The height of the person in centimeters */
  height: string;
  /** The mass of the person in kilograms */
  mass: string;
  /** The hair color of this person */
  hair_color: string;
  /** The skin color of this person */
  skin_color: string;
  /** The eye color of this person */
  eye_color: string;
  /** The birth year of the person */
  birth_year: string;
  /** The gender of this person */
  gender: string;
  /** The hypermedia URL of this resource (used for ID extraction) */
  url: string;
  [k: string]: unknown;
}

/**
 * API Response interface for paginated results
 */
export interface ApiResponse<T> {
  /** The total number of records */
  count: number;
  /** URL to the next page of results */
  next: string | null;
  /** URL to the previous page of results */
  previous: string | null;
  /** Array of result objects */
  results: T[];
}

/**
 * API Error interface
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** HTTP status code */
  status?: number;
  /** Additional error details */
  details?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}