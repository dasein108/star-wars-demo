import Dexie, { Table } from 'dexie';
import { LocalCharacterData } from '../types';

export class StarWarsDatabase extends Dexie {
  characters!: Table<LocalCharacterData>;

  constructor() {
    super('StarWarsDB');
    
    // Define schema
    this.version(1).stores({
      characters: 'id, lastModified'
    });
  }
}

// Create and export the database instance
export const db = new StarWarsDatabase();