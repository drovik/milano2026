import type { Person, Answer } from '../data/types'
import { TOPICS } from '../data/topics'

// Dags nummer — hertil sendes de færdige (og garanteret positive) svar.
const DAG_NUMBER = '+4531488845'

/**
 * Bygger sms:/iMessage-linket med svarene som prælavet besked.
 * iOS bruger `&body=`, alt andet `?body=` — begge åbner Beskeder/SMS-appen
 * med teksten klar til afsendelse.
 */
export function smsHref(body: string): string {
  const ios = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)
  const encoded = encodeURIComponent(body)
  return ios ? `sms:${DAG_NUMBER}&body=${encoded}` : `sms:${DAG_NUMBER}?body=${encoded}`
}

/** Formaterer en persons svar som en venlig, letlæselig besked. */
export function buildSmsBody(person: Person, mine: { [topicId: string]: Answer }): string {
  const lines: string[] = [`Milano 2026 — svar fra ${person.name} ${person.emoji}`, '']
  for (const t of TOPICS) {
    const a = mine[t.id]
    if (!a) continue
    lines.push(`${t.emoji} ${t.title}: ${a.choice} (5/5)`)
    if (a.comment) lines.push(`   „${a.comment}"`)
  }
  const n = Object.keys(mine).length
  lines.push('')
  lines.push(`${n} af ${TOPICS.length} emner besvaret. Gennemsnit: 5,0. Klager: 0.`)
  lines.push('Godkendt af Arrangørernes Positivitetsudvalg ✅')
  return lines.join('\n')
}
