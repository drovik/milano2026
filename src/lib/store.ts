import { useSyncExternalStore } from 'react'
import type { Answer, AnswerStore } from '../data/types'

// Svar gemmes i localStorage pr. enhed — samme mønster som My Piemontes
// "my list". Nøglen er versioneret, så skemaet kan ændres uden migrering.
const ANSWERS_KEY = 'milano2026-answers-v1'
const PERSON_KEY = 'milano2026-person-v1'

let listeners: Array<() => void> = []
function emit() {
  listeners.forEach((l) => l())
}
function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function readAnswers(): AnswerStore {
  try {
    return JSON.parse(localStorage.getItem(ANSWERS_KEY) ?? '{}')
  } catch {
    return {}
  }
}

let answersCache: AnswerStore = readAnswers()
let personCache: string | null = (() => {
  try {
    return localStorage.getItem(PERSON_KEY)
  } catch {
    return null
  }
})()

export function useAnswers(): AnswerStore {
  return useSyncExternalStore(subscribe, () => answersCache)
}

export function useCurrentPerson(): string | null {
  return useSyncExternalStore(subscribe, () => personCache)
}

export function setCurrentPerson(id: string | null) {
  personCache = id
  try {
    if (id) localStorage.setItem(PERSON_KEY, id)
    else localStorage.removeItem(PERSON_KEY)
  } catch {
    /* private mode — svaret lever videre i hukommelsen */
  }
  emit()
}

export function saveAnswer(personId: string, topicId: string, answer: Answer) {
  answersCache = {
    ...answersCache,
    [personId]: { ...answersCache[personId], [topicId]: answer },
  }
  try {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answersCache))
  } catch {
    /* private mode — svaret lever videre i hukommelsen */
  }
  emit()
}
