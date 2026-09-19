export type Category = 'oplevelse' | 'generelt'

export type Topic = {
  id: string
  title: string
  /** Kort undertekst på kortet */
  sub: string
  /** Lidt længere, kærligt-højtidelig beskrivelse på emnesiden */
  blurb: string
  emoji: string
  category: Category
}

export type Person = {
  id: string
  name: string
  role: 'arrangør' | 'medrejsende'
  emoji: string
}

export type Answer = {
  /** En af de godkendte (positive) svarmuligheder */
  choice: string
  /** Altid 5. Skalaen går fra 5 til 5. */
  stars: 5
  comment?: string
  at: string
}

export type AnswerStore = {
  [personId: string]: { [topicId: string]: Answer }
}
