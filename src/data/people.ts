import type { Person } from './types'

export const PEOPLE: Person[] = [
  { id: 'anne', name: 'Anne', role: 'medrejsende', emoji: '🌟' },
  { id: 'charlotte', name: 'Charlotte', role: 'medrejsende', emoji: '🌟' },
  { id: 'tina', name: 'Tina', role: 'medrejsende', emoji: '🌟' },
  { id: 'dag', name: 'Dag', role: 'arrangør', emoji: '🎩' },
  { id: 'torben', name: 'Torben', role: 'arrangør', emoji: '🎩' },
  { id: 'kuno', name: 'Kuno', role: 'arrangør', emoji: '🎩' },
]

export const MEDREJSENDE = PEOPLE.filter((p) => p.role === 'medrejsende')
export const ARRANGOERER = PEOPLE.filter((p) => p.role === 'arrangør')

export function personById(id: string | null): Person | undefined {
  return PEOPLE.find((p) => p.id === id)
}
