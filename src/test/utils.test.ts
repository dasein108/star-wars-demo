import { describe, it, expect } from 'vitest'
import { formatHeight, formatMass, formatValue } from '../utils/characterHelpers'
import { swapiService } from '../services/api'

describe('Character Helpers', () => {
  describe('formatHeight', () => {
    it('formats valid height with cm suffix', () => {
      expect(formatHeight('180')).toBe('180 cm')
      expect(formatHeight('165')).toBe('165 cm')
    })

    it('handles unknown values', () => {
      expect(formatHeight('unknown')).toBe('Unknown')
      expect(formatHeight('n/a')).toBe('Unknown')
    })

    it('handles empty values by adding cm suffix', () => {
      expect(formatHeight('')).toBe(' cm')
      expect(formatHeight(undefined as any)).toBe('undefined cm')
    })
  })

  describe('formatMass', () => {
    it('formats valid mass with kg suffix', () => {
      expect(formatMass('75')).toBe('75 kg')
      expect(formatMass('80')).toBe('80 kg')
    })

    it('handles unknown values', () => {
      expect(formatMass('unknown')).toBe('Unknown')
      expect(formatMass('n/a')).toBe('Unknown')
    })

    it('handles comma in mass values', () => {
      expect(formatMass('1,358')).toBe('1,358 kg')
    })
  })

  describe('formatValue', () => {
    it('returns value as-is when valid', () => {
      expect(formatValue('male')).toBe('male')
      expect(formatValue('blue')).toBe('blue')
    })

    it('handles unknown values', () => {
      expect(formatValue('unknown')).toBe('Unknown')
      expect(formatValue('n/a')).toBe('Unknown')
    })
  })
})

describe('API Service', () => {
  describe('extractIdFromUrl', () => {
    it('extracts ID from SWAPI character URL', () => {
      expect(swapiService.extractIdFromUrl('https://swapi.py4e.com/api/people/1/')).toBe('1')
      expect(swapiService.extractIdFromUrl('https://swapi.py4e.com/api/people/42/')).toBe('42')
    })

    it('handles URLs without trailing slash', () => {
      expect(swapiService.extractIdFromUrl('https://swapi.py4e.com/api/people/1')).toBe('')
    })

    it('returns empty string for invalid URLs', () => {
      expect(swapiService.extractIdFromUrl('invalid-url')).toBe('')
      expect(swapiService.extractIdFromUrl('')).toBe('')
    })
  })
})

