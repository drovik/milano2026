// De godkendte svarmuligheder. Bemærk: samtlige er positive.
// Det er ikke en fejl — det er en garanti.
export const CHOICES = [
  'Fantastisk!',
  'Kunne ikke ha’ gjort det bedre selv',
  'Godt',
  'Der var ikke en finger at sætte på',
  'Min favorit',
] as const

export type Choice = (typeof CHOICES)[number]

// Svarmuligheder der IKKE findes på denne rejse. Vises kun som museums-
// genstande — permanent deaktiveret af arrangørerne.
export const FORBIDDEN_CHOICES = ['Udmærket', 'Helt okay', 'Det var fint nok'] as const

// Ord der får en kommentar afvist af Arrangørernes Positivitetsudvalg.
const NEGATIVE_WORDS = [
  'dårlig', 'dårligt', 'dårlige',
  'kedelig', 'kedeligt', 'kedelige',
  'elendig', 'elendigt',
  'forfærdelig', 'forfærdeligt',
  'frygtelig', 'frygteligt',
  'træls', 'skidt', 'ringe', 'nederen',
  'skuffende', 'skuffet', 'skuffelse',
  'middelmådig', 'middelmådigt',
  'okay', 'ok', 'tja', 'øv', 'nja',
  'klage', 'klager', 'brokke', 'brok',
  'for dyrt', 'for dyr', 'for koldt', 'for varmt',
  'regnvejr', 'forsinket', 'forsinkelse', 'aflyst',
]

/**
 * Positivitetskontrol. Returnerer null hvis kommentaren er godkendt,
 * ellers en venlig-men-bestemt afvisning fra udvalget.
 */
export function positivityCheck(comment: string): string | null {
  const lc = ` ${comment.toLowerCase().replace(/[.,!?;:()"]/g, ' ').replace(/\s+/g, ' ')} `
  const hit = NEGATIVE_WORDS.find((w) => lc.includes(` ${w} `))
  if (hit) {
    return `Ordet "${hit}" er ikke godkendt af Arrangørernes Positivitetsudvalg. Prøv igen med lidt mere begejstring! 😊`
  }
  return null
}
